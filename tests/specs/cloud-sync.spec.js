import { test, expect } from '@playwright/test';
import { gotoApp } from './helpers.js';

test.describe('Sincronização com a nuvem', () => {
  test('edição em andamento sobrevive a uma atualização da nuvem concorrente', async ({ page }) => {
    // Regressão: refreshFromCloudIfSafe() checava dirty/isEditingSomething()
    // só ANTES de disparar a busca assíncrona. Se o usuário editasse algo
    // enquanto a busca ainda estava em andamento, a conclusão dela
    // sobrescrevia o state inteiro, apagando a edição em curso. Corrigido
    // na versão 1.10.099.
    await gotoApp(page, { view: 'tasks' });

    const result = await page.evaluate(async () => {
      cloudSession = { user: { id: 'fake-id', email: 'teste@teste.com' } };
      state.tasks = [{
        id: 't1', title: 'Original', done: false, status: 'nao_iniciado',
        dueDate: '2026-10-01', categoryId: state.categories[0].id,
        tagIds: [], subtasks: [], comments: [], attachments: [],
      }];

      const staleCloudState = JSON.parse(JSON.stringify(state));
      staleCloudState.tasks[0].title = 'Título antigo da nuvem (sem a edição)';

      const originalFetchRow = fetchCloudStateRow;
      fetchCloudStateRow = async () => {
        await new Promise((r) => setTimeout(r, 300));
        return { data: staleCloudState };
      };

      const refreshPromise = refreshFromCloudIfSafe();
      await new Promise((r) => setTimeout(r, 80));
      state.tasks[0].title = 'Editado pelo usuário';
      markDirty();
      await refreshPromise;

      fetchCloudStateRow = originalFetchRow;
      const titleAfterRace = state.tasks[0].title;

      cloudSession = null;
      dirty = false;
      state.tasks = [];

      return { titleAfterRace };
    });

    expect(result.titleAfterRace).toBe('Editado pelo usuário');
  });

  test('sem edição concorrente, a atualização da nuvem é aplicada normalmente', async ({ page }) => {
    await gotoApp(page, { view: 'tasks' });

    const result = await page.evaluate(async () => {
      cloudSession = { user: { id: 'fake-id', email: 'teste@teste.com' } };
      state.tasks = [{
        id: 't1', title: 'Original', done: false, status: 'nao_iniciado',
        dueDate: '2026-10-01', categoryId: state.categories[0].id,
        tagIds: [], subtasks: [], comments: [], attachments: [],
      }];

      const cloudState = JSON.parse(JSON.stringify(state));
      cloudState.tasks[0].title = 'Vindo da nuvem';

      const originalFetchRow = fetchCloudStateRow;
      fetchCloudStateRow = async () => ({ data: cloudState });

      await refreshFromCloudIfSafe();
      fetchCloudStateRow = originalFetchRow;
      const titleNoRace = state.tasks[0].title;

      cloudSession = null;
      dirty = false;
      state.tasks = [];

      return { titleNoRace };
    });

    expect(result.titleNoRace).toBe('Vindo da nuvem');
  });
});

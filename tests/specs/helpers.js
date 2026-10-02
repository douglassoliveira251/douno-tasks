/** Abre o app e sai da tela de login/vínculo de arquivo, direto pro estado
 * em memória — é o mesmo atalho usado manualmente durante o desenvolvimento
 * (closeLoginGate + render), sem precisar de conta na nuvem nem arquivo local
 * pra rodar os testes. */
export async function gotoApp(page, { view = 'tasks' } = {}) {
  await page.goto('/index.html');
  await page.waitForFunction(() => typeof render === 'function');
  await page.evaluate((view) => {
    closeLoginGate();
    currentView = view;
    document.documentElement.setAttribute('data-theme', 'light');
    render();
  }, view);
}

export async function evalApp(page, fn, arg) {
  return page.evaluate(fn, arg);
}

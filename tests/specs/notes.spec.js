import { test, expect } from '@playwright/test';
import { gotoApp } from './helpers.js';

test.describe('Notas — editor rico', () => {
  test('limpar formatação desfaz título (H1/H2/H3) numa seleção multi-linha', async ({ page }) => {
    // Regressão: selecionar várias linhas formatadas como título e clicar em
    // "Limpar formatação" não fazia nada — o navegador funde a seleção
    // multi-linha num único bloco <h3> com <br> internos, e o removeFormat
    // nativo não desfaz título, só formatação de texto. Corrigido na 1.10.091.
    await gotoApp(page, { view: 'notes' });

    const result = await page.evaluate(() => {
      const body = document.createElement('div');
      body.className = 'note-body-input';
      body.setAttribute('contenteditable', 'true');
      document.body.appendChild(body);

      const cases = {};

      // Caso 1: título multi-linha, seleção total
      body.innerHTML = '<h3>Linha um<br>Linha dois<br>Linha três</h3>';
      let range = document.createRange();
      range.selectNodeContents(body);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      clearFormattingInSelection(body);
      cases.fullSelection = body.innerHTML;

      // Caso 2: título multi-linha, seleção parcial (só uma das linhas)
      body.innerHTML = '<h3>Linha um<br>Linha dois<br>Linha três</h3>';
      range = document.createRange();
      const textNode = body.querySelector('h3').childNodes[2];
      range.setStart(textNode, 0);
      range.setEnd(textNode, textNode.length);
      sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      clearFormattingInSelection(body);
      cases.partialSelection = body.innerHTML;

      // Caso 3 (regressão de não-regressão): negrito comum continua funcionando
      body.innerHTML = '<div>Texto <b>negrito</b> normal</div>';
      range = document.createRange();
      const boldNode = body.querySelector('b').firstChild;
      range.setStart(boldNode, 0);
      range.setEnd(boldNode, boldNode.length);
      sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      clearFormattingInSelection(body);
      cases.boldRegression = body.innerHTML;

      body.remove();
      return cases;
    });

    expect(result.fullSelection).toBe('<div>Linha um<br>Linha dois<br>Linha três</div>');
    expect(result.partialSelection).toBe('<div>Linha um<br>Linha dois<br>Linha três</div>');
    expect(result.boldRegression).toBe('<div>Texto negrito normal</div>');
  });
});

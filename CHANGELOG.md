## [1.10.066] - 2026-09-28 00:00

### Changed

#### Tela de login

- Agora usa a identidade Douno Tasks (antes mantinha o logo/marca antiga do Taskin): logo "DOUNO" + "Tasks" no painel escuro, ícone oficial da marca como marca d'água, botão e realces em verde esmeralda, texto "Acesse sua conta do Douno Tasks.".

#### Menu lateral

- Logo "DOUNO" reduzido no modo expandido, com um pequeno espaço de volta entre ele e "Tasks" (tinha ficado colado demais no ajuste anterior).



### Changed

#### Menu lateral

- Logo "DOUNO" e subtítulo "Tasks" mais próximos, com uma linha divisória separando esse bloco dos itens de navegação.
- Botão de expandir/recolher menor e recolorido para combinar com o menu (fundo e borda escuros, ícone verde) em vez do círculo branco anterior.
- Espaçamento adicionado entre o menu e o início do conteúdo da tela.
- Logo da marca recortado (sem a folga transparente do arquivo original) para o espaçamento visual bater com o valor real definido em CSS.

#### Tela de login

- Redesenhada no formato split-screen (referência: tela de acesso do Anora) — painel de marca à esquerda em telas grandes (headline, texto de apoio, selo de segurança dos dados) e formulário centralizado à direita; em telas pequenas, só o formulário aparece, com o logo compacto no topo.
- Campo de senha ganhou botão de mostrar/ocultar.
- Logo e identidade visual do Taskin mantidos como estavam nessa tela (não usa a marca Douno).



### Changed

#### Menu lateral (rebranding Douno)

- Menu lateral redesenhado com a nova identidade Douno: painel flutuante suspenso (cantos arredondados, afastado das bordas, sombra), fundo azul-marinho no lugar do preto/verde anterior, e cor de destaque em verde esmeralda.
- Logo "DOUNO" (arte real da marca, em branco) substituindo o ícone e o texto "Taskin" antigos; "Tasks" como subtítulo do produto logo abaixo, mais próximo do logo.
- Menu reduzido agora mostra o ícone "D" oficial da marca (traço, sem fundo colorido), maior e em branco.
- Botão de expandir/recolher redesenhado como um círculo branco na borda direita do painel.
- Mudança restrita ao menu lateral — nenhuma outra tela do sistema foi alterada.



### Changed

#### Notas

- Removidos os atalhos de markdown ao digitar (`# `, `- `, `**negrito**`...), a pedido — voltou a ser só texto normal digitar esses caracteres no corpo da nota.
- Ícone de fixar na lista de notas do caderno reduzido mais uma vez (de 13px para 11px).

## [1.10.052] - 2026-09-25 00:00

### Added

#### Notas

- Duplicar nota: novo botão no cabeçalho da nota (antes do de fixar).
- Exportar nota como Markdown (.md) ou PDF (abre uma janela de impressão para "Salvar como PDF"), pelo novo botão de exportar no cabeçalho.
- Atalhos de markdown ao digitar no corpo da nota: `# `/`## `/`### ` no início da linha viram título, `- `/`* ` viram lista com marcadores, `1. ` vira lista numerada, e fechar `**texto**`/`*texto*` vira negrito/itálico.

#### Calendário / Tarefas

- Recorrência ganhou um campo opcional "Até" (data fim) — depois dessa data, a tarefa recorrente deixa de gerar a próxima ocorrência ao ser concluída.

### Fixed

#### Notas

- Corrigido: escolher um estilo de título (Normal/Título 1/2/3) no seletor da barra de formatação às vezes não aplicava o formato ao texto selecionado — o valor escolhido podia ser sobrescrito internamente antes de ser usado.

### Changed

#### Notas

- Ícone de fixar reduzido um pouco mais na lista de notas dentro do caderno.

## [1.10.045] - 2026-09-25 00:00

### Changed

#### Sincronização na nuvem

- A busca automática de dados mais recentes da nuvem (adicionada ao voltar o foco na janela) agora também acontece ao trocar de tela (Visão geral/Tarefas/Notas/Calendário/Configurações) dentro da mesma janela — cobre o caso de ficar um tempo na mesma janela navegando entre telas sem nunca trocar de aba/janela. Mesmas travas de segurança de antes: não busca se houver algo sendo digitado ou uma escrita pendente.

## [1.10.044] - 2026-09-25 00:00

### Fixed

#### Sincronização na nuvem

- Bug real corrigido: com o sistema aberto em duas janelas, editar e salvar numa não atualizava os dados carregados na outra — ela continuava com a "foto" antiga do momento em que abriu, e ao editar e salvar algo ali, sua escrita (o dado inteiro) sobrescrevia a mudança feita na primeira janela. Agora, ao voltar para uma janela/aba (ela ganha foco), o sistema busca os dados mais recentes da nuvem antes que você comece a editar ali, desde que não haja nada sendo digitado nem uma escrita pendente — assim a próxima alteração sempre parte do dado mais atual, e a edição feita na outra janela não é mais perdida.

## [1.10.043] - 2026-09-25 00:00

### Fixed

#### Notas

- Bug real corrigido: o corpo da nota só salvava ao perder o foco (clicar fora do campo). Se você digitasse e saísse da tela sem clicar fora antes (trocar de tela, dar refresh), a edição nunca era gravada. Agora o corpo também salva sozinho após 3 segundos sem digitar, igual ao título.

## [1.10.042] - 2026-09-25 00:00

### Fixed

#### Sincronização na nuvem

- Corrigido: editar em duas janelas/dispositivos ao mesmo tempo e atualizar a página podia mostrar dados desatualizados. O salvamento na nuvem tinha um atraso de 250ms (debounce) que um refresh logo em seguida não esperava terminar — a última edição podia nunca chegar a ser gravada. Agora a escrita na nuvem dispara imediatamente a cada alteração, sem atraso artificial, e novas edições que cheguem enquanto uma escrita já está em andamento são enfileiradas (nunca perdidas, nunca escritas em paralelo).
- A tela e o espaço que você estava vendo (Tarefas/Notas/Calendário/Visão geral + filtro de espaço) agora são restaurados automaticamente após um refresh — cada aba/janela guarda isso de forma independente, então abrir o sistema em duas janelas olhando espaços diferentes não faz uma "roubar" o estado da outra.

## [1.10.040] - 2026-09-22 00:00

### Changed

#### Notas

- Layout completo da tela redesenhado no padrão visual de Tarefas: Cadernos numa coluna própria (com busca, redimensionável arrastando a borda), nota aberta ao lado numa única superfície contínua em vez de duas caixas separadas.
- Removida a cor por nota (seletor de cor, fundo colorido no card) — paleta neutra em todo o fluxo, como no resto do sistema.
- Cadernos: contagem de notas como badge, criar/renomear/excluir/**mover de espaço** pelo menu (⋮), nome com fonte de título.
- Notas: mover para outro caderno arrastando a nota até ele, ou clicando no caderno mostrado no breadcrumb "Espaço › Caderno" dentro da nota (substituiu o botão de mover na barra de ferramentas).
- Pin: continua na lista de cadernos como antes, agora clicável para desafixar direto ali; fixar/excluir na nota aberta viraram botões circulares no cabeçalho, no mesmo padrão do sino de notificações.
- Tags removidas das notas (composer e filtro no topo da tela) — seguem existindo normalmente em Tarefas.
- "Cadernos" e a lista de cadernos/notas puxados um pouco mais à esquerda; barra de formatação e linha de mover/anexar/vincular tarefa voltaram a ficar numa única linha, com divisor sutil entre os grupos.

#### Tarefas

- Modo escuro: ícone de status "Em andamento" e cor das tags reequilibrados para contraste adequado sobre fundo escuro.

#### Geral

- Botão "Sair": corrigida a confirmação de desconexão, que fechava sozinha no mesmo clique em que abria e aparecia fora do lugar na tela.

### Removed

#### Notas

- Modal de nota legado (não usado desde a migração para o layout de Cadernos) e o código morto acumulado da grade antiga de notas coloridas — parte dele colidia com o CSS do editor novo e quebrava o sublinhado do título e o alinhamento da barra de ferramentas.
- Função de arquivar removida da lista de Cadernos — não havia nenhum controle na interface que a ativasse.

### Fixed

#### Notas

- "Nova nota" podia travar num composer em branco ao sair da tela sem digitar nada; agora restaura a última nota aberta do espaço.
- Arrastar uma nota para outro caderno enquanto ela estava aberta desfazia a própria mudança (ordem incorreta entre o commit do editor e a atualização do caderno).
- Três botões da coluna de Cadernos sem `border`/`background` explícitos apareciam com o estilo padrão do navegador fora de um preview em sandbox.

## [1.9.011] - 2026-09-15 01:51

### Added

#### General

- Novo botão **"Sobre"** no rodapé da sidebar, antes de "Modo escuro" — abre uma modal com o logo, nome, slogan, descrição curta do sistema e número da versão instalada.
- **Novo logo/ícone da marca**: ícone de lista com check, em verde sólido (`#3FA087`, a mesma cor `--primary` já usada na sidebar), aplicado em três lugares — favicon da aba do navegador, marca da sidebar (ícone + "Taskin" quando expandida, só o ícone quando minimizada) e modal "Sobre".

### Changed

#### Tarefas

- Dropdown da lista de Status: agora dimensiona conforme o conteúdo em vez de ficar travado exatamente na largura do campo, sem quebrar texto em várias linhas. Só a lista mudou — o campo (trigger) continua do mesmo tamanho.
- Campo Agenda vinculada: data/hora agora em uma linha (fonte normal, menor e um pouco mais escura) e o título da tarefa embaixo, truncado a uma linha.

#### Calendário

- Ao criar uma agenda a partir de uma tarefa, a descrição da tarefa é copiada automaticamente para a descrição do evento.

#### Notas

- Botão de filtro de tags movido do corpo da tela para o topo, logo depois do campo de busca — some automaticamente ao sair da tela de Notas.

#### Geral

- Modal "Sobre": removido o botão "Fechar", mantendo apenas um X no canto superior direito.

### Removed

#### Visão geral

- Seletor de espaço removido do título da tela de Visão geral (ela sempre mostra todos os espaços, então o seletor ali não tinha função).

### Fixed

#### Geral

- Corrigido o favicon do site, que não estava refletindo o novo logo: havia um segundo favicon antigo (PNG, resquício de antes da renomeação para Taskin) ainda declarado no HTML, competindo com o novo SVG. Removida a referência antiga — agora só existe um favicon declarado, com o ícone e a cor atuais do sistema.
## [1.8.044] - 2026-09-05 15:39

### Renomeação: Categorias → Espaços

- "Categoria(s)" renomeada para "Espaço(s)" em todas as referências visíveis: aba de Configurações, rótulos de campo, botões, mensagens de confirmação, agrupamento de tarefas, tela de mover item de espaço, etc. As chaves internas (`data-tab="categorias"`, `catById`, `getOrderedCategories` etc.) foram mantidas intactas, mesmo princípio já usado na renomeação para Taskin.

### Added

#### General

- Novo **seletor de espaço** no topo da tela, antes do título: combo com círculo colorido + nome do espaço + seta, abrindo um menu com a lista de espaços (com marca de seleção), opção "Todos os espaços", "+ Novo espaço" (cria e leva direto para Configurações com o campo em foco) e "Gerenciar espaços" (vai para a aba Espaços). Presente nas telas de Tarefas, Notas, Calendário e Visão geral.
- Lista de espaços removida do menu lateral — a seleção agora é feita inteiramente pelo novo seletor no topo, com o mesmo comportamento de antes (sincroniza agrupamento salvo, visão de calendário salva, limpa a busca).

#### Visão geral (Dashboard)

- Tela renomeada de "Dashboard" para "Visão geral" (título e item de menu).
- Redesenho completo com cinco cards de indicadores no topo: **Tarefas** (total, concluídas/pendentes nos últimos 45 dias, barra de progresso), **Notas** (total, novas na semana, gráfico sparkline dos últimos dias), **Eventos hoje** (contagem, próximo evento, atalho para o Calendário), **Tags mais usadas** (total distintas, top 3 em pills, atalho para Configurações → Tags) e **Itens importantes** (tarefas de prioridade alta/crítica + notas fixadas).
- Segunda linha de cards: **Tarefas por prioridade** (gráfico de rosca com total no centro e legenda com contagem/percentual), **Atividades recentes** (feed real das últimas 4 ações — tarefa concluída, nota criada, agenda criada/atualizada — com ícone, espaço de origem, módulo e horário relativo) e **Próximos eventos** (lista compacta com data/hora, título e categoria colorida).
- Terceira seção: **Indicadores gerais** (taxa de conclusão, % em atraso, criadas vs. concluídas em 30 dias, agendas hoje, carga por espaço).
- Quarta linha: **Notas recentes** (lista com ícone, título, pill do espaço e "Editada hoje/ontem/em DD/MM/AAAA") e **Tarefas importantes** (checkbox, título, pill de prioridade, data amigável "Hoje"/"Amanhã"/data completa, bandeira vermelha para prioridade Crítica).
- Visão geral passou a sempre considerar **todos os espaços**, independente do espaço selecionado no seletor do topo — o restante do sistema continua respeitando o filtro normalmente.
- Rastreamento de `updatedAt` adicionado aos eventos do calendário (não existia antes), permitindo diferenciar "agenda criada" de "agenda atualizada" no feed de atividades.

### Changed

#### Visão geral (Dashboard)

- KPIs de conclusão (card "Tarefas" e "Taxa de conclusão") passaram a considerar apenas tarefas concluídas nos **últimos 45 dias**, não o total histórico.
- Gráfico de rosca "Tarefas por status" substituído por "Tarefas por prioridade", reaproveitando os mesmos dados já usados em outro ponto do dashboard.
- Peso da fonte dos números de destaque reduzido (de extra-negrito para um peso mais simples) em todo o dashboard.
- Tamanhos de fonte gerais do dashboard reduzidos (números, títulos de seção, linhas de lista, rótulos).
- Círculo do gráfico de prioridade aumentado (118px → 150px).
- Layout do card "Próximos eventos" simplificado para o formato compacto (data/hora em uma linha, título, categoria colorida à direita).
- Botão do seletor de espaço com visual menos destacado (borda neutra em vez de preenchimento verde) e levemente mais alto.
- Card "Notas recentes" (formato lista) por notas recentes.

### Removed

#### Visão geral (Dashboard)

- Removidos, por redundância com os novos cards de indicadores: banner de "tarefa crítica e vencida", bloco "Vencidas e Hoje / Esta Semana / Próximas agendas", bloco antigo "Tarefas abertas por prioridade / Produtividade", faixa "Últimas Notas" e seção "Outros pontos de atenção".
## [1.7.040] - 2026-09-02 00:05

### Renomeação do sistema

- Sistema renomeado de "TYVRA Tasks" para **Taskin** em todas as referências visíveis: título da página, marca na sidebar (logo antigo substituído por marca em texto), nome de arquivo padrão sugerido (`taskin.json`), textos de diálogo e metadados de exportação `.ics`.
- As chaves internas de armazenamento (`localStorage`, `IndexedDB`) foram mantidas intactas de propósito, para não causar perda aparente dos dados já salvos pelos usuários.

### Added

#### General

- Perfil do usuário movido do topo da sidebar para um **avatar circular no canto superior direito**, com avatar genérico (ícone) quando não há foto cadastrada.
- Menu dropdown no avatar com as opções **Perfil**, **Configurações** e **Sair** (aciona a desconexão do arquivo).
- Botão de **notificações** (sino) no topo, ainda sem função — placeholder para funcionalidade futura.

#### Sidebar

- Sidebar agora é **expansível/minimizável**, com botão dedicado em formato de círculo flutuante na borda direita, posicionado logo abaixo do nome do sistema.
- No modo minimizado, a sidebar fica só com ícones; a lista de categorias vira um botão único que abre um popover para seleção.
- Alternador de modo escuro/claro sempre fixado no rodapé da sidebar (`margin-top:auto`), na mesma posição em ambos os modos (expandido e minimizado).
- Cor da sidebar fixada permanentemente no esquema escuro, independente do tema geral do sistema — trocar entre modo claro/escuro agora afeta só o restante da tela.
- Largura útil das telas de Notas aumenta automaticamente quando a sidebar está minimizada, aproveitando o espaço liberado.

#### Notes

- Associação de notas com tarefas, no mesmo padrão já usado no calendário: botão "Vincular tarefa" no composer da nota, e seção "Notas" no painel de edição da tarefa listando as vinculadas.
- Ícone do menu "Notas" substituído por um de documento com linhas de texto (mais parecido com anotações).

#### Calendar

- Colunas de data da visão mensal e semanal destacam sábado e domingo com cor diferenciada.
- Eventos com título longo agora quebram linha em vez de estourar a largura da célula (visão mensal).

### Changed

#### Tasks

- Campos "Prazo e hora" e "Recorrência" ficam na mesma linha, lado a lado, com larguras recalculadas para não sobrepor nem cortar texto.
- Coluna de data/hora dimensionada ao próprio conteúdo; Recorrência cresce para ocupar o espaço restante.
- Altura dos campos de data/hora/recorrência padronizada em 34px, alinhados horizontalmente.
- Campos "Status" e "Prioridade" na mesma linha, com distribuição de largura ajustada para dar mais espaço aos botões de prioridade.
- Removidos os textos "Nenhuma agenda/nota vinculada a esta tarefa" — os campos ficam apenas em branco quando vazios.
- Largura do painel de edição fixada em 500px.

#### Calendar

- Campos de data/hora de Início e Fim do composer de evento recalculados para o contexto mais estreito do modal, corrigindo sobreposição.

#### General

- Botão "Desconectar" removido da barra superior — acessível apenas via "Sair" no menu do avatar.
- Nome do arquivo removido da exibição no topo (status do arquivo continua acessível em Configurações → Arquivo).

### Fixed

#### Notes

- Corrigido bug crítico de **duplicação de notas**: o mecanismo de salvamento de segurança (acionado ao trocar de aba/minimizar/fechar) criava uma nova entrada a cada acionamento para notas ainda não salvas, em vez de atualizar a mesma nota. Corrigido tornando a criação idempotente.
- Corrigido o botão de limpar formatação, que ao processar uma seleção dentro de um único parágrafo reconstruía o bloco inteiro, podendo alterar conteúdo fora da seleção e perder quebras de linha. Corrigido usando o `removeFormat` nativo do navegador para esse caso, preservando o restante do conteúdo intacto.

#### Tasks

- Corrigido bug de CSS em que a coluna de Prioridade parou de esticar até a borda direita do painel por reutilizar, por engano, a mesma classe de outra coluna (Prazo e hora); agora usa uma classe própria.

#### Calendar

- Corrigido o cálculo de largura das colunas da visão mensal (bug de `min-width` do CSS Grid) que fazia colunas ficarem com tamanhos desiguais quando havia conteúdo mais longo.

#### Sidebar

- Corrigido o efeito hover do botão de minimizar/expandir, que clareava em vez de escurecer devido a um efeito colateral da cor fixa escura da sidebar; trocado para `filter: brightness()`, que sempre escurece corretamente.

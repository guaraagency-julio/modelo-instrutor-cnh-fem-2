# PRÓXIMA — Direção visual e UX
<!-- impeccable design notes; implementação code-first -->
## Proposta
Landing page de aulas com instrutora para mulheres habilitadas. Mecanismo principal: autoseleção da insegurança para visualizar uma proposta de treino e iniciar a conversa com contexto.

## Linguagem visual
Editorial contemporâneo, energia sóbria e clara. Berinjela `#292035`, pêssego `#f2b0a6`, lavanda `#d8cce9`, creme `#f6f0e9`. Tipografia Outfit nos títulos, DM Sans em texto. Contraste deliberado em blocos de cor. Fotografia ilustrativa de direção.

## Estrutura da conversão
Chamada emocional específica > acolhimento e direito de aprender sem pressões > seletor de dificuldades (5 hipóteses) > exemplos de autonomia > método por etapas > apresentação da instrutora > habilidades praticáveis > FAQ > formulário. O seletor adapta título, descrição, três passos e mensagem de contato.

## Comportamento
Controle de dificuldade com `aria-pressed` e região `aria-live`; menu móvel com `aria-expanded`; formulário obrigatório com validação HTML; modal de cópia sem envio de dados; foco visível e prefers-reduced-motion. Fluxo de contato requer número real no `script.js`.

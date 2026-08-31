# RN Design — contrato do site institucional

Versão consumida: **@rn-design/system 2.3.0**
Modo: **Expressive**
Autoridade: `../system-Design-RN/design-system/rn-design-system/MASTER.md`

Este arquivo não cria uma identidade paralela. Ele registra como o site institucional
consome o RN Design System oficial.

## Fundação obrigatória

- Importar, nesta ordem, `tokens.css`, `base.css` e `components.css` de `@rn-design/system`.
- Usar Montserrat RN como única família de marca.
- Usar somente tokens semânticos `--rn-*` em componentes e seções.
- Preservar o hero branco aprovado, com grid editorial de 160 × 180px.
- Alternar capítulos claros, charcoal, stage e deep para construir ritmo narrativo.
- Usar azul-celeste/ciano como assinatura e `--rn-color-link` nos botões azuis.
- Por preferência explícita do projeto, todo botão com fundo azul usa texto branco.
- Limitar conteúdo a `--rn-content-story` e gutter `--rn-page-gutter`.
- Usar headings `rn-story-heading`, copy `rn-story-copy`, handoff e ticket oficiais.
- Manter um ponto focal por capítulo e evitar mosaicos genéricos sem hierarquia.

## Narrativa oficial do site

1. Hero e abertura da marca.
2. Autoridade e forma de pensar.
3. Capacidades e serviços conectados.
4. Escala técnica e fundamentos de engenharia.
5. Processo em seis etapas.
6. Projetos selecionados e evidência.
7. Próximo passo e canais de contato.

## Motion

- Entrada de capítulo: 420–720ms, somente `transform` e `opacity`.
- Stagger: 45ms, no máximo seis itens por sequência.
- Loops decorativos pausam fora da viewport e somem em reduced motion.
- Scroll e conteúdo continuam completos sem depender da animação.
- Pointer tracking não é usado fora do hero aprovado.
- Não usar tilt, cursor customizado ou glass pesado como linguagem recorrente.

## Responsividade e acessibilidade

- Validar 375, 768, 1024 e 1440px, além de landscape.
- Alvos interativos têm pelo menos 44 × 44px e foco visível de 3px.
- Nenhuma informação existe apenas em hover, cor, imagem ou motion.
- Imagens de projeto e fundador recebem texto alternativo; motivos são decorativos.
- Reduced motion preserva o estado final e desativa parallax, loops e deslocamentos amplos.
- Não existe scroll horizontal na página.

## Fonte de auditoria

As decisões implementadas e sua relação com o sistema estão registradas em
[`PREMIUM-SITE-AUDIT.md`](./PREMIUM-SITE-AUDIT.md).

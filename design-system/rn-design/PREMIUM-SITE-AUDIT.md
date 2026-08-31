# Auditoria premium do site RN Design

Data: **30 de agosto de 2026**  
Escopo: página principal, exceto o hero aprovado  
Referência: RN Design System 2.3.0, modo Expressive

## Fundação e consistência

1. [x] Substituir o master local rosa/Archivo pelo contrato oficial RN 2.3.0.
2. [x] Fixar Expressive como intensidade visual do site institucional.
3. [x] Manter tokens, base e componentes oficiais importados antes do CSS local.
4. [x] Usar somente Montserrat RN nas novas seções.
5. [x] Remover cores hex e RGBA das seções reconstruídas.
6. [x] Mapear cores por papéis semânticos `--rn-color-*`.
7. [x] Usar `--rn-content-story` como largura máxima dos capítulos.
8. [x] Usar `--rn-page-gutter` em vez de paddings arbitrários.
9. [x] Aplicar grid editorial RN de 160 × 180px como atmosfera.
10. [x] Alternar canvas branco, charcoal, stage e deep.
11. [x] Unificar escala de headings com `rn-story-heading`.
12. [x] Unificar copy com `rn-story-copy` e largura de leitura controlada.
13. [x] Padronizar eyebrows numerados de 01 a 06.
14. [x] Padronizar handoffs entre capítulos.
15. [x] Limitar raios aos níveis oficiais usados pelo sistema.
16. [x] Limitar sombras às elevações oficiais.
17. [x] Garantir texto branco em todo botão de fundo azul, conforme preferência aprovada.
18. [x] Criar foco global visível de 3px com token semântico.
19. [x] Compensar o header fixo em âncoras e foco por scroll.
20. [x] Preservar o hero aprovado sem redesenho colateral.

## Arquitetura e narrativa

21. [x] Remover o capítulo SkewCards, redundante e visualmente genérico.
22. [x] Remover o carrossel SlidingImages, que repetia os mesmos cases.
23. [x] Eliminar a espera de até 4,2s para montar conteúdo abaixo do hero.
24. [x] Manter lazy loading por capítulo sem deixar vazios editoriais.
25. [x] Reordenar a história em autoridade → capacidade → escala → processo → prova → CTA.
26. [x] Reservar altura dos capítulos para evitar layout shift.
27. [x] Transformar o fallback em grid RN, em vez de bloco escuro genérico.
28. [x] Acelerar o shimmer do fallback e removê-lo em reduced motion.

## Sobre e autoridade

29. [x] Trocar o showcase 3D genérico por uma seção institucional real.
30. [x] Usar a fotografia profissional real de Rubens Neto.
31. [x] Escrever alt específico para o retrato do fundador.
32. [x] Explicar resultado antes da tecnologia na copy.
33. [x] Criar composição assimétrica derivada do orçamento.
34. [x] Criar card de responsabilidade com nome e funções.
35. [x] Adicionar prova sem números comerciais inventados.
36. [x] Organizar três evidências em faixa editorial responsiva.
37. [x] Aplicar estrela RN apenas como marca d'água decorativa.
38. [x] Aplicar grid e halo sem competir com a leitura.

## Serviços

39. [x] Manter seis serviços para refletir a oferta completa.
40. [x] Reescrever cada serviço como resultado para o cliente.
41. [x] Exibir escopo de cada serviço sem depender de hover.
42. [x] Substituir seis cards 3D por lista editorial hierárquica.
43. [x] Remover tilt e tracking de ponteiro dos serviços.
44. [x] Usar imagens existentes com `next/image` e `sizes` responsivo.
45. [x] Tornar a linha completa um link semântico para contato.
46. [x] Igualar feedback de hover e focus-visible.
47. [x] Limitar stagger a 45ms e seis elementos.
48. [x] Empilhar cada serviço sem overflow em 375px.

## Escala técnica

49. [x] Transformar o globo em capítulo stage do sistema.
50. [x] Reduzir a rotação de scroll para evitar sensação agressiva.
51. [x] Manter o canvas em 30fps e pausado fora da viewport.
52. [x] Remover o arraste como requisito de interação.
53. [x] Expor o globo como visualização com nome acessível.
54. [x] Mostrar performance, acessibilidade e integrações como fundamentos.
55. [x] Adicionar orbitais e coordenadas como decoração contextual.
56. [x] Pausar loops CSS fora da viewport e em reduced motion.

## Processo

57. [x] Preservar as seis etapas canônicas do RN Design System.
58. [x] Usar lista ordenada para comunicar sequência semanticamente.
59. [x] Exibir entregável de cada etapa permanentemente.
60. [x] Criar trilho de progresso visual sem controlar a existência do conteúdo.
61. [x] Fixar o resumo do processo no desktop para orientar a leitura.
62. [x] Transformar o processo em leitura linear no mobile.
63. [x] Remover cards glass, springs e glows repetidos.
64. [x] Adicionar CTA específico: “Planejar meu projeto”.

## Projetos

65. [x] Remover modal que seguia o cursor.
66. [x] Remover três pipelines GSAP de tracking do portfólio.
67. [x] Exibir screenshots reais permanentemente.
68. [x] Adicionar alt específico para cada case.
69. [x] Adicionar escopo, ano e resumo permanentemente.
70. [x] Criar grid editorial de 12 colunas com cases em ritmos 7/5.
71. [x] Destacar primeiro e último case sem esconder os demais.
72. [x] Manter hover como acabamento, não como acesso à informação.
73. [x] Desativar elevação e zoom em reduced motion.
74. [x] Adicionar CTA final contextual depois das evidências.

## Contato e fechamento

75. [x] Transformar o fechamento em landmark `footer`.
76. [x] Reescrever a CTA como próximo passo concreto.
77. [x] Usar `rn-story-ticket` como superfície de decisão.
78. [x] Usar o logo oficial dentro do ticket.
79. [x] Informar que o contato é direto, sem formulário longo.
80. [x] Garantir alvo amplo e texto branco no WhatsApp.
81. [x] Transformar redes sociais em navegação semântica.
82. [x] Garantir 44px mínimos em redes e links legais.
83. [x] Adicionar Política de Privacidade e Termos de Uso.
84. [x] Adicionar retorno ao início com texto explícito.
85. [x] Pausar o motion de fechamento fora da viewport.
86. [x] Manter todo conteúdo do footer legível em reduced motion.

## Critérios da segunda auditoria

- Lint e build sem erros.
- Página e folhas CSS retornando HTTP 200.
- Nenhum valor hexadecimal/RGBA nas seções reconstruídas.
- Um `h1` no hero e `h2` sequenciais nos capítulos.
- Conteúdo completo sem depender de hover.
- Imagens significativas com alt; imagens decorativas com alt vazio.
- Loops pausados fora da viewport e removidos em reduced motion.
- Layouts específicos para 375, 768, 1024 e 1440px.

## Resultado da auditoria final

- **86 oportunidades implementadas** e reinspecionadas em código e navegador real.
- Auditor oficial RN em modo estrito: **31 arquivos, 0 erros e 0 avisos**.
- ESLint: **0 erros e 0 avisos**.
- Build de produção: **7 páginas estáticas geradas**, sem falhas de compilação ou tipos.
- Página principal: **44,4 kB** de rota e **131 kB** de JavaScript inicial total.
- HTTP: home, páginas legais, ícone, CSS, chunks e **13 imagens otimizadas** responderam `200`.
- Sem cores hex/RGB/RGBA locais nem durações locais de motion no código ativo.
- Chrome em 375, 768, 1024 e 1440px: **nenhum overflow horizontal** e **nenhuma exceção JavaScript**.
- Estrutura: **1 `h1`**, **1 `main`**, **1 `footer`**, sem saltos de heading e sem IDs duplicados.
- Mídia: **21 imagens carregadas**, nenhuma quebrada e nenhuma sem atributo `alt`.
- Interação: nenhum link ou botão visível abaixo de 24px; CTAs principais excedem 44px.
- Performance ambiental: hero desativa motion ao sair da viewport; globo e footer pausam seus loops fora de cena.
- Inspeção visual concluída nos estados desktop e mobile, incluindo hero, Sobre, Serviços, Escala, Processo, Projetos e Contato.

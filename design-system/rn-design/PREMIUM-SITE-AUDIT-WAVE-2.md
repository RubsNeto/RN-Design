# RN Design — Auditoria Premium, Onda 2

Esta onda preserva o hero aprovado e eleva o restante da experiência segundo o modo **RN Expressive**. As oportunidades abaixo são adicionais à primeira auditoria e foram escolhidas por impacto perceptível, acessibilidade, clareza e performance.

## Fundação, conteúdo e descoberta

1. [x] Centralizar identidade, contato e redes sociais em uma única configuração.
2. [x] Eliminar URLs e mensagens de WhatsApp duplicadas entre componentes.
3. [x] Tornar o ano de copyright automático.
4. [x] Substituir a alegação temporal “Agenda aberta” por uma informação durável e verificável.
5. [x] Criar uma mensagem de WhatsApp contextual e consistente para aquisição.
6. [x] Adotar template de títulos para páginas internas.
7. [x] Enriquecer a descrição institucional sem linguagem genérica.
8. [x] Adicionar metadados de autor, creator, publisher e categoria.
9. [x] Adicionar palavras-chave coerentes com os serviços reais.
10. [x] Configurar robots para indexação e snippets.
11. [x] Adicionar Open Graph completo e baseado em URL configurável.
12. [x] Adicionar metadados para compartilhamento no X/Twitter.
13. [x] Desativar detecção automática incorreta de telefone/e-mail pelo navegador.
14. [x] Incluir dados estruturados JSON-LD do estúdio sem inventar endereço ou avaliações.
15. [x] Tornar a URL canônica configurável por ambiente.

## Navegação e orientação

16. [x] Substituir o link redundante “Contato” por “Processo”; o CTA já cobre contato.
17. [x] Detectar automaticamente a seção visível durante o scroll.
18. [x] Comunicar a seção ativa com `aria-current`.
19. [x] Manter o indicador visual ativo além do estado de hover.
20. [x] Dar ao cabeçalho um estado compacto/elevado após o início do scroll.
21. [x] Numerar os links do menu mobile para reforçar a linguagem editorial.
22. [x] Animar a abertura do menu mobile sem alternância abrupta de `display`.
23. [x] Mover o foco ao primeiro link quando o menu mobile abrir.
24. [x] Prender o foco dentro do menu enquanto estiver aberto.
25. [x] Fechar o menu por Escape e devolver foco ao acionador.
26. [x] Fechar o menu ao clicar fora dele.
27. [x] Bloquear o scroll de fundo enquanto o menu mobile estiver aberto.
28. [x] Fechar o menu ao mudar para viewport desktop.
29. [x] Respeitar safe areas de dispositivos móveis no cabeçalho.
30. [x] Informar leitores de tela quando um link abre uma nova aba.

## Interação e acessibilidade sistêmica

31. [x] Adicionar `touch-action: manipulation` aos controles para resposta tátil direta.
32. [x] Remover o flash de toque genérico e usar feedback visual da marca.
33. [x] Adicionar estado pressionado consistente a botões e links de ação.
34. [x] Reforçar foco visível nas cenas escuras.
35. [x] Balancear quebras de linha dos títulos editoriais.
36. [x] Melhorar a composição de parágrafos com `text-wrap: pretty`.
37. [x] Aumentar o texto descritivo dos serviços no mobile para leitura confortável.
38. [x] Garantir margem correta ao navegar por âncoras de todas as seções.

## Narrativa, prova e acabamento

39. [x] Tornar o passo atual do processo visível conforme o usuário avança.
40. [x] Fazer o trilho do processo progredir de acordo com o scroll, não apenas uma vez.
41. [x] Destacar o marcador da etapa ativa sem esconder as demais.
42. [x] Exibir a quantidade de projetos selecionados no cabeçalho da seção.
43. [x] Melhorar descrições alternativas das imagens dos projetos.
44. [x] Transformar o ticket de contato em informação operacional: canal, condução e abrangência.
45. [x] Tornar os links sociais semanticamente mais claros e consistentes.

## Performance e continuidade

46. [x] Reproduzir o preloader completo apenas na primeira visita da sessão.
47. [x] Preservar links diretos para seções depois da introdução.
48. [x] Encurtar a abertura para usuários com economia de dados ou movimento reduzido.
49. [x] Adiar o canvas do globo até a aproximação da viewport e adaptar sua qualidade ao dispositivo.
50. [x] Remover interatividade morta e dependências não utilizadas do globo, mantendo animação offscreen pausada.

## Critérios de encerramento

- Auditoria estrita do RN Design System sem erros ou avisos.
- Lint e build de produção sem falhas.
- Revisão visual em 375, 768, 1024 e 1440 px, além de landscape e movimento reduzido.
- Sem overflow horizontal, alvos pequenos, imagens quebradas ou exceções no navegador.

## Resultado da auditoria

- 50 de 50 oportunidades implementadas.
- Navegação por âncora estabilizada removendo carregamento tardio que alterava a geometria mobile.
- Preloader completo limitado à primeira abertura da sessão; retorno sem flash visual.
- Canvas do globo carregado sob demanda, com 20–30 FPS, DPR adaptativo e redução de pontos em dispositivos limitados.
- Menu mobile verificado com foco inicial, foco contido, Escape, clique externo e bloqueio de scroll.
- Auditoria visual: 375, 768, 1024 e 1440 px, mais 844 × 390 landscape.
- Reduced motion: conteúdo final visível, zero animações em execução após a abertura.

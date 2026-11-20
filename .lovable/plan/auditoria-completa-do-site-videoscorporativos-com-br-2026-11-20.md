# Auditoria completa do site videoscorporativos.com.br

Objetivo: entregar um relatório claro do estado atual do site, com problemas priorizados e o que corrigir primeiro. Nenhuma alteração no site nesta etapa — só diagnóstico.

## O que será verificado

1. **SEO (Google e Bing)**
   - Títulos, descrições e cabeçalhos de todas as páginas (home, serviços, cases, preços, blog, páginas por segmento)
   - Páginas duplicadas ou disputando a mesma palavra-chave
   - Sitemap, robots.txt, links quebrados e páginas sem links internos
   - Dados do Google Search Console: páginas indexadas, cliques, impressões, posição e CTR

2. **Visibilidade nas IAs (ChatGPT, Gemini, Perplexity)**
   - llms.txt, dados estruturados (empresa local, avaliações, FAQ, vídeos, artigos)
   - Clareza das informações de autor e da empresa

3. **Experiência do visitante (UX)**
   - Navegação no celular e no computador (capturas de tela das principais páginas)
   - Clareza dos botões de orçamento e WhatsApp
   - Velocidade de carregamento e peso das imagens/vídeos

4. **Conversão e Analytics**
   - Confirmar que os cliques no WhatsApp e formulário chegam no Google Analytics
   - Taxa de contato por página

5. **Segurança**
   - Varredura rápida do banco de dados e das permissões
   - Pacotes desatualizados com falhas conhecidas

6. **Conteúdo do blog**
   - Posts publicados x agendados, posts sem tráfego, oportunidades de atualização

## Entrega

Um relatório em português (arquivo para download) com:
- Nota geral por área
- Lista de problemas ordenada por impacto (alto / médio / baixo)
- Recomendações práticas e quais posso corrigir em seguida

## Detalhes técnicos

- Ferramentas: scan de SEO, Search Console, Analytics do projeto, scan de segurança + verificação de dependências, Playwright para capturas mobile (421px) e desktop, verificação HTTP de todas as URLs do sitemap.
- Relatório salvo em /mnt/documents/auditoria-site-2026-11.md.

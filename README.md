# Corporate Video Hub

# Prompt para o Lovable — Site de Produção de Vídeo Corporativo

> Como usar: cole o **PROMPT 1** como primeira mensagem ao criar o projeto novo no Lovable.
> Depois que ele gerar o site, mande o **PROMPT 2** (SEO) e o **PROMPT 3** (refino visual) como mensagens seguintes.
> Troque tudo que estiver entre [colchetes] pelos seus dados reais.

---

## PROMPT 1 — Construção do site (cole isso primeiro)

Crie um site institucional de uma página (single page, com âncoras de navegação) em **português do Brasil** para uma produtora de vídeo corporativo chamada **[Alê Produções / seu nome de marca]**, com mais de 30 anos de experiência, sediada em São Paulo e atendendo todo o Brasil. O objetivo do site é duplo: gerar leads pelo Google e servir de vitrine impressionante quando eu abrir o site numa reunião de vendas.

Público-alvo: gestores de marketing, RH e comunicação de empresas que precisam de vídeos profissionais.

### Estrutura e seções (nesta ordem)

1. **Header fixo** com logo à esquerda e menu: Serviços, Portfólio, Processo, Sobre, Contato. Botão de destaque "Solicitar orçamento" à direita.

2. **Hero (topo)** ocupando a tela inteira, com fundo escuro e um vídeo de showreel em destaque (use um player de vídeo grande, placeholder por enquanto):
   - Headline: **"Vídeos que fazem a sua empresa ser levada a sério."**
   - Subheadline: "Produção de vídeo institucional, eventos corporativos e feiras de negócios. Roteiro, captação e edição com mais de 30 anos de bagagem — em São Paulo e todo o Brasil."
   - Dois botões: "Ver portfólio" e "Solicitar orçamento".

3. **Faixa de logos de clientes** (placeholders de logos em cinza, monocromático) com o texto "Empresas que já confiaram no nosso trabalho".

4. **Serviços** — três cards lado a lado:
   - *Vídeo Institucional*: "Conte a história, os valores e o diferencial da sua empresa em um filme que transmite credibilidade."
   - *Eventos Corporativos*: "Cobertura completa de convenções, lançamentos e confraternizações, com entrega ágil e qualidade de cinema."
   - *Feiras de Negócios*: "Registro e aftermovie da sua participação em feiras, para gerar conteúdo e provar resultado."

5. **Portfólio** — galeria/grid de vídeos com filtro por categoria (Institucional, Eventos, Feiras). Use 6 placeholders de vídeo (embeds do YouTube/Vimeo). Cada item abre o vídeo num modal/lightbox.

6. **Processo** — uma timeline horizontal com 5 etapas numeradas: 1) Briefing e roteiro · 2) Pré-produção · 3) Captação · 4) Edição e finalização · 5) Entrega nos formatos certos.

7. **Por que [marca]** — bloco com 4 números/diferenciais: "+30 anos de experiência", "Projetos em todo o Brasil", "Roteiro + captação + edição em um só lugar", "Entrega em todos os formatos (institucional, Reels, YouTube)".

8. **Sobre** — foto à esquerda (placeholder), texto à direita: "Sou [Alexandre Machado], produtor audiovisual com mais de 30 anos dedicados à imagem corporativa. Já registrei desde grandes eventos a filmes institucionais para empresas de todo o país, sempre com o mesmo princípio: vídeo que comunica com clareza e respeita a reputação da marca."

9. **Depoimentos** — carrossel com 3 depoimentos (placeholders com nome, cargo e empresa).

10. **CTA final + Contato** — fundo escuro, título "Vamos produzir o vídeo da sua empresa?", formulário curto (Nome, Empresa, E-mail, WhatsApp, Mensagem) e, ao lado, botão direto de WhatsApp e e-mail de contato.

11. **Footer** com logo, menu, e-mail [seu@email.com], WhatsApp e redes sociais.

12. **Botão flutuante de WhatsApp** fixo no canto inferior direito em todas as telas.

### Direção visual
- Estilo **cinematográfico e corporativo**: tema escuro (quase preto) com um único tom de destaque vibrante (sugestão: âmbar/laranja ou azul elétrico). Muito espaço em branco (negativo), tipografia sans-serif moderna e elegante, títulos grandes e marcantes.
- Microanimações sutis ao rolar a página (fade/slide-in). Cantos levemente arredondados. Visual premium, sem cara de template genérico.
- Totalmente responsivo, com prioridade para mobile.

### Funcionalidades
- Navegação por âncoras com scroll suave.
- Players de vídeo com lazy loading para não pesar o carregamento.
- O formulário de contato deve enviar os dados (use uma integração simples; se precisar de backend, use Supabase ou me oriente a conectar o Formspree).

---

## PROMPT 2 — SEO (mande depois que o site estiver pronto)

Otimize este site para SEO em português do Brasil, focado em buscas locais. Faça:
- Defina o atributo `lang="pt-BR"` no HTML.
- Crie meta title e meta description únicos, com as palavras-chave: "vídeo institucional São Paulo", "filmagem de eventos corporativos" e "vídeo para feira de negócios".
- Garanta uma única H1 por página, com palavra-chave, e hierarquia correta de H2/H3.
- Adicione texto alternativo (alt) descritivo em todas as imagens.
- Gere sitemap.xml e robots.txt.
- Adicione Open Graph e Twitter Card para compartilhamento.
- Adicione schema structured data do tipo **LocalBusiness** (nome, cidade São Paulo, área de atendimento Brasil, telefone/WhatsApp).
- Rode a verificação de SEO do Lovable e corrija os itens pendentes.

---

## PROMPT 3 — Refinos (use conforme for ajustando)

Exemplos de mensagens para iterar depois:
- "Deixe o hero mais impactante: aumente o tamanho da headline e faça o vídeo de fundo ocupar a tela inteira com um leve escurecimento por cima."
- "Troque a cor de destaque para [cor] e teste como fica."
- "Adicione uma seção de FAQ antes do rodapé com 4 perguntas: quanto custa um vídeo institucional, prazo de entrega, atende fora de SP, e o que está incluso."
- "Crie uma página separada de blog para artigos de SEO, com listagem de posts e página individual de artigo."

---

## Checklist depois de publicar
- [ ] Trocar todos os [placeholders] por dados reais (nome/marca, e-mail, WhatsApp, logos, depoimentos).
- [ ] Substituir os vídeos placeholder pelos seus reais (YouTube não listado ou Vimeo).
- [ ] Conectar domínio próprio (ex.: alefilmes.com.br) nas configurações do Lovable.
- [ ] Rodar a aba "SEO & AI search" e gerar sitemap/robots/schema.
- [ ] Cadastrar o site no Google Search Console e enviar o sitemap.
- [ ] Testar o formulário e o botão de WhatsApp no celular.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://videoscorporativos.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ce91384b-4394-4b53-9e43-bef737f42072).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

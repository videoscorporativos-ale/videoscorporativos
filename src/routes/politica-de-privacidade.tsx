import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/politica-de-privacidade`;
const TITLE = "Política de Privacidade · LGPD · Vídeos Corporativos";
const DESCRIPTION =
  "Como coletamos, usamos e protegemos seus dados de contato conforme a Lei Geral de Proteção de Dados (LGPD).";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-6 prose prose-invert">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground not-prose">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">Política de Privacidade</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Política de Privacidade
          </h1>
          <p className="mt-6 text-muted-foreground">
            Esta página descreve como tratamos seus dados pessoais em conformidade com a
            Lei nº 13.709/2018 (LGPD).
          </p>

          <Section title="1. Quais dados coletamos">
            <p>Coletamos apenas os dados que você informa voluntariamente no formulário de contato:
            nome, WhatsApp, empresa (opcional) e a mensagem enviada. Também registramos a página
            de origem e parâmetros de campanha (UTM) para entender qual canal gerou o contato.</p>
          </Section>

          <Section title="2. Para que usamos">
            <p>Usamos seus dados exclusivamente para responder ao seu contato, elaborar
            propostas comerciais e realizar acompanhamento do projeto. Não vendemos, alugamos
            ou compartilhamos seus dados com terceiros para fins de marketing.</p>
          </Section>

          <Section title="3. Base legal (LGPD)">
            <p>Tratamos os dados com base no seu consentimento (art. 7º, I) manifestado ao
            marcar a caixa de aceite no formulário, e no legítimo interesse para pré-atendimento
            comercial (art. 7º, IX).</p>
          </Section>

          <Section title="4. Retenção">
            <p>Mantemos os dados enquanto houver relação comercial ativa ou pelo prazo legal
            aplicável (até 5 anos após o último contato), e depois disso anonimizamos ou
            excluímos.</p>
          </Section>

          <Section title="5. Seus direitos">
            <p>Você pode a qualquer momento solicitar confirmação, acesso, correção, portabilidade,
            anonimização ou exclusão dos seus dados, bem como revogar o consentimento.
            Envie a solicitação para <a href="mailto:comercial@alefotografo.com.br" className="text-brand">comercial@alefotografo.com.br</a>.</p>
          </Section>

          <Section title="6. Segurança">
            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo
            criptografia em trânsito (HTTPS) e controle de acesso ao banco de dados.</p>
          </Section>

          <Section title="7. Contato do controlador">
            <p>Alexandre Machado — comercial@alefotografo.com.br — WhatsApp (11) 91355-0533.</p>
          </Section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 not-prose">
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto custa um vídeo institucional?",
    a: "O valor depende do escopo do projeto — duração final, número de locações, diárias de captação, tamanho da equipe e complexidade da edição. Cada orçamento é feito sob medida após uma conversa rápida de 15 a 20 minutos, em que entendemos o objetivo, o público e o formato de entrega.",
  },
  {
    q: "Qual é o prazo de entrega?",
    a: "Varia conforme a complexidade. Um vídeo institucional padrão fica pronto entre 3 e 5 semanas após a captação. Para coberturas de eventos e aftermovies trabalhamos com prazos a partir de 7 dias e entregas expressas (24 a 48h) sob demanda.",
  },
  {
    q: "Vocês atendem fora de São Paulo?",
    a: "Sim. Somos sediados em São Paulo e atendemos clientes em todo o Brasil, com experiência também em produções no exterior — incluindo convenções de vendas em destinos como Punta Cana e cobertura de feiras internacionais.",
  },
  {
    q: "O que está incluído no serviço?",
    a: "Roteiro, direção, captação em 4K, edição, color grading, sound design e trilha sonora licenciada. Entregamos o material nos formatos certos para cada canal: vídeo institucional para site e apresentações, cortes verticais para Reels e TikTok, e versões otimizadas para YouTube e LinkedIn.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">FAQ</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Perguntas frequentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-lg hover:no-underline hover:text-brand">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
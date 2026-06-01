import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto custa um vídeo institucional?",
    a: "O investimento varia conforme o escopo do projeto: duração do vídeo, número de diárias de filmagem, locações, equipe envolvida e nível de pós-produção (edição, color grading, trilha). Vídeos institucionais costumam partir de um pacote sob medida, definido após uma conversa rápida para entender o objetivo. Envie uma mensagem com o briefing e devolvemos um orçamento personalizado.",
  },
  {
    q: "Qual é o prazo de entrega?",
    a: "Depende da complexidade. Um vídeo institucional padrão costuma ser entregue em algumas semanas, contando roteiro, captação e finalização. Para eventos e feiras, há a opção de aftermovie com entrega acelerada. O prazo exato é combinado no início do projeto, junto ao cronograma.",
  },
  {
    q: "Vocês atendem fora de São Paulo?",
    a: "Sim. A base é em São Paulo, com atendimento em toda a Grande SP, ABC, Alphaville, Faria Lima, Paulista e Berrini, mas realizamos projetos em todo o Brasil — e já produzimos coberturas inclusive no exterior, como convenções internacionais.",
  },
  {
    q: "O que está incluído no serviço?",
    a: "O serviço cobre todas as etapas: briefing e roteiro, pré-produção (planejamento, locações, equipe, cronograma), captação com equipamentos profissionais, edição, color grading, trilha e mixagem, e entrega nos formatos certos para cada canal — institucional, Reels, YouTube e mais.",
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
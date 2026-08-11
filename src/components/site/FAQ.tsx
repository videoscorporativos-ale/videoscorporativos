import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto custa um vídeo corporativo?",
    a: "O investimento depende do escopo: duração, número de diárias de gravação, quantidade de locações, equipe envolvida e nível de pós-produção. Vídeos institucionais e corporativos são orçados sob medida após uma conversa curta para entender o objetivo. Envie o briefing pelo WhatsApp e devolvemos um orçamento personalizado.",
  },
  {
    q: "Quanto custa um vídeo institucional?",
    a: "O vídeo institucional é orçado por escopo: duração final, diárias de gravação, locações e nível de finalização. Há referências de faixa de investimento na página de preços, e o valor exato sai depois de um briefing rápido pelo WhatsApp.",
  },
  {
    q: "Vocês fazem roteiro?",
    a: "Sim. O roteiro faz parte do serviço. Partimos do objetivo comercial ou de comunicação, definimos a mensagem, a ordem das informações e quem fala o quê. Em treinamentos e integração, o roteiro é construído a partir dos procedimentos e materiais internos da empresa.",
  },
  {
    q: "Vocês gravam na empresa?",
    a: "Sim. A maior parte dos projetos é gravada nas próprias instalações do cliente — escritório, fábrica, centro de distribuição, clínica ou hospital — com equipe preparada para trabalhar durante a operação, sem interromper o funcionamento da área.",
  },
  {
    q: "Quanto tempo leva para produzir?",
    a: "Um vídeo institucional ou corporativo padrão costuma ser entregue em algumas semanas, contando roteiro, captação e finalização. Cobertura de eventos tem opção de aftermovie com entrega acelerada. O prazo exato é fechado no início do projeto, junto do cronograma de aprovações.",
  },
  {
    q: "O vídeo pode ser usado no YouTube, site, LinkedIn e Instagram?",
    a: "Sim. A entrega inclui as versões e proporções necessárias para site, YouTube, LinkedIn e Instagram, sem limitação de uso nos canais da própria empresa.",
  },
  {
    q: "Entregam vídeos para redes sociais?",
    a: "Sim. Além da versão principal, entregamos cortes verticais para Reels, Shorts e TikTok, versões quadradas para LinkedIn e Instagram e cortes curtos para tráfego pago, todos com legendas.",
  },
  {
    q: "Fazem vídeo de treinamento?",
    a: "Sim. Produzimos vídeos de treinamento a partir dos procedimentos da empresa, com módulos separados por tema, narração e legendas — prontos para o portal de treinamento ou LMS.",
  },
  {
    q: "Fazem vídeo de integração?",
    a: "Sim. O vídeo de integração cobre boas-vindas, cultura, normas internas, segurança e mensagem da liderança, em versão completa e cortes curtos por assunto.",
  },
  {
    q: "Fazem cobertura de eventos corporativos?",
    a: "Sim. Cobrimos convenções, fóruns, premiações, SIPAT, treinamentos presenciais, confraternizações e feiras de negócios, com entrevistas, aftermovie e cortes para divulgação da próxima edição.",
  },
  {
    q: "Atendem clínicas, escritórios e indústrias?",
    a: "Sim. Já produzimos para indústria química, logística, farmacêutico, hotelaria, escritórios de advocacia, associações e saúde. Cada segmento tem exigências próprias de acesso, segurança e linguagem, e isso entra no planejamento.",
  },
  {
    q: "Como pedir orçamento pelo WhatsApp?",
    a: "Fale com a gente pelo WhatsApp informando o tipo de vídeo, o objetivo, a cidade da gravação e o prazo desejado. Com essas informações devolvemos escopo, cronograma e valor. Também é possível enviar o briefing pelo formulário de contato do site.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">FAQ</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            Perguntas frequentes sobre vídeo corporativo
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 w-full">
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
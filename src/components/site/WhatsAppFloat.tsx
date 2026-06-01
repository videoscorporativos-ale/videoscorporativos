import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "./WhatsAppLink";

export function WhatsAppFloat() {
  return (
    <WhatsAppLink
      location="float_button"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-brand text-brand-foreground shadow-2xl shadow-brand/30 flex items-center justify-center hover:scale-110 transition"
    >
      <MessageCircle className="size-6" />
    </WhatsAppLink>
  );
}
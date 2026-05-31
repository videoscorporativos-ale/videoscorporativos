import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo.png";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Processo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" aria-label="Ale Fotógrafo" className="flex items-center">
          <img
            src={logoUrl}
            alt="Ale Fotógrafo"
            width={160}
            height={48}
            className="h-10 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-medium text-brand-foreground hover:opacity-90 transition"
        >
          Solicitar orçamento
        </a>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
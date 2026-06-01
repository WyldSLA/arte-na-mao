import Link from "next/link";
import { NewsLetterForm } from "./NewsletterForm";

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Twitter/X",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "E-mail",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export function FooterHome() {
  return (
    <footer style={{ background: "#2C2421", color: "white" }}>
      {/* ── Newsletter ── */}
      <div
        className="py-16 border-b"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-black mb-3" style={{ fontSize: "1.875rem" }}>
            Fique por dentro das{" "}
            <span style={{ color: "var(--brand-primary)" }}>novidades</span>
          </h3>
          <p
            className="mb-8 text-sm"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Receba atualizações sobre novos artistas, obras e eventos
          </p>
          <NewsLetterForm />
        </div>
      </div>

      {/* ── Links ── */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="grid gap-12 mb-12"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            {/* Marca */}
            <div>
              <p
                className="font-bold mb-4 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                }}
              >
                Arte na{" "}
                <span style={{ color: "var(--brand-primary)" }}>Mão</span>
              </p>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Celebrando e conectando os artistas mais talentosos do Nordeste
                brasileiro.
              </p>
              {/* Ícones sociais */}
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 transition-all duration-300 hover:bg-(--brand-primary)"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Explorar */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
                Explorar
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { href: "/artistas", label: "Artistas" },
                  { href: "/obras", label: "Obras" },
                  { href: "/eventos", label: "Eventos" },
                  { href: "#", label: "Coleções" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70! transition-colors duration-300 hover:text-(--brand-primary)!"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
                Recursos
              </h4>
              <ul className="flex flex-col gap-3">
                {["Como Vender", "Guia do Artista", "Blog", "FAQ"].map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-white/70! transition-colors duration-300 hover:text-(--brand-primary)!"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
                Empresa
              </h4>
              <ul className="flex flex-col gap-3">
                {["Sobre Nós", "Contato", "Termos de Uso", "Privacidade"].map(
                  (l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-sm text-white/70! transition-colors duration-300 hover:text-(--brand-primary)!"
                      >
                        {l}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t text-sm border-white/10 text-white/70">
            <p>© 2026 Arte na Mão. Todos os direitos reservados.</p>
            <p>Feito com ❤️ no Nordeste brasileiro</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

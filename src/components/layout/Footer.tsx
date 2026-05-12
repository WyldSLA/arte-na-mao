import Link from "next/link";
import { LogoIcon } from "../ui/logo";

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        className="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
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
        className="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
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
        className="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
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
        className="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h3 className="newsletter-title">
              Fique por dentro das <span className="highlight">novidades</span>
            </h3>
            <p className="newsletter-description">
              Receba atualizações sobre novos artistas, obras e eventos
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Marca */}
            <div>
              <div className="footer-brand">
                <LogoIcon />
                Arte na <span className="highlight">Mão</span>
              </div>
              <p className="footer-description">
                Celebrando e conectando os artistas mais talentosos do Nordeste
                brasileiro.
              </p>
              <div className="social-links">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-link"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Explorar */}
            <div className="footer-column">
              <h4>Explorar</h4>
              <ul className="footer-links">
                {[
                  { href: "/artistas", label: "Artistas" },
                  { href: "/obras", label: "Obras" },
                  { href: "/eventos", label: "Eventos" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recursos */}
            <div className="footer-column">
              <h4>Recursos</h4>
              <ul className="footer-links">
                {["Como Vender", "Guia do Artista", "FAQ"].map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div className="footer-column">
              <h4>Empresa</h4>
              <ul className="footer-links">
                {["Sobre Nós", "Contato", "Termos de Uso", "Privacidade"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Arte na Mão. Todos os direitos reservados.</p>
            <p>Feito com ❤️ no Nordeste brasileiro</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/1e/e7/d4/1ee7d42408a8f9477382472dcc739494.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-12 text-center text-white">
        <h2
          className="font-bold leading-tight mb-8 opacity-90"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Faça parte da comunidade Arte na Mão
        </h2>
        <p
          className="font-light mb-12 opacity-80 max-w-xl mx-auto"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
        >
          Cadastre-se agora e comece a compartilhar sua arte com o mundo
        </p>
        <Link
          href="/cadastro"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium transition-all hover:-translate-y-1 text-white"
          style={{
            background: "var(--brand-primary)",
            boxShadow: "var(--shadow-strong)",
          }}
        >
          Criar Conta Grátis
        </Link>
      </div>
    </section>
  );
}

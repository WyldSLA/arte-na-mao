import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "var(--background)" }}
    >
      {/* Número grande decorativo */}
      <p
        className="font-bold leading-none select-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 20vw, 16rem)",
          color: "var(--muted)",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Mensagem */}
      <div className="-mt-8 mb-8">
        <h1
          className="font-bold mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "var(--foreground)",
          }}
        >
          Obra não encontrada
        </h1>
        <p
          className="max-w-md mx-auto"
          style={{
            fontSize: "1.125rem",
            color: "var(--muted-foreground)",
            fontWeight: 300,
          }}
        >
          Parece que esta página foi levada pelo vento do sertão. Volte para
          explorar as obras e artistas da plataforma.
        </p>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link href="/" className="btn btn-primary btn-lg">
          Voltar para Home
        </Link>
        <Link href="/obras" className="btn btn-outline btn-lg">
          Ver Obras
        </Link>
      </div>

      {/* Decoração sutil */}
      <div
        className="mt-16 text-6xl select-none"
        aria-hidden="true"
        style={{ opacity: 0.15 }}
      >
        🎨
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { featuredArtworks } from "@/lib/mock-data";
import { categoriaLabel } from "@/lib/utils";

export function FeaturedSection() {
  return (
    <section className="py-20" style={{ background: "var(--color-card)" }}>
      <div className="max-w-450 mx-auto px-6">
        <div className="mb-12">
          <h2
            className="font-bold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-foreground)",
            }}
          >
            Obras de artistas da{" "}
            <span style={{ color: "var(--brand-primary)" }}>comunidade</span>
          </h2>
          <div
            className="h-1 w-24 rounded"
            style={{ background: "var(--brand-primary)" }}
          />
        </div>

        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {featuredArtworks.map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/obras/${artwork.id}`}
              className="group relative overflow-hidden rounded-xl block"
              style={{
                aspectRatio: "4/3",
                background: "var(--color-muted)",
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Image
                src={artwork.imagemUrl}
                alt={artwork.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-1"
                  style={{ color: "var(--brand-primary)" }}
                >
                  {categoriaLabel[artwork.categoria] ?? artwork.categoria}
                </p>
                <h3
                  className="text-white text-2xl font-semibold mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {artwork.titulo}
                </h3>
                <p className="text-white/80 text-sm">{artwork.artistaNome}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

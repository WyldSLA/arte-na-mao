import Image from "next/image";
import Link from "next/link";
import { artistsWithWorks } from "@/lib/mock-data";

export function ArtistsSection() {
  return (
    <section
      className="py-32"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-foreground)",
            }}
          >
            Artistas e Suas{" "}
            <span style={{ color: "var(--brand-primary)" }}>Criações</span>
          </h2>
          <p
            className="text-xl font-light max-w-2xl mx-auto"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            Explore o trabalho de artistas talentosos e suas obras disponíveis
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {artistsWithWorks.map((artist) => (
            <div key={artist.id}>
              <div className="flex items-center gap-6 mb-10">
                <div
                  className="relative w-24 h-24 rounded-full overflow-hidden border-4 shrink-0"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <Image
                    src={artist.avatar}
                    alt={artist.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      letterSpacing: "-0.02em",
                      color: "var(--color-foreground)",
                    }}
                  >
                    {artist.nome}
                  </h3>
                  <p
                    className="text-lg font-light"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {artist.specialty} • {artist.location}
                  </p>
                </div>
              </div>

              <div
                className="grid gap-8"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                {artist.obras.map((obra) => (
                  <Link
                    key={obra.id}
                    href={`/obras/${obra.id}`}
                    className="group block"
                  >
                    <div
                      className="relative overflow-hidden rounded-xl mb-4"
                      style={{
                        aspectRatio: "4/3",
                        background: "var(--color-muted)",
                      }}
                    >
                      <Image
                        src={obra.imagemUrl}
                        alt={obra.titulo}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h4
                      className="font-semibold text-xl mb-1 transition-colors duration-300 group-hover:text-[var(--brand-primary)]"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {obra.titulo}
                    </h4>
                    <p
                      className="text-lg font-bold"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      {obra.preco}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

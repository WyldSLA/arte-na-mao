import Image from "next/image";

export function MissionSection() {
  return (
    <section
      className="py-32"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "hsla(15,75%,45%,0.1)",
                color: "var(--brand-primary)",
              }}
            >
              Artista |
            </span>
            <h2
              className="font-black leading-tight mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-foreground)",
              }}
            >
              O Arte na Mão é o seu
              <br />
              espaço para{" "}
              <span style={{ color: "var(--brand-primary)" }}>brilhar</span>
            </h2>
            <p
              className="text-xl font-light mb-8"
              style={{
                color: "var(--color-muted-foreground)",
                lineHeight: "1.8",
              }}
            >
              No Arte na Mão, talentos são encorajados a mostrar ao mundo sua
              criatividade enquanto são apreciados por outros. Somos uma
              comunidade que conecta criadores, colecionadores e apreciadores de
              arte.
            </p>
            <p
              className="text-xl font-light"
              style={{
                color: "var(--color-muted-foreground)",
                lineHeight: "1.8",
              }}
            >
              Das cores vibrantes do sertão às texturas da caatinga, cada
              criação reflete a riqueza cultural de uma das regiões mais
              inspiradoras do Brasil.
            </p>
          </div>

          <div className="relative pb-6 pl-6">
            <Image
              src="https://i.pinimg.com/1200x/20/7d/6f/207d6facc76683fc427eacda60a17e02.jpg"
              alt="Arte Nordestina"
              width={600}
              height={700}
              className="w-full rounded-2xl object-cover"
              style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
            />
            <div
              className="absolute -bottom-6 left-0 p-6 rounded-xl border"
              style={{
                background: "var(--color-background)",
                borderColor: "var(--color-border)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                Destaque
              </p>
              <p
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-foreground)",
                }}
              >
                Maria Silva
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                Xilogravura • Recife, PE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

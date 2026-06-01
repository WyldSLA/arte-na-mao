export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-fill"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/gallery.webm" type="video/webm" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
        }}
      />

      <div className="relative h-full flex items-center pl-24 pr-8">
        <div
          className="max-w-4xl"
          style={{ animation: "fadeInUp 0.8s ease-out" }}
        >
          <h1
            className="font-bold text-white mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "-0.02em",
              lineHeight: "0.95",
            }}
          >
            Crie.
            <br />
            Cresça.{" "}
            <span style={{ color: "var(--brand-primary)" }}>Destaque.</span>
            <br />
            Floresça.
          </h1>
          <p
            className="font-light text-white/90"
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
              maxWidth: "48rem",
            }}
          >
            Uma missão de dar luz aos talentos e maravilhas do Nordeste
            brasileiro
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div
            className="w-1.5 h-3 bg-white/50 rounded-full"
            style={{ animation: "bounceDot 2s infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

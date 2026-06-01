import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { eventsData } from "@/lib/mock-data";

export function EventsSection() {
  return (
    <section className="py-20" style={{ background: "var(--color-card)" }}>
      <div className="max-w-450 mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-foreground)",
            }}
          >
            Eventos de{" "}
            <span style={{ color: "var(--brand-primary)" }}>Arte</span> e{" "}
            <span style={{ color: "var(--brand-primary)" }}>Cultura</span>
          </h2>
          <p
            className="text-lg font-light max-w-2xl mx-auto"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            Participe de exposições, workshops e encontros com artistas
            nordestinos
          </p>
        </div>

        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {eventsData.map((event, index) => (
            <Link
              key={event.id}
              href={`/eventos/${event.id}`}
              className="group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 block"
              style={{
                background: "var(--color-background)",
                animationDelay: `${index * 150}ms`,
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "16/9",
                  background: "var(--color-muted)",
                }}
              >
                <Image
                  src={event.imagemUrl}
                  alt={event.titulo}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full text-white"
                  style={{ background: "var(--brand-primary)" }}
                >
                  {event.badge}
                </span>
              </div>

              <div className="p-6">
                <div
                  className="flex items-center gap-2 text-sm mb-4"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  <CalendarDays size={16} />
                  <span>{event.date}</span>
                </div>

                <h3
                  className="font-bold mb-3 leading-tight transition-colors duration-300 group-hover:text-(--brand-primary)"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "var(--color-foreground)",
                  }}
                >
                  {event.titulo}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {event.descricao}
                </p>

                <div
                  className="flex items-center justify-between pt-4 border-t text-sm"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-muted-foreground)",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{event.local}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} />
                    <span>{event.attendees}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

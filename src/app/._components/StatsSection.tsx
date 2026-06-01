import { Eye, Users, Calendar } from "lucide-react";
import { statsData } from "@/lib/mock-data";

const statIcons = {
  eye: (
    <Eye
      size={48}
      strokeWidth={1.5}
      style={{ color: "var(--color-muted-foreground)" }}
    />
  ),
  users: (
    <Users
      size={48}
      strokeWidth={1.5}
      style={{ color: "var(--color-muted-foreground)" }}
    />
  ),
  calendar: (
    <Calendar
      size={48}
      strokeWidth={1.5}
      style={{ color: "var(--color-muted-foreground)" }}
    />
  ),
} as const;

export function StatsSection() {
  return (
    <section
      className="py-20 border-y"
      style={{
        background: "var(--color-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <div
        className="grid gap-12 max-w-450 mx-auto px-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {statsData.map((stat) => (
          <div key={stat.id} className="text-center">
            <div className="flex justify-center mb-4">
              {statIcons[stat.icon]}
            </div>
            <p
              className="font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                color: "var(--color-foreground)",
              }}
            >
              {stat.value}
            </p>
            <p
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

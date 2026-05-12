"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextData {
  toast: (title: string, message?: string, type?: ToastType) => void;
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// ─── Ícones por tipo (mesmo mapeamento do main.js original) ──────────────────

const iconMap: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
};

const borderMap: Record<ToastType, string> = {
  success: "#c9481d", // var(--primary)
  error: "hsl(0, 75%, 55%)", // var(--destructive)
  warning: "#f59e0b",
  info: "hsl(200, 65%, 55%)", // var(--secondary)
};

// ─── Item de Toast ────────────────────────────────────────────────────────────

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const [leaving, setLeaving] = useState(false);

  // Auto-dismiss em 3s (igual ao original)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={cn(
        "flex items-start gap-4 px-4 py-3 rounded-lg shadow-md border",
        "max-w-sm w-full pointer-events-auto",
        leaving
          ? "animate-[slideOutRight_0.3s_ease-out_forwards]"
          : "animate-[slideInRight_0.3s_ease-out]",
      )}
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        borderLeft: `4px solid ${borderMap[toast.type]}`,
      }}
      role="alert"
    >
      {/* Ícone */}
      <span className="text-2xl leading-none mt-0.5" aria-hidden="true">
        {iconMap[toast.type]}
      </span>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-sm"
          style={{ color: "var(--foreground)" }}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            {toast.message}
          </p>
        )}
      </div>

      {/* Fechar manualmente */}
      <button
        onClick={() => {
          setLeaving(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Fechar notificação"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (title: string, message?: string, type: ToastType = "info") => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, title, message, type }]);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Container fixo no canto inferior direito — igual ao original */}
      <div
        className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
        aria-label="Notificações"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de ToastProvider");
  }
  return context.toast;
}

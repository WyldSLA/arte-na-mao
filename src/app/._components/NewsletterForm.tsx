"use client";

import { useState } from "react";

export function NewsLetterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrar com API
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 max-w-sm mx-auto flex-wrap"
    >
      <input
        type="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 min-w-0 px-4 py-3 rounded-lg text-base outline-none"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
        }}
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg font-medium text-sm text-white transition-all hover:-translate-y-0.5"
        style={{ background: "var(--brand-primary)" }}
      >
        Inscrever
      </button>
    </form>
  );
}

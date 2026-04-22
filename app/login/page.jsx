"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("demo@nexus.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const from = searchParams.get("from") || "/library";

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === "demo@nexus.com" && password === "123456") {
      login();
      router.push(from);
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <section className="container" style={{ padding: 24 }}>
      <h1>Login</h1>

      <p style={{ color: "#6b7280" }}>
        Debes iniciar sesión para acceder a Librería y Co-working.
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          maxWidth: 420,
          marginTop: 16,
          display: "grid",
          gap: 12,
        }}
      >
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
          />
        </label>

        {error && <p style={{ color: "#dc2626", margin: 0 }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>
    </section>
  );
}
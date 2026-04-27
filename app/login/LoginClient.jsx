"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";

export default function LoginClient() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <>
      <h2>Login</h2>

      <p className="muted">
        Debes iniciar sesión para acceder a Librería y Co-working.
      </p>

      <form onSubmit={onSubmit} className="form form--max">
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p style={{ color: "#dc2626", margin: 0 }}>{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
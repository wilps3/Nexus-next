"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginClient() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("demo@nexus.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const from = searchParams.get("from") || "/library";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      router.push(from);
    } catch (err) {
      setError("Error en login");
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
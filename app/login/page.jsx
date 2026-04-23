import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <main className="container">
      <Suspense fallback={<p>Cargando...</p>}>
        <LoginClient />
      </Suspense>
    </main>
  );
}
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { isAuthed, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !isAuthed) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [ready, isAuthed, router, pathname]);

  if (!ready) {
    return (
      <main className="container">
        <p>Cargando...</p>
      </main>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return children;
}
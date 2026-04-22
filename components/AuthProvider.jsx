"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexus-auth");
    setIsAuthed(saved === "true");
    setReady(true);
  }, []);

  const login = () => {
    localStorage.setItem("nexus-auth", "true");
    setIsAuthed(true);
  };

  const logout = () => {
    localStorage.removeItem("nexus-auth");
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
}
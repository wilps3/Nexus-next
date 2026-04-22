"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isAuthed, logout } = useAuth();

  const onLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link className="logo" href="/">
          Nexus
        </Link>

        <button
          className="nav__toggle"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <ul className={`menu ${open ? "menu--open" : ""}`} aria-label="Menú principal">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/catalog">Catálogo</Link>
          </li>
          <li>
            <Link href="/coworking">Co-working</Link>
          </li>
          <li>
            <Link href="/my-books">Mis libros</Link>
          </li>
          <li className="menu__cart">
            <Link href="/checkout" className="cart">
              <span className="cart__text">Carrito</span>
              <span className="badge">2</span>
            </Link>
          </li>
          <li className="menu__auth">
            {isAuthed ? (
              <button type="button" className="btn btn--small btn--ghost" onClick={onLogout}>
                Salir
              </button>
            ) : (
              <Link href="/login" className="btn btn--small btn--ghost">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function MyBooksPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("nexus-books");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  const clear = () => {
    localStorage.removeItem("nexus-books");
    setItems([]);
  };

  return (
    <ProtectedRoute>
      <main className="container">
        <h1>Mis libros</h1>

        {items.length === 0 ? (
          <>
            <p>Aún no has adquirido ningún libro.</p>
            <Link href="/catalog">← Ir al catálogo</Link>
          </>
        ) : (
          <>
            <p className="myBooksIntro">
              Estos son los libros que has añadido a tu biblioteca:
            </p>

            <div className="catalogGrid">
              {items.map((book, index) => (
                <div key={`${book.id}-${index}`} className="catalogCard">
                  <img
                    src={
                      book.coverImageUrl ||
                      "https://via.placeholder.com/400x600?text=Nexus"
                    }
                    alt={book.title}
                    className="catalogCardImg"
                  />

                  <h3 className="catalogCardTitle">{book.title}</h3>
                  <p className="catalogCardAuthor">{book.author}</p>

                  <p className="catalogCardMeta">
                    {book.currency} {book.price} · Cantidad: {book.qty || 1}
                  </p>

                  <Link href={`/item/${book.id}`} className="myBooksLink">
                    Ver detalle
                  </Link>
                </div>
              ))}
            </div>

            <button type="button" onClick={clear} className="myBooksClear">
              Vaciar biblioteca
            </button>
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import CategoriesSidebar from "./CategoriesSidebar";
import FiltersBar from "./FiltersBar";

export default function CatalogClient() {
  const [categoryId, setCategoryId] = useState("");
  const [year, setYear] = useState("");
  const [q, setQ] = useState("");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = useMemo(() => {
    return {
      categoryId: categoryId || undefined,
      publicationYear: year ? Number(year) : undefined,
      q: q || undefined,
      limit: 40,
    };
  }, [categoryId, year, q]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        const data = await api.searchBooks(filters);
        const list = Array.isArray(data) ? data : data?.items || [];
        if (alive) setBooks(list);
      } catch (e) {
        if (alive) setBooks([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [filters]);

  const onClear = () => {
    setCategoryId("");
    setYear("");
    setQ("");
  };

  return (
    <main className="container">
      <h1>Catálogo</h1>

      <div className="catalogLayout">
        <aside className="catalogSidebar">
          <CategoriesSidebar selected={categoryId} onSelect={setCategoryId} />
        </aside>

        <section className="catalogMain">
          <FiltersBar
            year={year}
            setYear={setYear}
            q={q}
            setQ={setQ}
            onClear={onClear}
          />

          {loading ? (
            <p>Cargando catálogo…</p>
          ) : books.length === 0 ? (
            <p>No hay resultados con esos filtros.</p>
          ) : (
            <div className="catalogGrid">
              {books.map((book, index) => (
                <Link
                  key={`${book.id}-${index}`}
                  href={`/item/${book.id}`}
                  className="catalogLink"
                >
                  <div
                    title={`${book.title} — ${book.author} (${book.publicationYear})`}
                    className="catalogCard"
                  >
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
                      {book.publicationYear} · {book.currency} {book.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
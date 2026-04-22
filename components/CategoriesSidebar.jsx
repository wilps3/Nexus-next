"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function CategoriesSidebar({ selected, onSelect }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        const data = await api.getCategories();
        const list = Array.isArray(data)
          ? data
          : data?.items || data?.categories || [];
        if (alive) setCats(list);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <aside className="catsBox">
      <h3 className="catsTitle">Categorías</h3>

      {loading ? (
        <p>Cargando…</p>
      ) : (
        <div className="catsList">
          <button
            type="button"
            onClick={() => onSelect("")}
            className={`catBtn ${selected === "" ? "catBtn--active" : ""}`}
          >
            Todas
          </button>

          {cats.map((c, index) => (
            <button
              type="button"
              key={`${c.id}-${index}`}
              onClick={() => onSelect(c.id)}
              className={`catBtn ${selected === c.id ? "catBtn--active" : ""}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
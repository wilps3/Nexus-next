import Link from "next/link";
import { api } from "../../lib/api";
import ProtectedRoute from "../../components/ProtectedRoute";

export default async function LibraryPage() {
  const data = await api.getTopBooks({ limit: 10, period: "last_weeks" });
  const items = data?.items || [];

  return (
    <ProtectedRoute>
      <main className="container">
        <section className="section">
          <div className="section__head">
            <h2>Destacados de la semana</h2>
            <p className="muted">Top ventas desde la API simulada.</p>
          </div>

          <div className="list">
            {items.map((b, index) => (
              <article key={`${b.id}-${index}`} className="card-libro">
                <div className="card-libro__img" aria-hidden="true">
                  <img
                    src={b.coverImageUrl || "https://via.placeholder.com/92x140?text=Nexus"}
                    alt={b.title}
                    className="coverFit"
                  />
                </div>

                <div className="card-libro__info">
                  <h3>{b.title}</h3>
                  <p className="autor">{b.author}</p>
                  <p className="precio">
                    {b.price} {b.currency}
                  </p>

                  <div className="card-libro__actions">
                    <Link className="btn btn--small" href={`/item/${b.id}`}>
                      Ver detalle
                    </Link>
                    <Link className="btn btn--small btn--ghost" href="/checkout">
                      Añadir
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
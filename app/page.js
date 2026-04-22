import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <div className="hero__content">
          <h1>Historias que conectan mentes</h1>
          <p>
            Nexus combina librería universitaria y co-working. Inicia sesión para
            acceder al catálogo y a reservas.
          </p>

          <div className="hero__actions">
            <Link className="btn" href="/login">
              Iniciar sesión
            </Link>
            <Link className="btn btn--ghost" href="/library">
              Ir a librería
            </Link>
          </div>

          <div className="stats" aria-label="Indicadores">
            <div className="stat">
              <b>+3.500</b>
              <span>Títulos</span>
            </div>
            <div className="stat">
              <b>PDF/EPUB</b>
              <span>Entrega digital</span>
            </div>
            <div className="stat">
              <b>4.8/5</b>
              <span>Reseñas</span>
            </div>
          </div>
        </div>

        <div className="hero__image">
          <img
            src="/img/ilustracion_biblioteca.webp"
            alt="Ilustración biblioteca Nexus"
          />
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>¿Qué incluye la app?</h2>
          <p className="muted">
            Librería universitaria, compras, mis libros, espacios de co-working
            y reservas.
          </p>
        </div>
      </section>
    </main>
  );
}
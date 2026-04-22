import Link from "next/link";
import { api } from "../../lib/api";
import ProtectedRoute from "../../components/ProtectedRoute";

function isValidTime(value) {
  return typeof value === "string" && /^\d{2}:\d{2}$/.test(value);
}

function sanitizeCapacity(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  if (num < 1 || num > 20) return "—";
  return num;
}

function sanitizeName(value, id) {
  if (typeof value !== "string" || value.trim() === "") {
    return `Espacio ${id}`;
  }

  const text = value.trim();
  const looksLikeSpace = /sala|espacio|coworking|puesto|zona/i.test(text);

  if (!looksLikeSpace) {
    return `Espacio ${id}`;
  }

  return text;
}

function sanitizeOccupiedBy(value, occupied) {
  if (!occupied) return "—";
  if (typeof value !== "string" || value.trim() === "") return "—";
  return value.trim();
}

export default async function CoworkingPage() {
  let data = null;

  try {
    data = await api.getCoworkingSpaces();
  } catch (e) {
    data = { items: [] };
  }

  const spaces = data?.items || [];

  return (
    <ProtectedRoute>
      <main className="container">
        <h1>Co-working</h1>
        <p className="muted">
          Planta única · selecciona un espacio para ver detalle y reservar.
        </p>

        <div className="floor">
          {spaces.map((space, index) => {
            const occupied =
              space?.isOccupied !== undefined ? !!space.isOccupied : !!space?.occupied;

            const occupiedFrom = isValidTime(space?.occupiedFrom)
              ? space.occupiedFrom
              : "—";

            const occupiedUntil = isValidTime(space?.occupiedUntil)
              ? space.occupiedUntil
              : isValidTime(space?.occupiedTo)
              ? space.occupiedTo
              : "—";

            const occupiedBy = sanitizeOccupiedBy(space?.occupiedBy, occupied);
            const name = sanitizeName(space?.name, space?.id || index + 1);
            const capacity = sanitizeCapacity(space?.capacity);

            const statusClass = occupied ? "busy" : "free";
            const dotClass = occupied ? "dot dot--busy" : "dot dot--free";

            const title = occupied
              ? `${name} — Ocupado por ${occupiedBy} (${occupiedFrom}–${occupiedUntil})`
              : `${name} — Libre ahora`;

            return (
              <Link
                key={`${space?.id || "space"}-${index}`}
                href={`/coworking/space/${space?.id}`}
                className={`space ${statusClass}`}
                title={title}
              >
                <div className="space__top">
                  <strong>{name}</strong>
                  <span className="space__status">
                    <i className={dotClass} />
                    <small>{occupied ? "Ocupado" : "Libre"}</small>
                  </span>
                </div>

                <small>Capacidad: {capacity} personas</small>

                {occupied ? (
                  <small>
                    {occupiedBy} · {occupiedFrom} – {occupiedUntil}
                  </small>
                ) : (
                  <small className="muted">Disponible ahora</small>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </ProtectedRoute>
  );
}
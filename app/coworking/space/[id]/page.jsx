import Link from "next/link";
import { api } from "../../../../lib/api";
import ProtectedRoute from "../../../../components/ProtectedRoute";

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

  const looksLikeSpace =
    /sala|espacio|coworking|puesto|zona/i.test(text);

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

export default async function CoworkingSpaceDetailPage({ params }) {
  const { id } = await params;

  let raw = null;

  try {
    const res = await api.getCoworkingSpaceDetail(id);
    raw = res?.item ?? res;
  } catch (e) {
    raw = null;
  }

  if (!raw) {
    return (
      <ProtectedRoute>
        <main className="container">
          <h1>Espacio</h1>
          <p>No hay datos.</p>
          <Link href="/coworking">← Volver</Link>
        </main>
      </ProtectedRoute>
    );
  }

  const occupied =
    raw?.isOccupied !== undefined ? !!raw.isOccupied : !!raw?.occupied;

  const occupiedFrom = isValidTime(raw?.occupiedFrom) ? raw.occupiedFrom : "—";
  const occupiedUntil = isValidTime(raw?.occupiedUntil)
    ? raw.occupiedUntil
    : isValidTime(raw?.occupiedTo)
    ? raw.occupiedTo
    : "—";

  const space = {
    id,
    name: sanitizeName(raw?.name, id),
    capacity: sanitizeCapacity(raw?.capacity),
    occupied,
    occupiedBy: sanitizeOccupiedBy(raw?.occupiedBy, occupied),
    occupiedFrom,
    occupiedUntil,
    description:
      typeof raw?.description === "string" && raw.description.trim() !== ""
        ? raw.description.trim()
        : "",
  };

  return (
    <ProtectedRoute>
      <main className="container">
        <Link href="/coworking">← Volver a co-working</Link>

        <section className="section section--mt">
          <div className="section__head">
            <h2>{space.name}</h2>
            <p className="muted">
              Capacidad: {space.capacity} · Estado:{" "}
              {space.occupied ? "Ocupado" : "Libre"}
            </p>
          </div>

          <div className="miniGrid">
            <div className="pill">
              <b>{space.capacity}</b>
              <div className="small muted">personas</div>
            </div>

            <div className="pill">
              <b>{space.occupied ? "Ocupado" : "Libre"}</b>
              <div className="small muted">estado</div>
            </div>

            <div className="pill">
              <b>{space.occupied ? space.occupiedBy : "—"}</b>
              <div className="small muted">usuario</div>
            </div>
          </div>

          {space.occupied && (
            <div className="panel panel--mt">
              <h3>Ocupación</h3>
              <p>
                <b>Ocupado por:</b> {space.occupiedBy}
              </p>
              <p>
                <b>Desde:</b> {space.occupiedFrom}
              </p>
              <p>
                <b>Hasta:</b> {space.occupiedUntil}
              </p>
            </div>
          )}

          {space.description && <p className="sectionText">{space.description}</p>}

          <hr />

          <h3>Reservar este espacio</h3>

          <form className="form form--max">
            <label>
              <span>Tu nombre</span>
              <input placeholder="Ej: Laura" />
            </label>

            <label>
              <span>Hora inicio</span>
              <input placeholder="Ej: 10:00" />
            </label>

            <label>
              <span>Hora fin</span>
              <input placeholder="Ej: 12:00" />
            </label>

            <button type="button">Confirmar reserva</button>
          </form>

          <p className="muted small">
            Reserva simulada sin pasarela de pago.
          </p>
        </section>
      </main>
    </ProtectedRoute>
  );
}
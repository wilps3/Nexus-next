import Link from "next/link";
import { api } from "../../../lib/api";
import ProtectedRoute from "../../../components/ProtectedRoute";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function BookDetailPage({ params }) {
  const { id } = await params;

  let rawData = null;

  try {
    const res = await api.getBookDetail(id);
    rawData = res?.item ?? res;
  } catch (e) {
    rawData = null;
  }

  if (!rawData) {
    return (
      <ProtectedRoute>
        <main className="container">
          <h1>Detalle</h1>
          <p>Este libro no está disponible.</p>
          <Link href="/catalog">← Volver al catálogo</Link>
        </main>
      </ProtectedRoute>
    );
  }

  const data = {
    id: rawData?.id,
    title: rawData?.title || "Título no disponible",
    author: rawData?.author || "Autor desconocido",
    coverImageUrl:
      rawData?.coverImageUrl ||
      "https://via.placeholder.com/400x600?text=Sin+imagen",
    type: rawData?.type || "—",
    categoryId: rawData?.categoryId || "—",
    publicationYear: rawData?.publicationYear || "—",
    price: typeof rawData?.price === "number" ? rawData.price : 0,
    currency: rawData?.currency || "",
  };

  return (
    <ProtectedRoute>
      <main className="container">
        <Link href="/catalog">← Volver al catálogo</Link>

        <div className="detail">
          <div className="detail__img">
            <img src={data.coverImageUrl} alt={data.title} />
          </div>

          <div className="detail__info">
            <h2>{data.title}</h2>

            <p className="detailAuthor">
              <b>{data.author}</b>
            </p>

            <div className="metaRow">
              <span className="tag">Tipo: {data.type}</span>
              <span className="tag">Categoría: {data.categoryId}</span>
              <span className="tag">Año: {data.publicationYear}</span>
            </div>

            <p className="precio precio--big">
              Precio: <b>{data.price}</b> {data.currency}
            </p>

            <div className="detail__actions">
              <AddToCartButton book={data} />
              <Link className="btn btn--ghost" href="/my-books">
                Ir a mis libros
              </Link>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
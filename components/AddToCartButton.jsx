"use client";

export default function AddToCartButton({ book }) {
  const handleAdd = () => {
    const saved = localStorage.getItem("nexus-books");
    let items = [];

    if (saved) {
      try {
        items = JSON.parse(saved);
      } catch {
        items = [];
      }
    }

    const existing = items.find((item) => item.id === book.id);

    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      items.push({ ...book, qty: 1 });
    }

    localStorage.setItem("nexus-books", JSON.stringify(items));
    alert("Añadido al carrito");
  };

  return (
    <button type="button" className="btn" onClick={handleAdd}>
      Añadir al carrito
    </button>
  );
}
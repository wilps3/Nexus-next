"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function CheckoutPage() {
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

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const qty = item.qty || 1;
      const price = Number(item.price) || 0;
      return acc + qty * price;
    }, 0);
  }, [items]);

  const handleConfirm = () => {
    alert("Compra simulada realizada correctamente");
  };

  return (
    <ProtectedRoute>
      <main className="container">
        <h1>Checkout</h1>

        {items.length === 0 ? (
          <>
            <p>No hay productos en el carrito.</p>
            <Link href="/catalog">← Ir al catálogo</Link>
          </>
        ) : (
          <>
            <p className="checkoutIntro">
              Este es un resumen de tu compra simulada.
            </p>

            <div className="checkoutBox">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="checkoutRow">
                  <div className="checkoutInfo">
                    <strong>{item.title}</strong>
                    <span className="muted">{item.author}</span>
                  </div>

                  <div className="checkoutMeta">
                    <span>Cantidad: {item.qty || 1}</span>
                    <span>
                      {item.currency} {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkoutSummary">
              <p className="checkoutTotal">
                Total: <b>EUR {total.toFixed(2)}</b>
              </p>

              <div className="checkoutActions">
                <button type="button" className="btn" onClick={handleConfirm}>
                  Confirmar compra
                </button>

                <Link href="/my-books" className="btn btn--ghost">
                  Ver mis libros
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
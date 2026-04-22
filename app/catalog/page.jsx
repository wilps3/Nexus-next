import CatalogClient from "../../components/CatalogClient";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function CatalogPage() {
  return (
    <ProtectedRoute>
      <CatalogClient />
    </ProtectedRoute>
  );
}
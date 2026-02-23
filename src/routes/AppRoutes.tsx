import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/components/templates/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import ProductListPage from "@/pages/ProductListPage";
import ProductDetailPage from "@/pages/ProductDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

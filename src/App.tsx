import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { GoeyToaster } from "goey-toast";
import AppRoutes from "@/routes/AppRoutes";
import { useAuthStore } from "@/stores/useAuthStore";

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUser();
    }
  }, [isAuthenticated, user, fetchUser]);

  return (
    <BrowserRouter>
      <GoeyToaster position="top-center" />
      <AppRoutes />
    </BrowserRouter>
  );
}

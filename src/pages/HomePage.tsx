import { useAuthStore } from "@/stores/useAuthStore";

export default function HomePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome, {user?.firstName} {user?.lastName} 👋
      </h2>
      <p className="text-gray-500">Selamat datang di NTT Tech Dashboard.</p>
    </div>
  );
}

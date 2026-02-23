import { useAuthStore } from "@/stores/useAuthStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      {user && (
        <div className="flex items-center gap-3">
          <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm text-gray-600">
            {user.firstName} {user.lastName}
          </span>
        </div>
      )}
    </header>
  );
}

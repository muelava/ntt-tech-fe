import { Menu } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="lg:hidden text-gray-600 hover:text-gray-800 cursor-pointer">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>
      {user && (
        <div className="flex items-center gap-3">
          <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm text-gray-600 hidden sm:inline">
            {user.firstName} {user.lastName}
          </span>
        </div>
      )}
    </header>
  );
}

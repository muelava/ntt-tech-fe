import { NavLink } from "react-router-dom";
import { Home, Package, X } from "lucide-react";
import { useSidebarStore } from "@/stores/useSidebarStore";

const menuItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/products", label: "Product", icon: Package },
];

export default function Sidebar() {
  const { isOpen, close } = useSidebarStore();

  const handleNavClick = () => {
    close();
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={close} />}

      <aside
        className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-64 h-screen shrink-0 bg-white border-r border-gray-200
        flex flex-col transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="px-6 py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600">NTT Tech</h2>
          <button onClick={close} className="lg:hidden text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"} onClick={handleNavClick} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}>
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

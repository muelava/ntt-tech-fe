import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import ConfirmDialog from "@/components/atoms/ConfirmDialog";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const toggle = useSidebarStore((s) => s.toggle);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    setConfirmOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="lg:hidden text-gray-600 hover:text-gray-800 cursor-pointer">
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors cursor-pointer">
              <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user.firstName} {user.lastName}
              </span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50" initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.15 }}>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                    <LogOut size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </header>

      <ConfirmDialog isOpen={confirmOpen} title="Logout" message="Apakah kamu yakin ingin keluar?" confirmLabel="Logout" cancelLabel="Batal" variant="danger" onConfirm={confirmLogout} onCancel={() => setConfirmOpen(false)} />
    </>
  );
}

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/atoms/Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ isOpen, title = "Konfirmasi", message, confirmLabel = "Ya", cancelLabel = "Batal", variant = "danger", onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <motion.div className="absolute inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onCancel} />
          <motion.div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}>
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${variant === "danger" ? "bg-red-100" : "bg-violet-100"}`}>
                <AlertTriangle className={`w-6 h-6 ${variant === "danger" ? "text-red-600" : "text-violet-600"}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-6">{message}</p>
              <div className="flex gap-3 w-full">
                <Button variant="secondary" className="flex-1" onClick={onCancel}>
                  {cancelLabel}
                </Button>
                <Button variant={variant} className="flex-1" onClick={onConfirm}>
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

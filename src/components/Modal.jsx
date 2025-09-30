import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

export default function Modal({ open, onClose, children, label = "Dialog" }) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    // lock scroll
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            aria-label="Close"
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-0 z-[99] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/90 text-zinc-100 shadow-2xl overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

import React from "react"
import { Sun, Moon, Menu } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [dark, setDark] = React.useState(() => {
    if (typeof window === "undefined") return false
    return (
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
  })

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  const nav = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-zinc-200/60 dark:border-zinc-800">
        <div className="container h-16 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-lg sm:text-xl">
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
              Teuku Danish Zahwan
            </span>
            <span className="text-zinc-400">.dev</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="relative px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {it.label}
                <span className="absolute inset-x-2 -bottom-0.5 h-0.5 scale-x-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full transition-transform group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-xl border border-zinc-200/70 dark:border-zinc-800"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 rounded-xl border border-zinc-200/70 dark:border-zinc-800"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-b border-zinc-200/60 dark:border-zinc-800">
          <div className="container py-3 flex flex-col gap-2">
            {nav.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="px-2 py-2 rounded-lg hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition"
              >
                {it.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

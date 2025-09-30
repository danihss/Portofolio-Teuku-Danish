import React from "react"
import { Github, Linkedin, ArrowUp, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-10 border-t border-zinc-200/60 dark:border-zinc-800">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Teuku Danish Zahwan. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/danihss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800
                       hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition"
          >
            <Github className="h-5 w-5" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/teuku-danish-zahwan-8b08b234a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800
                       hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          {/* instagram */}
          <a
            href="https://www.instagram.com/danihss_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800
                       hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition"
          >
            <Instagram className="h-5 w-5" />
          </a>

          {/* Back to top */}
          <a
            href="#home"
            aria-label="Back to top"
            className="p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800
                       hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition"
          >
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

import React from "react"
import { motion } from "framer-motion"

export default function Contact() {
  // ganti dengan nomor kamu (format internasional tanpa spasi/tanda)
  const phoneRaw = "+6281511555630" // contoh
  const phonePretty = "+62 815-1155-5630" // tampilan yang rapi

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="mb-6">
          <p className="section-eyebrow">Say Hello</p>
          <h2 className="section-title">Contact</h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="card p-6"
        >
          <p className="text-zinc-600 dark:text-zinc-400">
            Want to work together or have a question?
          </p>

          {/* Email */}
          <a
            href="mailto:danis4lol@gmail.com"
            className="mt-4 block font-semibold underline decoration-indigo-500/70 hover:decoration-fuchsia-500/70 underline-offset-4"
          >
            danis4lol@gmail.com
          </a>

          {/* Telepon */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`tel:${phoneRaw}`}
              className="btn-ghost px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800"
              aria-label="Call phone number"
            >
              Call {phonePretty}
            </a>

            {/* WhatsApp (opsional) */}
            <a
              href={`https://wa.me/${phoneRaw.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800"
              aria-label="Chat on WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

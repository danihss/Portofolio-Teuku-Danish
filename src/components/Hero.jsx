import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Download, Mail } from "lucide-react"

const roles = ["Frontend Developer", "React Enthusiast", "UI Engineer"]

export default function Hero() {
  const [idx, setIdx] = React.useState(0)

  // Rotasi subheadline sederhana
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="section">
      <div className="container grid md:grid-cols-2 items-center gap-10">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          {/* Eyebrow */}
          <p className="section-eyebrow mb-2">{
            roles[idx]
          }</p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Hi, Aku{" "}
            <span className="relative inline-block">
              {/* Nama ber-gradient */}
              <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
                Teuku Danish Zahwan
              </span>
              {/* underline dekoratif */}
              <span
                aria-hidden
                className="block h-[3px] w-full mt-1 rounded-full bg-gradient-to-r from-indigo-500/70 via-fuchsia-500/70 to-emerald-500/70"
              />
            </span>
          </h1>

          {/* Subcopy */}
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-prose">
           Aku doyan nyusun UI yang konsisten, mobile-friendly, dan gampang dipelihara.
           Kalau nggak lagi ngoding, biasanya aku rapihin design system atau 
           eksperimen micro-interaction biar produk lebih “hidup”.
          </p>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="badge">React</span>
            <span className="badge">Vite</span>
            <span className="badge">Tailwind</span>
            
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              Lihat Project <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-ghost">
              Contact <Mail size={18} />
            </a>
          </div>
        </motion.div>

{/* Right: avatar / visual */}
<motion.div
  initial={{ opacity: 0, scale: 0.96 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.05 }}
  viewport={{ once: true }}
  className="order-1 md:order-2"
>
  <div className="relative w-full max-w-sm mx-auto">
    <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-tr from-indigo-500/25 via-fuchsia-400/20 to-emerald-400/20 blur-2xl" />
    <div className="card p-6 relative rounded-[22px]">
      {/* KONTENER GAMBAR */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900/30">
        <img
          src="/avatar.jpeg"                // pastikan file ada di /public/avatar.jpg
          alt="Teuku Danish Zahwan"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <p className="mt-4 text-center text-sm text-zinc-500">
        Based in Indonesia · Open to work
      </p>
    </div>
  </div>
</motion.div>

      </div>
    </section>
  )
}

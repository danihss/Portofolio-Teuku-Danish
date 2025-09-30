import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import projects from "../data/projects.js"
import Modal from "./Modal.jsx"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

export default function Projects() {
  const [selected, setSelected] = React.useState(null)
  const [slide, setSlide] = React.useState(0)

  // reset slide tiap buka project
  React.useEffect(() => setSlide(0), [selected])

  // ambil cover (dukung image tunggal atau images[])
  const coverOf = (p) => {
    const src = Array.isArray(p?.images) && p.images.length ? p.images[0] : p?.image
    return src ? encodeURI(src) : null // handle nama file dengan spasi
  }

  const imagesOf = (p) =>
    Array.isArray(p?.images) && p.images.length
      ? p.images.map((s) => encodeURI(s))
      : p?.image
      ? [encodeURI(p.image)]
      : []

  const next = () => {
    const imgs = imagesOf(selected)
    if (!imgs.length) return
    setSlide((s) => (s + 1) % imgs.length)
  }
  const prev = () => {
    const imgs = imagesOf(selected)
    if (!imgs.length) return
    setSlide((s) => (s - 1 + imgs.length) % imgs.length)
  }

  // keyboard nav dalam modal
  React.useEffect(() => {
    const onKey = (e) => {
      if (!selected) return
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  const arrowsDisabled = selected ? imagesOf(selected).length < 2 : true

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="mb-8">
          <p className="section-eyebrow">Featured</p>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const id = `proj-${p.title}`
            const cover = coverOf(p)
            return (
              <motion.button
                key={p.title}
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="text-left group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur"
              >
                {/* Card image */}
                <motion.div layoutId={`${id}-image`} className="aspect-video bg-zinc-800">
                  {cover ? (
                    <img
                      src={cover}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-zinc-500">
                      No Image
                    </div>
                  )}
                </motion.div>

                <div className="p-5">
                  <motion.h3 layoutId={`${id}-title`} className="font-bold text-lg">
                    <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                      {p.title}
                    </span>
                  </motion.h3>
                  <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags?.map((t) => (
                      <span key={t} className="badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* MODAL DETAIL */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        label={selected ? selected.title : "Project detail"}
      >
        {selected && (
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image slider */}
            <motion.div layoutId={`proj-${selected.title}-image`} className="relative bg-black/20">
              <div className="relative aspect-video md:h-full md:aspect-auto overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={imagesOf(selected)[slide]}
                    src={imagesOf(selected)[slide]}
                    alt={`${selected.title} – ${slide + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  />
                </AnimatePresence>
              </div>

              {/* Panah selalu tampil; disable kalau cuma 1 gambar */}
              <button
                aria-label="Previous image"
                onClick={prev}
                disabled={arrowsDisabled}
                className={
                  "absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full " +
                  "bg-black/40 backdrop-blur border border-white/10 hover:bg-black/60 " +
                  (arrowsDisabled ? "opacity-40 cursor-not-allowed" : "")
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next image"
                onClick={next}
                disabled={arrowsDisabled}
                className={
                  "absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full " +
                  "bg-black/40 backdrop-blur border border-white/10 hover:bg-black/60 " +
                  (arrowsDisabled ? "opacity-40 cursor-not-allowed" : "")
                }
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots hanya jika > 1 gambar */}
              {imagesOf(selected).length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                  {imagesOf(selected).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlide(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                      className={`h-2.5 w-2.5 rounded-full border border-white/30 ${
                        idx === slide ? "bg-white/90" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Content */}
            <div className="p-6 md:p-7">
              <motion.h3 layoutId={`proj-${selected.title}-title`} className="text-xl font-bold">
                {selected.title}
              </motion.h3>
              <p className="mt-2 text-zinc-300">
                {selected.longDescription || selected.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tags?.map((t) => (
                  <span key={t} className="badge">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {selected.href && (
                  <a
                    href={selected.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost inline-flex items-center gap-2"
                  >
                    Open Project <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              {imagesOf(selected).length > 1 && (
                <p className="mt-6 text-xs text-zinc-500">
                  Tip: gunakan tombol panah kiri/kanan untuk ganti gambar.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

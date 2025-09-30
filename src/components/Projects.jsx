import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import projects from "../data/projects.js"
import Modal from "./Modal.jsx"
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"

export default function Projects() {
  const [selected, setSelected] = React.useState(null)
  const [slide, setSlide] = React.useState(0)

  // --- Zoom / Lightbox state ---
  const [zoomOpen, setZoomOpen] = React.useState(false)
  const [zoomScale, setZoomScale] = React.useState(1)
  const wrapperRef = React.useRef(null)
  const imgRef = React.useRef(null)
  const [dragConstraints, setDragConstraints] = React.useState({ left: 0, right: 0, top: 0, bottom: 0 })
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  // reset saat buka project lain
  React.useEffect(() => {
    setSlide(0)
    setZoomOpen(false)
    setZoomScale(1)
    setPosition({ x: 0, y: 0 })
  }, [selected])

  // helper path (dukung image tunggal / images[])
  const coverOf = (p) => {
    const src = Array.isArray(p?.images) && p.images.length ? p.images[0] : p?.image
    return src ? encodeURI(src) : null
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

  // keyboard nav + esc close
  React.useEffect(() => {
    const onKey = (e) => {
      if (!selected) return
      if (zoomOpen) {
        if (e.key === "Escape") setZoomOpen(false)
        if (e.key === "+") setZoomScale((s) => Math.min(4, s + 0.2))
        if (e.key === "-") setZoomScale((s) => Math.max(1, s - 0.2))
        return
      }
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected, zoomOpen])

  // Hitung batas drag supaya tetap proporsional & center
  const recomputeConstraints = React.useCallback(() => {
    if (!wrapperRef.current || !imgRef.current) return
    const wrap = wrapperRef.current.getBoundingClientRect()
    const img = imgRef.current.getBoundingClientRect()
    const extraX = Math.max(0, (img.width - wrap.width) / 2)
    const extraY = Math.max(0, (img.height - wrap.height) / 2)
    setDragConstraints({ left: -extraX, right: extraX, top: -extraY, bottom: extraY })
  }, [])
  React.useEffect(() => {
    if (!zoomOpen) return
    setPosition({ x: 0, y: 0 })
    const id = setTimeout(recomputeConstraints, 0)
    const onResize = () => recomputeConstraints()
    window.addEventListener("resize", onResize)
    return () => {
      clearTimeout(id)
      window.removeEventListener("resize", onResize)
    }
  }, [zoomOpen, zoomScale, recomputeConstraints])

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
                <motion.div layoutId={`${id}-image`} className="aspect-video bg-zinc-800">
                  {cover ? (
                    <img
                      src={cover}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-zinc-500">No Image</div>
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
                      <span key={t} className="badge">{t}</span>
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
            {/* Slider */}
            <motion.div layoutId={`proj-${selected.title}-image`} className="relative bg-black/20">
              <div className="relative aspect-video md:h-full md:aspect-auto overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={imagesOf(selected)[slide]}
                    src={imagesOf(selected)[slide]}
                    alt={`${selected.title} – ${slide + 1}`}
                    className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setZoomOpen(true)}
                  />
                </AnimatePresence>
              </div>

              {/* Panah (disable bila <2) */}
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

              {/* Dots */}
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

            {/* Konten */}
            <div className="p-6 md:p-7">
              <motion.h3 layoutId={`proj-${selected.title}-title`} className="text-xl font-bold">
                {selected.title}
              </motion.h3>
              <p className="mt-2 text-zinc-300">{selected.longDescription || selected.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tags?.map((t) => (
                  <span key={t} className="badge">{t}</span>
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
                <p className="mt-6 text-xs text-zinc-500">Tip: gunakan tombol panah kiri/kanan untuk ganti gambar.</p>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* LIGHTBOX / ZOOM (center & proporsional) */}
      <AnimatePresence>
        {zoomOpen && selected && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onWheel={(e) => {
              e.preventDefault()
              setZoomScale((s) => Math.max(1, Math.min(4, s + (e.deltaY < 0 ? 0.2 : -0.2))))
            }}
          >
            <button
              aria-label="Close zoom"
              onClick={() => { setZoomOpen(false); setZoomScale(1); setPosition({x:0,y:0}) }}
              className="absolute right-4 top-4 z-[110] grid place-items-center h-10 w-10 rounded-full bg-black/50 border border-white/10 hover:bg-black/70"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Wrapper: center selalu */}
            <div ref={wrapperRef} className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.img
                ref={imgRef}
                key={`zoom-${imagesOf(selected)[slide]}`}
                src={imagesOf(selected)[slide]}
                alt="Zoomed"
                style={{ maxWidth: "90vw", maxHeight: "90vh", width: "auto", height: "auto", cursor: "grab" }}
                className="select-none"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: zoomScale, opacity: 1, x: position.x, y: position.y }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                drag
                dragMomentum={false}
                dragConstraints={dragConstraints}
                onDragEnd={(_, info) => setPosition({ x: info.point.x, y: info.point.y })}
                onDoubleClick={() => setZoomScale((s) => (s > 1 ? 1 : 2))}
                whileTap={{ cursor: "grabbing" }}
                onLoad={() => setTimeout(() => recomputeConstraints(), 0)}
              />
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/70">
              Scroll untuk zoom (1x–4x), drag untuk geser, double-click untuk 2x/fit.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

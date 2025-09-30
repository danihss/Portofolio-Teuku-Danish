import React from "react"

export default function Particles({
  quantity = 80,          // jumlah partikel
  staticity = 50,         // seberapa kuat efek parallax (besar = lebih kuat)
  ease = 50,             // easing gerakan
  refresh = 1000,        // refresh ukuran canvas (ms)
}) {
  const canvasRef = React.useRef(null)
  const containerRef = React.useRef(null)
  const mouse = React.useRef({ x: 0, y: 0 })
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { alpha: true })
    let width, height, animationFrame, lastRaf = 0

    // buat partikel
    const particles = Array.from({ length: quantity }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.7 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
    }))

    function resize() {
      const rect = containerRef.current.getBoundingClientRect()
      width = Math.floor(rect.width * dpr)
      height = Math.floor(rect.height * dpr)
      canvas.width = width
      canvas.height = height
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }
    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(containerRef.current)
    const interval = setInterval(resize, refresh)

    // akses prefer reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // warna adaptif dark/light
    const getColor = () => {
      const dark = document.documentElement.classList.contains("dark")
      return dark ? "rgba(236,72,153,0.55)" : "rgba(67,56,202,0.55)" // fuchsia-500 / indigo-700
    }

    function draw(t) {
      if (prefersReduced) return

      // throttle ~60fps
      if (t - lastRaf < 16) {
        animationFrame = requestAnimationFrame(draw)
        return
      }
      lastRaf = t

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = "lighter"
      const color = getColor()

      for (const p of particles) {
        // gerak halus
        p.x += p.vx
        p.y += p.vy
        // bounce
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1

        // parallax ke arah kursor
        const mx = (mouse.current.x / (staticity * 100)) || 0
        const my = (mouse.current.y / (staticity * 100)) || 0

        const cx = (p.x + mx) * width
        const cy = (p.y + my) * height

        // glow
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, p.r * 10 * dpr)
        g.addColorStop(0, color)
        g.addColorStop(1, "transparent")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, p.r * 3 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      animationFrame = requestAnimationFrame(draw)
    }

    animationFrame = requestAnimationFrame(draw)

    // track mouse (sedikit di-ease)
    let tx = 0, ty = 0
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      tx += (x - tx) / ease
      ty += (y - ty) / ease
      mouse.current.x = tx
      mouse.current.y = ty
    }
    window.addEventListener("pointermove", onMove)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("pointermove", onMove)
      ro.disconnect()
      clearInterval(interval)
    }
  }, [quantity, staticity, ease, refresh])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} />
    </div>
  )
}

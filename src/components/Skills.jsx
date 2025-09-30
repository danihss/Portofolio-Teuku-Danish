import React from "react"
import { motion } from "framer-motion"

const skills = [
  { title: "Visual Studio Code", subtitle: "Code Editor", icon: "/icons/vscode.svg" },
  { title: "React JS",          subtitle: "Framework",   icon: "/icons/react.svg" },
  { title: "Tailwind CSS",      subtitle: "Framework",   icon: "/icons/tailwind.svg" },
  { title: "Javascript",        subtitle: "Language",    icon: "/icons/js.svg" },
  { title: "Lua",               subtitle: "Language",    icon: "/icons/lua.svg" },
  { title: "Python",            subtitle: "Language",    icon: "/icons/python.svg" },
  { title: "Github",            subtitle: "Repository",  icon: "/icons/github.svg" },
  { title: "Canva",             subtitle: "Design App",  icon: "/icons/canva.svg" },
  { title: "Figma",             subtitle: "Design App",  icon: "/icons/figma.svg" },
]

function SkillCard({ title, subtitle, icon, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: i * 0.03 }}
      whileHover={{ y: -2 }}
      className="group flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 md:p-5
                 hover:bg-zinc-900/80 transition-colors"
    >
      {/* Icon box */}
      <div className="shrink-0 grid place-items-center h-12 w-12 rounded-xl bg-zinc-800/80 ring-1 ring-white/5">
        <img
          src={icon}
          alt=""
          className="h-7 w-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          onError={(e) => { e.currentTarget.style.display = "none" }}
          loading="lazy"
        />
      </div>

      {/* Texts */}
      <div className="min-w-0">
        <h3 className="font-semibold text-zinc-100 leading-tight truncate">{title}</h3>
        <p className="text-sm text-zinc-400 leading-tight">{subtitle}</p>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="mb-8">
          <p className="section-eyebrow">Toolbox</p>
          <h2 className="section-title">Skills&Tools</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((s, i) => (
            <SkillCard key={s.title} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

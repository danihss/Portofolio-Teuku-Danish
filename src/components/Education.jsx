import React from "react"
import education from "../data/education.js"

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Education</p>
          <h2 className="section-title">My Academic Background</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((item) => (
            <article
              key={item.school}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur p-6 hover:border-fuchsia-500/40 transition-colors"
            >
              <div className="h-20 flex items-center justify-center">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.school} logo`}
                    className="max-h-16 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-zinc-500">No Logo</div>
                )}
              </div>

              <h3 className="mt-5 font-semibold text-xl text-zinc-100">{item.school}</h3>
              {item.degree && (
                <p className="mt-2 text-zinc-300">{item.degree}</p>
              )}
              <p className="mt-1 text-sm text-zinc-400">{item.period}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

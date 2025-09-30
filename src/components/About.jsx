import React from "react"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="mb-6">
          <p className="section-eyebrow">Intro</p>
          <h2 className="section-title">About Me</h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed"
        >
          Hai, aku Teuku Danish Zahwan. Menurutku, web yang oke itu sederhana, 
          ngebut, dan ramah buat siapa pun. Perjalananku dimulai dari rasa penasaran—“gimana 
          sih satu piksel bisa gerak pas kita klik?”—terus kebawa jadi kesenangan ngerapiin UI 
          biar konsisten dan nyaman dipakai. Kadang juga aku suka membuat game di platfrom bernama Roblox 
          menggunakan roblox studio.
        </motion.p>
      </div>
    </section>
  )
}

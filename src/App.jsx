import React from "react"
import Navbar from "./components/Navbar.jsx"
import Hero from "./components/Hero.jsx"
import About from "./components/About.jsx"
import Education from "./components/Education.jsx"
import Projects from "./components/Projects.jsx"
import Skills from "./components/Skills.jsx"
import Contact from "./components/Contact.jsx"
import Footer from "./components/Footer.jsx"
import Background from "./components/Background.jsx"
import Particles from "./components/Particles.jsx"

export default function App() {
  return (
    <> 
      <Particles quantity={90} staticity={40} ease={40} />
      {/* komponen lain */}
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education/>
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

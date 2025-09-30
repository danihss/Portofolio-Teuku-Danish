const projects = [
  {
    title: "B-Chat",
    description:
      "B-Chat adalah website chatting yang dirancang khusus untuk Binusian yang membutuhkan teman untuk berbagi cerita, berdiskusi, atau sekadar mencari dukungan sosial. B-Chat menawarkan platform yang aman dan nyaman, di mana pengguna dapat terhubung dengan sesama mahasiswa untuk membangun jaringan pertemanan yang bermanfaat, mengatasi tantangan kehidupan kampus, dan mendukung kesejahteraan mental mereka.",
    tags: ["React", "Tailwind", "Laravel"],
    href: "https://github.com/danihss/B-ChatFinal",
    images: [
      "/assets/B-chat.jpg",
      "/assets/B-Chat2.png",
      "/assets/B-Chat3.png",
    ],
  },
  {
    title: "Project AI – Object Detection",
    description: "Deteksi benda via webcam—cepat, ringan, dan akurat.",
    tags: ["Vite", "React"],
    href: "https://68dbb6a28ebcad124efa53f6--aiobjectdetec.netlify.app/",
    images: [
      // Tambahkan minimal 1 lagi agar slider muncul
      "/assets/Ai Project.jpg",
      "/assets/aiproject2.png",   // lebih baik rename ke Ai-Project.jpg
      // "/assets/Ai-Project-2.jpg",
    ],
  },
  {
    title: "Roblox Game Dev",
    description:
      "Sebuah game yang ku buat di platform bernama Roblox menggunakan Roblox Studio, dengan LuaScript.",
    tags: ["Roblox Studio", "LuaScript"],
    href: "https://www.roblox.com/games/133586743934581/UPDATE-Gunung-Bercakap",
    images: [
      "/assets/roblox1.png",
      "/assets/roblox2.png",   // ← gabungkan dalam SATU array
    ],
  },
]

export default projects

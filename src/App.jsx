import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ================= DATA ================= */
const SECTIONS = [
  { id: "main", title: "Main", color: "#ffffff", icon: "⬤", orbit: 0, size: 30 },
  { id: "about", title: "About", color: "#ff6f61", icon: "◔", orbit: 120, size: 25 },
  { id: "skills", title: "Skills", color: "#6fefff", icon: "◑", orbit: 180, size: 30 },
  { id: "projects", title: "Projects", color: "#ffdd6f", icon: "◕", orbit: 240, size: 35 },
  { id: "contact", title: "Contact", color: "#ff6fcf", icon: "⬢", orbit: 300, size: 40 },
];
const GlobalStyles = () => (
  <style>{`
    @keyframes marqueeMove {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    @keyframes glowPulse {
      0%, 100% { text-shadow: 0 0 10px #fff, 0 0 20px #ff0, 0 0 30px #0ff; }
      50% { text-shadow: 0 0 20px #ff0, 0 0 30px #0ff, 0 0 40px #f0f; }
    }
  `}</style>
);


const QUOTES = [
  "Great interfaces are crafted, not assembled.",
  "Performance is a feature, not an afterthought.",
  "Motion guides users before words do.",
  "Clean code reflects clear thinking.",
];

/* ================= STARS ================= */
function Stars({ count = 15 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        glow: Math.random() * 0.7 + 0.3,
      });
    }
    setStars(arr);
  }, [count]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          animate={{ x: [s.x, s.x + s.speed * 50], y: [s.y, s.y + s.speed * 50] }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: `rgba(255,255,255,${s.glow})`,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,${s.glow})`,
          }}
        />
      ))}
    </div>
  );
}

/* ================= METEOR ================= */
function Meteors() {
  const meteors = [
    { x: 0, y: 0, size: 6, delay: 0 },
    { x: window.innerWidth, y: 0, size: 4, delay: 2 },
    { x: 0, y: window.innerHeight / 2, size: 5, delay: 4 },
  ];

  return (
    <div>
      {meteors.map((m, i) => (
        <motion.div
          key={i}
          initial={{ x: m.x, y: m.y, opacity: 1 }}
          animate={{ x: m.x > 0 ? -window.innerWidth : window.innerWidth, y: m.y > 0 ? window.innerHeight : -window.innerHeight, opacity: 0 }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, repeatType: "loop", delay: m.delay, ease: "linear" }}
          style={{
            position: "fixed",
            width: m.size,
            height: m.size,
            borderRadius: "50%",
            background: "rgba(255,50,50,0.8)",
            boxShadow: `0 0 ${m.size * 3}px rgba(255,50,50,0.8)`,
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
}

/* ================= SUN & PLANETS ================= */
function SolarSystem({ active }) {
  return (
    <div style={styles.solarSystem}>
      <div style={styles.sun} />
      {SECTIONS.filter((s) => s.orbit).map((s) => (
        <motion.div
          key={s.id}
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          style={{
            ...styles.orbit,
            width: s.orbit * 2,
            height: s.orbit * 2,
          }}
        >
          <div
            style={{
              ...styles.planet,
              width: s.size * (active === s.id ? 1.6 : 1),
              height: s.size * (active === s.id ? 1.6 : 1),
              background: `radial-gradient(circle, #fff, ${s.color})`,
              boxShadow: active === s.id ? `0 0 35px ${s.color}` : `0 0 10px rgba(255,255,255,0.3)`,
              transition: "all .4s ease",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ================= MENU ================= */
function Menu({ active, setActive }) {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={styles.menu}>
      {SECTIONS.map((s) => (
        <motion.div
          key={s.id}
          whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${s.color}` }}
          whileTap={{ scale: 0.95 }}
          onClick={() => go(s.id)}
          onMouseEnter={() => setActive(s.id)}
          onMouseLeave={() => setActive("")}
          style={{
            ...styles.menuItem,
            borderColor: active === s.id ? s.color : "rgba(255,255,255,0.25)",
            boxShadow: active === s.id ? `0 0 25px ${s.color}` : "0 0 10px rgba(120,180,255,0.3)",
          }}
        >
          <span style={styles.menuIcon}>{s.icon}</span>
          {s.title}
        </motion.div>
      ))}
    </nav>
  );
}

/* ================= WELCOME ALIEN ================= */
function AlienGreeter() {
  return (
    <div style={styles.alienWrap}>
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={styles.alien}
      >
        <div style={styles.eyeWrap}>
          <div style={styles.eye} />
          <div style={styles.eye} />
        </div>
        <div style={styles.mouth} />
      </motion.div>

      <div style={{ overflow: "hidden", width: "100%", marginTop: 10 }}>
        <div style={styles.marqueeText}>
          Hello, welcome to my Galaxy! 🚀✨🌌
        </div>
      </div>
    </div>

  );
}

/* ================= CAROUSEL ================= */
function ProjectCarousel() {
  const items = [
    { title: "Dashboard UI", desc: "High-performance analytics dashboard." },
    { title: "Space Game UI", desc: "Creative web-based game interface." },
    { title: "Portfolio Website", desc: "Interactive, animated personal portfolio." },
  ];

  return (
    <div style={styles.carouselWrap}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={styles.carousel}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} style={styles.carouselItem}>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ================= QUOTE ================= */
function Quote() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setI((v) => (v + 1) % QUOTES.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.quote}>
      {QUOTES[i].split("").map((char, idx) => (
        <motion.span
          key={idx}
          style={{ ...styles.retroText, display: "inline-block" }}
          animate={{
            y: [0, -6, 0],                 // اهتزاز للأعلى
            textShadow: [
              "0 0 6px rgba(255,255,255,.4)",
              "0 0 16px rgba(255,255,255,.9)",
              "0 0 6px rgba(255,255,255,.4)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.05,             // تدريجي بين الأحرف
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}


/* ================= APP ================= */
export default function App() {
  const [active, setActive] = useState("");
  return (
    <div style={styles.page}>
      <GlobalStyles />
      <Stars />
      <Meteors />
      <AlienGreeter />
      <Menu active={active} setActive={setActive} />
      <SolarSystem active={active} />
      <Quote />
      <ProjectCarousel />
      <section id="about" style={styles.section}>
        <h2>About Me</h2>
        <p>Front-End Developer creating immersive, performant, and visually rich user interfaces.</p>
      </section>
      <section id="skills" style={styles.section}>
        <h2>Skills</h2>
        <p>React, Framer Motion, 3D Illusions, CSS Animations, UI/UX Design</p>
      </section>
      <section id="projects" style={styles.section}>
        <h2>Projects</h2>
        <p>Portfolio websites, dashboards, interactive web games, and more.</p>
      </section>
      <section id="contact" style={styles.section}>
        <h2>Contact</h2>
        <p>Email: example@domain.com</p>
      </section>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  marqueeText: {
    fontFamily: "'Bungee', cursive",        // خط Retro ممتع
    fontSize: "2rem",                        // أكبر قليلاً
    fontWeight: "bold",
    whiteSpace: "nowrap",
    display: "inline-block",
    animation: "marqueeMove 15s linear infinite, glowPulse 3s ease-in-out infinite",
    background: "linear-gradient(90deg, #ff004c, #ff9f00, #ffee00, #00ff9d, #00c3ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  retroText: {
    fontFamily: "'Bungee', cursive",
    fontSize: "1.6rem",
    background: "linear-gradient(90deg, #ff004c, #ff9f00, #ffee00, #00ff9d, #00c3ff, #ff004c)",
    backgroundSize: "400% 400%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "retroGradient 6s ease infinite",
    textShadow: `
      3px 3px 0 #000,
      6px 6px 0 rgba(0,0,0,0.3)
    `,
  },
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 50% 50%, #ffb30020, #00002f 80%)",
    color: "#fff",
    overflowX: "hidden",
    overflowY: "auto",
    fontFamily: "'Bungee', cursive",
  },
  solarSystem: {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: 600,
    height: 600,
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    pointerEvents: "none",
  },
  sun: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 120,
    height: 120,
    borderRadius: "50%",
    transform: "translate(-50%,-50%)",
    background: "radial-gradient(circle,#fff3a0,#ffb300)",
    boxShadow: "0 0 150px rgba(255,200,0,.9)",
  },
  orbit: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "50%",
  },
  planet: {
    position: "absolute",
    top: -10,
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "50%",
  },
  menu: {
    position: "fixed",
    right: 30,
    top: "20%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    zIndex: 10,
  },
  menuItem: {
    padding: "14px 22px",
    borderRadius: 16,
    background: "rgba(20,20,35,.75)",
    border: "1px solid",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  menuIcon: {
    fontSize: "1.2rem",
  },
  alienWrap: {
    position: "fixed",
    top: 40,
    left: 40,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  alien: {
    width: 100,
    height: 120,
    borderRadius: "50%",
    background: "radial-gradient(circle at 30% 30%, #a0f7ff, #00cfff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 40px rgba(0,255,255,.7)",
  },
  eyeWrap: { display: "flex", gap: 15, marginBottom: 10 },
  eye: { width: 14, height: 14, borderRadius: "50%", background: "#000" },
  mouth: { width: 30, height: 8, borderBottom: "3px solid #000", borderRadius: "0 0 30px 30px" },
  alienText: { marginTop: 8, fontSize: "1rem", textShadow: "0 0 15px rgba(0,255,255,.9)" },
  carouselWrap: {
    position: "fixed",
    bottom: 20,
    width: "100%",
    overflow: "hidden",
    zIndex: 5,
  },
  carousel: { display: "flex", width: "200%" },
  carouselItem: {
    minWidth: 300,
    margin: "0 20px",
    padding: "20px",
    borderRadius: 20,
    background: "radial-gradient(circle at top, rgba(255,255,255,.15), rgba(255,255,255,.05))",
    boxShadow: "0 0 30px rgba(120,180,255,.6)",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1.2rem",
    backdropFilter: "blur(6px)",
  },
  quote: {
    position: "fixed",
    top: 40,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "1.2rem",
    fontStyle: "italic",
    textShadow: "0 0 25px rgba(255,255,150,.8)",
    zIndex: 5,
  },
  section: {
    minHeight: "100vh",
    padding: "30vh 15%",
    zIndex: 3,
  },
};

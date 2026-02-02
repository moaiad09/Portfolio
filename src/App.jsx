import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= DATA ================= */
const SECTIONS = [
  { id: "main", title: "Main", color: "#ffffff", icon: "⬤", orbit: 0, size: 40, initialAngle: 0 },
  { id: "about", title: "About", color: "#ff6f61", icon: "◔", orbit: 100, size: 34, speed: 60, initialAngle: 45 },
  { id: "skills", title: "Services", color: "#6fefff", icon: "◑", orbit: 150, size: 38, speed: 90, initialAngle: 120 },
  { id: "projects", title: "Projects", color: "#ffdd6f", icon: "◕", orbit: 200, size: 44, speed: 130, initialAngle: 200 },
  { id: "contact", title: "Contact", color: "#ff6fcf", icon: "⬢", orbit: 250, size: 48, speed: 180, initialAngle: 280 },
  { id: "testimonials", title: "Reviews", color: "#b666d2", icon: "❝", orbit: 300, size: 36, speed: 220, initialAngle: 330 },
  { id: "cv", title: "CV", color: "#50c878", icon: "📄", orbit: 350, size: 40, speed: 260, initialAngle: 20 },
];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #000; overflow-x: hidden; }

    @keyframes borderRotate {
      0% { --angle: 0deg; }
      100% { --angle: 360deg; }
    }
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    .neon-border-box {
      position: relative;
      background: rgba(20, 20, 35, 0.6);
      border-radius: 20px;
      z-index: 1;
    }
    .neon-border-box::before {
      content: "";
      position: absolute;
      inset: -3px; 
      z-index: -1;
      background: conic-gradient(from var(--angle), #ff0055, #00ddff, #ffdd00, #ff0055);
      border-radius: 22px;
      animation: borderRotate 4s linear infinite;
    }
    .neon-border-box::after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.95); 
      border-radius: 18px;
      z-index: -1;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .floating-card { animation: float 6s ease-in-out infinite; }

    .glitch-text:hover {
      animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
      color: #ff0055;
    }
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0b0b15; }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #ff0055, #00ddff);
      border-radius: 4px;
    }

    .neon-input {
      padding: 12px;
      border-radius: 6px;
      border: 2px solid rgba(255,255,255,0.2); 
      background: rgba(0,0,0,0.5);
      color: #fff;
      font-family: 'Bungee', cursive, sans-serif;
      outline: none;
      flex: 1;
      min-width: 200px;
      transition: 0.3s;
    }
    .neon-input:focus {
      border-color: #00ddff !important;
      box-shadow: 0 0 15px rgba(0, 221, 255, 0.4) !important;
      background: rgba(0, 221, 255, 0.05);
    }
  `}</style>
);

const WelcomeLoopStyles = () => (
  <style>{`
    @keyframes alienGlow {
      0%, 100% { box-shadow: 0 0 25px rgba(0,255,255,0.6), 0 0 50px rgba(0,255,255,0.3); }
      50% { box-shadow: 0 0 40px rgba(255,0,255,0.8), 0 0 70px rgba(0,255,255,0.6); }
    }
  `}</style>
);

const QUOTES = [
  "Great interfaces are crafted, not assembled.",
  "Performance is a feature, not an afterthought.",
  "Motion guides users before words do.",
  "Clean code reflects clear thinking.",
];

function Stars({ count = 15 }) {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
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
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
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

function Meteors() {
  const [dimensions, setDimensions] = useState({ w: 1000, h: 1000 });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  const meteors = [
    { x: 0, y: 0, size: 10, delay: 0 },
    { x: dimensions.w, y: 0, size: 8, delay: 2 },
    { x: 0, y: dimensions.h / 2, size: 9, delay: 4 },
  ];

  return (
    <div>
      {meteors.map((m, i) => (
        <motion.div
          key={i}
          initial={{ x: m.x, y: m.y, opacity: 1 }}
          animate={{ x: m.x > 0 ? -dimensions.w : dimensions.w, y: m.y > 0 ? dimensions.h : -dimensions.h, opacity: 0 }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, repeatType: "loop", delay: m.delay, ease: "linear" }}
          style={{
            position: "fixed",
            width: m.size,
            height: m.size,
            borderRadius: "50%",
            background: "rgba(255,50,50,0.8)",
            boxShadow: `0 0 ${m.size * 3}px rgba(255,50,50,0.8)`,
            zIndex: 1,
            pointerEvents: "none"
          }}
        />
      ))}
    </div>
  );
}

function SolarSystem() {
  return (
    <div style={styles.solarSystem}>
      <div style={styles.sun} />
      {SECTIONS.filter(s => s.orbit).map((s) => (
        <motion.div
          key={s.id}
          animate={{ rotate: 360 }}
          initial={{ rotate: s.initialAngle }}
          transition={{ duration: s.speed, repeat: Infinity, ease: "linear" }}
          style={{ ...styles.orbit, width: s.orbit * 2, height: s.orbit * 2 }}
        >
          <div
            style={{
              ...styles.planet,
              width: s.size,
              height: s.size,
              background: `radial-gradient(circle, #fff, ${s.color})`,
              boxShadow: `0 0 25px ${s.color}`,
              top: -s.size / 2,
              left: "50%",
              transform: "translateX(-50%)",
              position: "absolute",
              borderRadius: "50%",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function StarMascot({ visible, color }) {
  return (
    <motion.div
      initial={{ y: -150, scale: 0.2, opacity: 0 }}
      animate={{
        y: visible ? 20 : -150,
        scale: visible ? 1 : 0.2,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 10,
        right: 120,
        width: 60,
        height: 60,
        zIndex: 9999,
        pointerEvents: "none",
        filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 25px ${color})`
      }}
    >
      <svg viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l2.9 6.6L22 9.3l-5 4.9L18.2 22 12 18.4 5.8 22 7 14.2 2 9.3l7.1-0.7L12 2z" />
      </svg>
    </motion.div>
  );
}

function Menu({ active, setActive, setStarColor, setShowStar }) {
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={styles.menu}>
      {SECTIONS.map((s) => {
        const isActive = active === s.id;

        return (
          <motion.div
            key={s.id}
            onClick={() => go(s.id)}
            onMouseEnter={() => {
              setStarColor(s.color);
              setShowStar(true);
            }}
            onMouseLeave={() => setShowStar(false)}
            whileHover={{ scale: 1.08 }}
            style={{
              ...styles.menuItem,
              color: isActive ? s.color : "#fff",
              border: `2px solid ${isActive ? s.color : "transparent"}`,
              background: isActive
                ? `${s.color}33`
                : "rgba(20,20,35,.85)",
              boxShadow: isActive
                ? `0 0 25px ${s.color}`
                : "0 4px 15px rgba(0,0,0,0.5)",
              transition: "all 0.25s ease"
            }}
          >
            {s.icon} {s.title}
          </motion.div>
        );
      })}
    </nav>
  );
}

function BackToTopRocket({ activeColor }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -6, scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        width: 68,
        height: 68,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${activeColor}, #ff0044)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        cursor: "pointer",
        zIndex: 99999, // أعلى من أي شيء
        boxShadow: `0 0 35px ${activeColor}`,
        userSelect: "none"
      }}
    >
      🚀
    </motion.div>
  );
}


function AlienGreeter() {
  const messages = ["Hello, welcome to my universe!", "I am E.Moaiad Alimam"];
  const [msgIndex, setMsgIndex] = useState(0);
  const [show, setShow] = useState(true);
  const fadeDuration = 1000;
  const displayDuration = 4000;

  useEffect(() => {
    let timeout;
    const cycleMessages = () => {
      timeout = setTimeout(() => {
        setShow(false);
        timeout = setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % messages.length);
          setShow(true);
          cycleMessages();
        }, fadeDuration);
      }, displayDuration);
    };
    cycleMessages();
    return () => clearTimeout(timeout);
  }, []);

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
      <div style={{ width: 250, textAlign: "center", position: "relative", height: 30 }}>
        <AnimatePresence mode="wait">
          {show && (
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: fadeDuration / 1000 }}
              style={styles.alienText}
            >
              {messages[msgIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectCarousel() {
  const items = [
    { title: "Dashboard UI", desc: "High-performance analytics dashboard." },
    { title: "Space Game UI", desc: "Creative web-based game interface." },
    { title: "Portfolio Website", desc: "Interactive, animated personal portfolio." },
  ];

  return (
    <div style={styles.carouselWrapInsideMain}>
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

function Quote() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.quote}>
      {QUOTES[i].split("").map((char, idx) => (
        <motion.span
          key={idx}
          style={{ ...styles.retroText, display: "inline-block" }}
          animate={{
            y: [0, -6, 0],
            textShadow: ["0 0 6px rgba(255,255,255,.4)", "0 0 16px rgba(255,255,255,.9)", "0 0 6px rgba(255,255,255,.4)"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.05 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

/* ================= SECTIONS COMPONENTS ================= */

function FooterAndDate() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={styles.dateContainer}>
        <div style={styles.dateText}>
          {date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
        <div style={styles.timeText}>
          {date.toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>
      <div style={styles.footer}>
        <p style={{ margin: 0 }}>© {date.getFullYear()} E.Moaiad Alimam. All Rights Reserved.</p>
      </div>
    </>
  );
}

function NeonCard({ children, delay = 0, isFloat = false }) {
  return (
    <motion.div
      className={`neon-border-box ${isFloat ? 'floating-card' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2, boxShadow: "0 0 30px rgba(0, 221, 255, 0.4)" }}
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transformStyle: "preserve-3d",
        perspective: 1000,
        cursor: "pointer",
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </motion.div>
  );
}

function ServicesSection({ color }) {
  const services = [
    { title: "Web Development", icon: "💻", desc: "Building responsive websites." },
    { title: "UI/UX Design", icon: "🎨", desc: "Crafting intuitive experiences." },
    { title: "App Development", icon: "📱", desc: "Smooth mobile applications." },
    { title: "Animation", icon: "✨", desc: "Motion graphics for web." },
    { title: "SEO Optimization", icon: "🚀", desc: "Boosting search ranking." },
    { title: "Backend APIs", icon: "⚙️", desc: "Server-side integration." },
  ];

  return (
    <div style={styles.contentContainer}>
      <div style={styles.headerSection}>
        <h2 className="glitch-text" style={{ color: color, cursor: "default" }}>Services</h2>
        <p style={{ color: "#ccc" }}>Explore technological solutions I offer.</p>
      </div>
      <div style={styles.grid6}>
        {services.map((svc, idx) => (
          <NeonCard key={idx} delay={idx * 0.1} isFloat={true}>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              style={{
                width: 60, height: 60, borderRadius: "50%",
                background: `radial-gradient(circle, ${color}44, transparent)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", marginBottom: "15px",
                boxShadow: `0 0 20px ${color}66`
              }}
            >
              {svc.icon}
            </motion.div>
            <h3 style={{ color: "#fff", marginBottom: "8px", fontSize: "1.1rem" }}>{svc.title}</h3>
            <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.4 }}>{svc.desc}</p>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection({ color }) {
  const testimonials = [
    { name: "Alex Morgan", role: "Product Manager", text: "An outstanding developer who brings ideas to life." },
    { name: "Sophia Lee", role: "UI/UX Designer", text: "Next level interaction and animation quality." },
    { name: "Daniel Carter", role: "Tech Founder", text: "Rare combination of performance and design." },
  ];

  return (
    <div style={styles.contentContainer}>
      <div style={styles.headerSection}>
        <h2 className="glitch-text" style={{ color: color, cursor: "default" }}>Testimonials</h2>
        <p style={{ color: "#ccc" }}>Voices from across the digital universe.</p>
      </div>
      <div style={styles.grid3}>
        {testimonials.map((t, i) => (
          <NeonCard key={i} delay={i * 0.2} isFloat={true}>
            <div style={{
              width: 70, height: 70, borderRadius: "50%",
              margin: "0 auto 20px",
              background: "radial-gradient(circle, #fff, #555)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem", fontWeight: "bold",
              boxShadow: `0 0 30px ${color}`
            }}>
              {t.name.charAt(0)}
            </div>
            <h3 style={{ color: color }}>{t.name}</h3>
            <span style={{ fontSize: "0.9rem", color: "#bbb", marginBottom: "15px" }}>{t.role}</span>
            <p style={{ marginTop: "10px", lineHeight: 1.6, color: "#ddd" }}>{t.text}</p>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}

function CVSection({ color }) {
  const timelineData = [
    { year: "2018", title: "B.Sc. Computer Science", place: "University XYZ" },
    { year: "2020", title: "Frontend Developer", place: "ABC Company" },
    { year: "2022", title: "Senior UI Engineer", place: "Tech Solutions" },
    { year: "Present", title: "Freelance Web Designer", place: "Self-employed" },
  ];

  return (
    <div style={styles.contentContainer}>
      <div style={styles.headerSection}>
        <h2 className="glitch-text" style={{ color: color, cursor: "default" }}>Curriculum Vitae</h2>
        <p style={{ color: "#ccc" }}>An overview of my education and professional experience.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {timelineData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: "rgba(20, 20, 35, 0.8)",
              padding: "20px 30px",
              borderRadius: "15px",
              borderLeft: `6px solid ${color}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <div>
              <h3 style={{ margin: 0, color: "#fff", fontSize: "1.1rem" }}>{item.title}</h3>
              <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{item.place}</span>
            </div>
            <div style={{
              background: `${color}33`, color: color, padding: "5px 12px",
              borderRadius: "8px", fontWeight: "bold", fontSize: "0.9rem"
            }}>
              {item.year}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ContactSection({ color }) {
  return (
    <div style={styles.contentContainer}>
      <div style={styles.headerSection}>
        <h2 className="glitch-text" style={{ color: color, cursor: "default" }}>Contact</h2>
        <p style={{ color: "#ccc" }}>Get in touch for collaboration.</p>
      </div>
      <div className="neon-border-box" style={{ padding: 0, display: "flex", flexWrap: "wrap", overflow: "hidden", position: "relative", marginBottom: "80px" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: `radial-gradient(circle at 50% 50%, ${color}11, transparent 70%)`,
          zIndex: 0, pointerEvents: "none"
        }}></div>
        <div style={{ flex: 1, minWidth: "280px", padding: "30px", background: "rgba(0,0,0,0.3)", zIndex: 1 }}>
          <h3 style={{ color: "#fff", marginBottom: "25px" }}>Contact Info</h3>
          {[
            { icon: "📍", title: "Location", text: "A108 Adam Street, New York, NY 535022" },
            { icon: "📧", title: "Email", text: "moaiadwork09@gmail.com" },
            { icon: "📞", title: "Call", text: "+1 5589 55488 55" }
          ].map((item, idx) => (
            <motion.div
              key={idx} whileHover={{ x: 10 }}
              style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div style={{ width: 35, height: 35, borderRadius: "50%", background: `${color}33`, display: "flex", alignItems: "center", justifyContent: "center", color: color }}>{item.icon}</div>
              <div>
                <h4 style={{ margin: 0, color: "#fff", fontSize: "0.9rem" }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#aaa", fontSize: "0.85rem" }}>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ flex: 1.5, minWidth: "300px", padding: "30px", background: "rgba(255,255,255,0.02)", zIndex: 1 }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <input type="text" placeholder="Your Name" className="neon-input" />
              <input type="email" placeholder="Your Email" className="neon-input" />
            </div>
            <input type="text" placeholder="Subject" className="neon-input" />
            <textarea rows="4" placeholder="Message" className="neon-input" style={{ resize: "none" }}></textarea>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${color}` }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "12px",
                background: `linear-gradient(45deg, ${color}, #ff0055)`,
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.95rem",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  const [active, setActive] = useState("main");
  const [showStar, setShowStar] = useState(false);
  const [starColor, setStarColor] = useState(SECTIONS[0].color);

  // Scroll Spy Logic
  useEffect(() => {
    const onScroll = () => {
      const middle = window.innerHeight / 2;
      let currentSection = "main";

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= middle && rect.bottom >= middle) {
          currentSection = s.id;
          break;
        }
      }

      if (currentSection !== active) {
        setActive(currentSection);
        const sec = SECTIONS.find(s => s.id === currentSection);
        if (sec) setStarColor(sec.color);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return (
    <div style={styles.page}>
      <WelcomeLoopStyles />
      <GlobalStyles />
      <Stars />
      <Meteors />
      <AlienGreeter />
      <Menu active={active} setActive={setActive} setShowStar={setShowStar} setStarColor={setStarColor} />
      <StarMascot visible={showStar} color={starColor} />
      <SolarSystem />
      <Quote />

      {SECTIONS.map((s) => (
        <section
          id={s.id}
          key={s.id}
          style={{
            ...styles.section,
            ...(s.id === 'main' ? { height: '100vh', position: 'relative', overflow: 'hidden' } : {})
          }}
        >
          {s.id === 'main' && <ProjectCarousel />}

          {s.id !== "main" && (
            <div style={styles.contentContainer}>
              <h2 className="glitch-text" style={{
                color: s.color,
                marginTop: "280px",
                fontSize: "2.5rem",
                textShadow: `0 0 20px ${s.color}44`,
                marginBottom: "40px",
                textAlign: "center",
                width: "100%"
              }}>
                {s.title}
              </h2>

              {s.id === "about" && (
                <NeonCard>
                  <h3 style={{ color: "#fff", marginBottom: "15px" }}>About Me</h3>
                  <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "1rem", textAlign: "center" }}>
                    Front-End Developer creating immersive, performant, and visually rich user interfaces.
                    I specialize in React, Framer Motion, and creative coding to bring static designs to life.
                  </p>
                </NeonCard>
              )}

              {s.id === "skills" && <ServicesSection color={s.color} />}

              {s.id === "projects" && (
                <div style={styles.grid3}>
                  {[1, 2, 3].map((i) => (
                    <NeonCard key={i} isFloat={true}>
                      <div style={{ height: 140, background: "linear-gradient(45deg, #222, #111)", borderRadius: 10, marginBottom: 20, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "3rem" }}>
                        🚀
                      </div>
                      <h3 style={{ color: "#fff", fontSize: "1.2rem" }}>Project {i}</h3>
                      <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Short description goes here.</p>
                    </NeonCard>
                  ))}
                </div>
              )}

              {s.id === "contact" && <ContactSection color={s.color} />}
              {s.id === "testimonials" && <TestimonialsSection color={s.color} />}
              {s.id === "cv" && <CVSection color={s.color} />}
            </div>
          )}
        </section>
      ))}

      <FooterAndDate />
      <BackToTopRocket activeColor={starColor} />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 50% 50%, #ffb30020, #00002f 80%)",
    color: "#fff",
    overflowX: "hidden",
    fontFamily: "'Bungee', cursive, sans-serif",
    paddingBottom: "60px",
  },
  solarSystem: {
    position: "fixed",
    top: "50vh",
    left: "50vw",
    width: 1200,
    height: 1200,
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    pointerEvents: "none",
  },
  sun: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 180,
    height: 180,
    transform: "translate(-50%,-50%)",
    borderRadius: "50%",
    background: "radial-gradient(circle, #fff3a0, #ffb300)",
    boxShadow: "0 0 200px rgba(255,200,0,0.6)",
    opacity: 0.85,
  },
  orbit: {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.05)",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
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
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    zIndex: 100, // Increased to ensure clicks work
  },
  menuItem: {
    padding: "10px 18px",
    borderRadius: 16,
    border: "2px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.8rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease"
  },
  alienWrap: {
    position: "fixed",
    top: 20,
    left: 20,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    pointerEvents: "none",
  },
  alien: {
    width: 80,
    height: 100,
    borderRadius: "50%",
    background: "radial-gradient(circle at 30% 30%, #a0f7ff, #00cfff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    animation: "alienGlow 4s ease-in-out infinite",
  },
  eyeWrap: { display: "flex", gap: 12, marginBottom: 8 },
  eye: { width: 12, height: 12, borderRadius: "50%", background: "#000" },
  mouth: { width: 25, height: 6, borderBottom: "3px solid #000", borderRadius: "0 0 30px 30px" },
  alienText: {
    marginTop: 10,
    fontSize: "1.1rem",
    fontFamily: "'Bungee', cursive",
    background: "linear-gradient(90deg, #ff4ecd, #ffdd00, #00ffd5)",
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 10px rgba(255,255,255,0.5)",
  },
  carouselWrapInsideMain: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    overflow: "hidden",
    zIndex: 5,
    pointerEvents: "none",
  },
  carousel: { display: "flex", width: "200%" },
  carouselItem: {
    minWidth: 280,
    margin: "0 15px",
    padding: "15px 25px",
    borderRadius: 20,
    background: "radial-gradient(circle at top, rgba(255,255,255,.15), rgba(255,255,255,.05))",
    boxShadow: "0 0 20px rgba(120,180,255,.4)",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1rem",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  quote: {
    position: "fixed",
    top: 40,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "1rem",
    fontStyle: "italic",
    textShadow: "0 0 15px rgba(255,255,150,.6)",
    zIndex: 5,
    width: "60%",
    textAlign: "center",
  },
  retroText: {
    fontFamily: "'Bungee', cursive",
    background: "linear-gradient(90deg, #ff004c, #ff9f00, #ffee00, #00ff9d, #00c3ff, #ff004c)",
    backgroundSize: "400% 400%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  section: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    zIndex: 5,
    padding: "0 20px 50px 20px",
    scrollMarginTop: "50px",
  },
  contentContainer: {
    width: "100%",
    maxWidth: "900px",
    position: "relative",
    zIndex: 6
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "40px",
    marginTop: "20px",
  },
  grid6: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px",
  },
  footer: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
    fontFamily: "'Courier New', monospace",
    fontSize: "0.9rem",
    letterSpacing: "1.5px",
    color: "#fff",
    padding: "8px 24px",
    borderRadius: "30px",
    background: "rgba(0, 0, 0, 0.7)",
    border: "1px solid #00ddff",
    boxShadow: "0 0 10px rgba(0, 221, 255, 0.4)",
    textTransform: "uppercase",
  },
  dateContainer: {
    position: "fixed",
    bottom: 20,
    left: 20,
    zIndex: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: "0.9rem",
    color: "#00ddff",
    textShadow: "0 0 10px #00ddff",
    margin: 0,
    fontFamily: "'Courier New', monospace",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: "0.75rem",
    color: "#ff0055",
    textShadow: "0 0 8px #ff0055",
    margin: 0,
    fontFamily: "'Courier New', monospace",
  }
};
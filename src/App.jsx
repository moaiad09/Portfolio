import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= DATA ================= */
const SECTIONS = [
  { id: "main", title: "Main", color: "#ffffff", icon: "⬤", orbit: 0, size: 40 },
  { id: "about", title: "About", color: "#ff6f61", icon: "◔", orbit: 140, size: 34, speed: 60 },
  { id: "skills", title: "Skills", color: "#6fefff", icon: "◑", orbit: 200, size: 38, speed: 90 },
  { id: "projects", title: "Projects", color: "#ffdd6f", icon: "◕", orbit: 270, size: 44, speed: 130 },
  { id: "contact", title: "Contact", color: "#ff6fcf", icon: "⬢", orbit: 340, size: 48, speed: 180 },
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
function StarMascot({ visible, color }) {
  return (
    <motion.div
      initial={{ y: -150, scale: 0.2, opacity: 0 }}
      animate={{
        y: visible ? 20 : -150,
        scale: visible ? 1 : 0.2,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        right: 120,
        fontSize: "3rem",
        color: color, // ✅ استخدام اللون المرسل
        zIndex: 999,
        pointerEvents: "none",
        textShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
      }}
    >
      ⭐
    </motion.div>
  );
}

const WelcomeLoopStyles = () => (
  <style>{`
    @keyframes welcomeLoop {
      0% {
        opacity: 0;
        transform: translateY(8px) scale(0.95);
      }
      20% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      60% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      80% {
        opacity: 0;
        transform: translateY(-6px) scale(0.97);
      }
      100% {
        opacity: 0;
        transform: translateY(-6px) scale(0.97);
      }
    }

    @keyframes alienGlow {
      0%, 100% {
        box-shadow: 0 0 25px rgba(0,255,255,0.6),
                    0 0 50px rgba(0,255,255,0.3);
      }
      50% {
        box-shadow: 0 0 40px rgba(255,0,255,0.8),
                    0 0 70px rgba(0,255,255,0.6);
      }
    }

    @keyframes eyeBlink {
      0%, 92%, 100% { transform: scaleY(1); }
      95% { transform: scaleY(0.1); }
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

function SolarSystem({ active }) {
  return (
    <div style={styles.solarSystem}>
      <div style={styles.sun} />

      {SECTIONS.filter(s => s.orbit).map((s) => (
        <motion.div
          key={s.id}
          animate={{ rotate: 360 }}            // يدور مدار الكوكب
          transition={{
            duration: s.speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            ...styles.orbit,
            width: s.orbit * 2,
            height: s.orbit * 2,
          }}
        >
          <div
            style={{
              ...styles.planet,
              width: s.size,
              height: s.size,
              background: `radial-gradient(circle, #fff, ${s.color})`,
              boxShadow: `0 0 25px ${s.color}`,
              top: -s.size / 2,       // يضع الكوكب على مدار صحيح
              left: "50%",
              transform: "translateX(-50%)",
              position: "absolute",
              borderRadius: "50%",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
/* ================= MENU ================= */
function Menu({ active, setActive, setShowStar, setStarColor }) {
  const go = (id, color) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setShowStar(false);
    setStarColor(color);
  };

  return (
    <nav
      style={styles.menu}
      onMouseEnter={() => setShowStar(true)}
      onMouseLeave={() => setShowStar(false)}
    >
      {SECTIONS.map((s) => (
        <motion.div
          key={s.id}
          whileHover={{ scale: 1.1 }}
          onMouseEnter={() => {
            setActive(s.id);
            setStarColor(s.color);   // ✅ هنا نغير لون النجمة عند hover
            setShowStar(true);       // ✅ ونجعلها تظهر
          }}
          onMouseLeave={() => setActive("")}
          onClick={() => go(s.id, s.color)}
          style={styles.menuItem}
        >
          {s.icon} {s.title}
        </motion.div>
      ))}
    </nav>
  );
}

/* ================= WELCOME ALIEN ================= */
function AlienGreeter() {
  const messages = [
    "Hello, welcome to my universe!",
    "I am E.Moaiad Alimam"
  ];

  const [msgIndex, setMsgIndex] = useState(0);
  const [show, setShow] = useState(true);

  const fadeDuration = 1000;   // 1 ثانية
  const displayDuration = 4000; // 4 ثوانٍ

  useEffect(() => {
    let timeout;
    const cycleMessages = () => {
      // بعد مدة العرض، نبدأ الاختفاء
      timeout = setTimeout(() => {
        setShow(false); // fade out

        // بعد انتهاء fade-out، نغير الرسالة ونظهرها
        timeout = setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % messages.length);
          setShow(true); // fade in
          cycleMessages(); // إعادة التكرار
        }, fadeDuration);
      }, displayDuration);
    };

    cycleMessages();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={styles.alienWrap}>
      {/* الكائن الفضائي */}
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

      {/* الرسائل */}
      <div style={{ width: 250, textAlign: "center", position: "relative", height: 30 }}>
        <AnimatePresence mode="wait">
          {show && (
            <motion.div
              key={msgIndex} // كل رسالة لها مفتاح فريد
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: fadeDuration / 1000 }}
              style={styles.alienText} // ✅ الحفاظ على التدرج اللوني والحيوية
            >
              {messages[msgIndex]}
            </motion.div>
          )}
        </AnimatePresence>
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
  const [showStar, setShowStar] = useState(false);
  const [starColor, setStarColor] = useState("#ffeb3b");

  return (
    <div style={styles.page}>
      <WelcomeLoopStyles />
      <GlobalStyles />
      <Stars />
      <Meteors />
      <AlienGreeter />
      <Menu active={active} setActive={setActive} setShowStar={setShowStar} setStarColor={setStarColor} />
      <StarMascot visible={showStar} color={starColor} />
      <SolarSystem active={active} />
      <Quote />
      <ProjectCarousel />
      {SECTIONS.filter(s => s.id !== "main").map((s) => (
        <section
          id={s.id}
          key={s.id}
          style={styles.section}
        >
          {/* نضع margin-top على العنوان فقط لتجاوز Solar System */}
          <h2 style={{ color: s.color, marginTop: "350px" }}>{s.title}</h2>
          <p style={{ marginTop: "1rem" }}>
            {s.id === "about" && "Front-End Developer creating immersive, performant, and visually rich user interfaces."}
            {s.id === "skills" && "React, Framer Motion, 3D Illusions, CSS Animations, UI/UX Design"}
            {s.id === "projects" && "Portfolio websites, dashboards, interactive web interfaces, and more."}
            {s.id === "contact" && "Email: moaiadwork09@gmail.com"}
          </p>
        </section>
      ))}


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
  star: {
    position: "fixed",
    top: 20,
    right: 130,
    fontSize: "3.5rem",
    color: "var(--starColor)",
    zIndex: 30,
    pointerEvents: "none",
    transformStyle: "preserve-3d",
    textShadow: `
      0 0 20px var(--starColor),
      0 0 40px var(--starColor)
    `,
  },
  starGlow: {
    position: "absolute",
    inset: -20,
    background:
      "radial-gradient(circle, var(--starColor), transparent 70%)",
    filter: "blur(25px)",
    opacity: 0.8,
    zIndex: -1,
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
    transform: "translate(-50%,-50%)",
    borderRadius: "50%",
    pointerEvents: "none",
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
    top: 20,
    left: 20,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    pointerEvents: "none", // يمنع أي تداخل
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
    animation: "alienGlow 4s ease-in-out infinite",
  },

  eyeWrap: { display: "flex", gap: 15, marginBottom: 10 },
  eye: { width: 14, height: 14, borderRadius: "50%", background: "#000" },
  mouth: { width: 30, height: 8, borderBottom: "3px solid #000", borderRadius: "0 0 30px 30px" },
  alienText: {
    marginTop: 10,
    fontSize: "1.4rem",
    fontFamily: "'Bungee', cursive",
    background: "linear-gradient(90deg, #ff4ecd, #ffdd00, #00ffd5)",
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    textShadow: "0 0 15px rgba(255,255,255,0.7)",
    animation: "welcomeLoop 10s ease-in-out infinite",
  }
  ,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start", // نص محاذي لليسار
    position: "relative",
    zIndex: 5,
    padding: "0 15%", // مسافة من الجانبين
  }

};

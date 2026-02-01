import { motion } from "framer-motion";

export default function ServicesPage() {
    const services = [
        {
            title: "UI / UX Engineering",
            desc: "Designing immersive interfaces with motion-driven experiences and pixel-perfect layouts.",
            color: "#6fefff",
        },
        {
            title: "Front-End Architecture",
            desc: "Building scalable React architectures with clean, maintainable codebases.",
            color: "#ffdd6f",
        },
        {
            title: "Animation & Motion",
            desc: "Advanced Framer Motion animations that guide users intuitively.",
            color: "#ff6fcf",
        },
        {
            title: "Performance Optimization",
            desc: "Ensuring smooth experiences with optimized rendering and transitions.",
            color: "#6fff8f",
        },
        {
            title: "Creative Development",
            desc: "Transforming ideas into interactive digital realities.",
            color: "#ff6f61",
        },
        {
            title: "Component Systems",
            desc: "Reusable, consistent UI components aligned with design systems.",
            color: "#9f8cff",
        },
    ];

    return (
        <main style={styles.page}>
            <h1 style={styles.title}>Services</h1>
            <p style={styles.subtitle}>
                What I offer across the digital universe.
            </p>

            <section style={styles.grid}>
                {services.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 40px ${s.color}`,
                        }}
                        transition={{ type: "spring", stiffness: 200 }}
                        style={{
                            ...styles.card,
                            borderColor: s.color,
                        }}
                    >
                        <h3 style={{ color: s.color }}>{s.title}</h3>
                        <p>{s.desc}</p>
                    </motion.div>
                ))}
            </section>
        </main>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        padding: "120px 10%",
        background: "radial-gradient(circle at top, #1a1a3a, #000018)",
        color: "#fff",
        fontFamily: "'Bungee', cursive",
    },
    title: {
        fontSize: "3rem",
        marginBottom: "12px",
    },
    subtitle: {
        color: "#aaa",
        marginBottom: "60px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "32px",
    },
    card: {
        padding: "28px",
        borderRadius: "20px",
        border: "2px solid",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
    },
};

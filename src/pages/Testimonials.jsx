import { motion } from "framer-motion";

export default function TestimonialsPage() {
    const testimonials = [
        {
            name: "Alex Morgan",
            role: "Product Manager",
            text: "An outstanding developer who brings ideas to life with precision and creativity.",
            color: "#6fefff",
        },
        {
            name: "Sophia Lee",
            role: "UI/UX Designer",
            text: "The level of interaction and animation quality is simply next level.",
            color: "#ff6fcf",
        },
        {
            name: "Daniel Carter",
            role: "Tech Founder",
            text: "A rare combination of performance, design, and technical excellence.",
            color: "#ffdd6f",
        },
    ];

    return (
        <main style={styles.page}>
            <h1 style={styles.title}>Testimonials</h1>
            <p style={styles.subtitle}>
                Voices from across the digital universe.
            </p>

            <section style={styles.grid}>
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        whileHover={{
                            scale: 1.06,
                            boxShadow: `0 0 45px ${t.color}`,
                        }}
                        transition={{ type: "spring", stiffness: 180 }}
                        style={styles.card}
                    >
                        <div
                            style={{
                                ...styles.avatar,
                                boxShadow: `0 0 30px ${t.color}`,
                            }}
                        >
                            {t.name.charAt(0)}
                        </div>

                        <h3 style={{ color: t.color }}>{t.name}</h3>
                        <span style={styles.role}>{t.role}</span>
                        <p style={styles.text}>{t.text}</p>
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
        marginBottom: "10px",
    },
    subtitle: {
        color: "#aaa",
        marginBottom: "60px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "40px",
    },
    card: {
        background: "rgba(255,255,255,0.06)",
        borderRadius: "22px",
        padding: "32px",
        textAlign: "center",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: "50%",
        margin: "0 auto 16px",
        background: "radial-gradient(circle, #fff, #555)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.8rem",
        fontWeight: "bold",
    },
    role: {
        fontSize: "0.9rem",
        color: "#bbb",
    },
    text: {
        marginTop: "14px",
        lineHeight: 1.6,
        color: "#ddd",
    },
};

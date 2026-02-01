import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    const submit = e => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        e.target.reset();
    };

    return (
        <main style={styles.page}>
            <h1 style={styles.title}>Contact</h1>
            <p style={styles.subtitle}>
                Let’s connect across the stars.
            </p>

            <section style={styles.wrap}>
                <div style={styles.info}>
                    <p><strong>Email:</strong> moaiadwork09@gmail.com</p>
                    <p><strong>Location:</strong> Planet Earth 🌍</p>
                    <p><strong>Status:</strong> Open for collaboration</p>
                </div>

                <motion.form
                    onSubmit={submit}
                    whileHover={{ scale: 1.01 }}
                    style={styles.form}
                >
                    <input placeholder="Your Name" required />
                    <input placeholder="Your Email" required />
                    <textarea placeholder="Message" />
                    <button>{sent ? "Message Sent 🚀" : "Send Message"}</button>
                </motion.form>
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
    title: { fontSize: "3rem" },
    subtitle: { color: "#aaa", marginBottom: "60px" },
    wrap: {
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "40px",
    },
    info: {
        fontSize: "1.2rem",
        lineHeight: 1.8,
    },
    form: {
        background: "rgba(255,255,255,0.06)",
        padding: "30px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },
};

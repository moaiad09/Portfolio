import React from "react";
import { motion } from "framer-motion";

const timeline = {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
};

const timelineItem = {
    background: "#111",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 0 15px rgba(255,255,255,0.3)",
};

export default function CV() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ minHeight: "100vh", paddingTop: 300, textAlign: "center", color: "white" }}
        >
            <h1>Curriculum Vitae</h1>
            <p>Here’s an overview of my education and experience.</p>

            <div style={timeline}>
                <div style={timelineItem}>
                    <h4>2018 - B.Sc. Computer Science</h4>
                    <p>University XYZ</p>
                </div>
                <div style={timelineItem}>
                    <h4>2020 - Frontend Developer</h4>
                    <p>ABC Company</p>
                </div>
                <div style={timelineItem}>
                    <h4>Freelance Web Designer</h4>
                    <p>Self-employed</p>
                </div>
            </div>
        </motion.section>
    );
}

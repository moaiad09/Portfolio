import React from "react";
import { motion } from "framer-motion";

export default function About() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ minHeight: "100vh", paddingTop: 300, textAlign: "center", color: "white" }}
        >
            <h1>About Me</h1>
            <p>Who I am and what I do.</p>
        </motion.section>
    );
}

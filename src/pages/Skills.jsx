import React from "react";
import { motion } from "framer-motion";

export default function Skills() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ minHeight: "100vh", paddingTop: 300, textAlign: "center", color: "white" }}
        >
            <h1>Skills</h1>
            <p>Technologies and tools I master.</p>
        </motion.section>
    );
}

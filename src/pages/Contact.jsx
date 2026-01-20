import React from "react";
import { motion } from "framer-motion";

export default function Blog() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ minHeight: "100vh", paddingTop: 300, textAlign: "center", color: "white" }}
        >
            <h1>Blog</h1>
            <p>Insights and thoughts.</p>
        </motion.section>
    );
}

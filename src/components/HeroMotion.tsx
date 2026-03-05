import { motion } from "motion/react";

export default function HeroMotion() {
  return (
    <div className="hero-wrap">
      <motion.div
        className="hero-orb hero-orb-a"
        initial={{ opacity: 0, x: -24, y: 18 }}
        animate={{ opacity: 0.9, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.div
        className="hero-orb hero-orb-b"
        initial={{ opacity: 0, x: 24, y: -10 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      />
      <motion.p
        className="hero-kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        Focused Search for your browser
      </motion.p>
    </div>
  );
}

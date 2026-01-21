import { motion } from "framer-motion";

const About = () => (
  <section className="max-w-6xl mx-auto px-6 py-32">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl font-bold mb-8"
    >
      About Me
    </motion.h2>

    <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
      I’m a passionate MERN Stack Developer with strong frontend expertise and a
      deep interest in crafting visually engaging, high-performance web
      applications. I focus on modern UI/UX, animation, and scalable codebases.
    </p>
  </section>
);

export default About;

import { motion } from "framer-motion";

const Projects = () => (
  <section className="max-w-7xl mx-auto px-6 py-32">
    <h2 className="text-5xl font-bold mb-20 text-center">
      Selected Projects
    </h2>

    <div className="grid md:grid-cols-3 gap-12">
      {[
        {
          title: "E-Commerce Platform",
          tech: "React • Node • MongoDB • Razorpay",
          desc: "Production-ready e-commerce platform with payments and auth",
        },
        {
          title: "Personal Portfolio",
          tech: "Vite • React • Framer Motion",
          desc: "High-end animated portfolio with modern UX",
        },
        {
          title: "2048 Game",
          tech: "JavaScript • Logic",
          desc: "Smooth interactive puzzle game",
        },
      ].map((p) => (
        <motion.div
          key={p.title}
          whileHover={{ y: -12, scale: 1.03 }}
          className="group relative rounded-3xl bg-white/5 border border-white/10 p-10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-violet-600/20 to-cyan-500/20" />
          <h3 className="text-2xl font-semibold mb-3">{p.title}</h3>
          <p className="text-sm text-white/60 mb-4">{p.desc}</p>
          <p className="text-xs text-white/40">{p.tech}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;

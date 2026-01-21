import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-[#0B0D10]">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-violet-600/10 via-cyan-500/5 to-transparent blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold tracking-tight">
            Raunak<span className="text-violet-400">.</span>
          </h3>
          <p className="mt-4 text-white/60 leading-relaxed">
            Frontend & MERN Stack Developer crafting modern, scalable, and
            visually engaging web experiences.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="text-sm uppercase tracking-widest text-white/50">
            Navigation
          </h4>
          <ul className="mt-4 space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="group inline-flex items-center gap-1 text-white/70 hover:text-white transition"
                >
                  {item.name}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-sm uppercase tracking-widest text-white/50">
            Connect
          </h4>

          <div className="mt-6 flex gap-4">
            <a
              href="https://github.com/raunak5616"
              target="_blank"
              className="p-3 rounded-xl border border-white/10 hover:border-violet-400/40 hover:bg-white/5 transition"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com/in/raunak-kumar-65a392256"
              target="_blank"
              className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/5 transition"
            >
              <Linkedin />
            </a>
            <a
              href="mailto:raunakkh8789@gmail.com"
              className="p-3 rounded-xl border border-white/10 hover:border-pink-400/40 hover:bg-white/5 transition"
            >
              <Mail />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Raunak Kumar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

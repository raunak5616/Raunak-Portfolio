import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import profileImg from "../../assets/raunak2.png";
import AnimatedSubtitle from "../../component/animatedText";

const Hero = () => {
  return (
   <section className="relative z-10 min-h-screen flex items-center px-6 md:px-20 overflow-hidden">

  {/* Background Effects */}
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-32 -right-32 w-[520px] h-[520px]
      bg-purple-600/40 rounded-full blur-[120px]" />

    <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px]
      bg-pink-600/30 rounded-full blur-[120px]" />

    <div className="absolute inset-0
      bg-gradient-to-b from-transparent via-black/30 to-black/70" />
  </div>

  <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center w-full">
   
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-widest text-purple-400 uppercase">
            Welcome to my world ✨
          </span>

          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold leading-tight">
            Hi, I’m <span className="text-purple-400">Raunak</span>
          </h1>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white/90">
            <AnimatedSubtitle />
          </h2>

          <p className="mt-6 max-w-xl text-white/60 leading-relaxed">
            I design and build modern, animated, and scalable web experiences
            using React, MERN stack, and clean UI principles.
          </p>

          {/* CTA */}
          <div className="mt-10 flex gap-5">
            <Link
              to="/projects"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-black font-semibold"
            >
              My Projects <ArrowRight size={18} />
            </Link>

            <a
              href="/RAUNAK_RESUME.pdf"
              download
              className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              Download CV
            </a>
          </div>
          <div className="mt-8 flex gap-5 text-white/60">
            <a href="https://github.com/raunak5616" target="_blank">
              <Github />
            </a>
            <a href="https://linkedin.com/in/raunak-kumar-65a392256" target="_blank">
              <Linkedin />
            </a>
          </div>
        </motion.div>

        {/* RIGHT AVATAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative w-[320px] h-[320px] rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-2 shadow-2xl">
            <div className="w-full h-full rounded-2xl bg-[#0B0D10] flex items-center justify-center">
              <img
                src={profileImg}
                alt="Raunak Kumar"
                className="w-72 h-72 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* floating dots */}
          <div className="absolute -top-6 -right-6 w-6 h-6 bg-purple-400 rounded-full animate-pulse" />
          <div className="absolute -bottom-6 -left-6 w-4 h-4 bg-pink-400 rounded-full animate-pulse" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

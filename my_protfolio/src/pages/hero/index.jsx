import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import profileImg from "../../assets/raunak2.png";
import profileImgAvif640 from "../../assets/optimized/raunak2-640.avif";
import profileImgAvif960 from "../../assets/optimized/raunak2-960.avif";
import profileImgWebp640 from "../../assets/optimized/raunak2-640.webp";
import profileImgWebp960 from "../../assets/optimized/raunak2-960.webp";
import AnimatedSubtitle from "../../component/animatedText";
import MagneticButton from "../../component/MagneticButton";
import OptimizedImage from "../../component/OptimizedImage";
import Seo from "../../component/Seo";
import { preloadRoute } from "../../utils/routePreload";

const socials = [
  {
    icon: Github,
    href: "https://github.com/raunak5616",
    color: "hover:text-white",
    label: "GitHub profile",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/raunak-kumar-65a392256",
    color: "hover:text-[#0077b5]",
    label: "LinkedIn profile",
  },
  {
    icon: Mail,
    href: "mailto:raunakkh8789@gmail.com",
    color: "hover:text-pink-400",
    label: "Email Raunak Kumar",
  },
];

const Hero = () => {
  return (
    <>
      <Seo
        title="Raunak Kumar | Full-Stack Developer"
        description="Portfolio of Raunak Kumar, a full-stack developer building performant React, MERN, and modern web experiences."
        pathname="/"
      />

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 md:px-20 md:pt-20">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Full Stack Developer
              </span>
            </div>

            <h1 className="mb-6 text-6xl font-bold leading-[1.1] md:text-8xl">
              I craft <br />
              <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                Digital
              </span>{" "}
              <br />
              <span className="relative inline-block">
                Experiences
                <motion.div
                  className="absolute bottom-[-0.5rem] left-0 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                />
              </span>
            </h1>

            <div className="mb-8 max-w-lg text-xl text-white/60 md:text-2xl">
              <span className="text-white/80">Hi, I&apos;m Raunak.</span>
              <AnimatedSubtitle />
            </div>

            <p className="mb-12 max-w-lg text-lg leading-relaxed text-white/60">
              Transforming complex ideas into seamless, high-performance web applications
              with a focus on modern aesthetic and user-centric design.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton>
                <Link
                  to="/projects"
                  onMouseEnter={() => preloadRoute("projects")}
                  onFocus={() => preloadRoute("projects")}
                  className="group flex items-center gap-3 rounded-full bg-white px-10 py-5 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Work
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" size={20} />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="/Raunak_Kumar_Resume.pdf"
                  download
                  className="glass flex items-center gap-3 rounded-full border border-white/10 px-10 py-5 font-semibold transition-colors hover:bg-white/5"
                >
                  <Download size={20} className="text-cyan-400" />
                  Resume
                </a>
              </MagneticButton>
            </div>

            <div className="mt-12 flex gap-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`text-white/30 transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon size={26} />
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12 flex items-center justify-center lg:mt-0"
            style={{ perspective: "1000px" }}
          >
            <div className="absolute inset-0 z-0">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/20 via-violet-500/10 to-transparent blur-[80px]"
              />
            </div>

            <motion.div
              className="group relative z-10 aspect-[4/5] w-full max-w-[320px] cursor-pointer sm:max-w-[400px] lg:w-[450px]"
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-cyan-500/20 via-white/10 to-violet-500/20 opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-100" />

              <div
                className="pointer-events-none absolute -inset-4 rounded-[40px] border border-white/5 transition-all duration-500 group-hover:-inset-2 group-hover:border-white/10"
                style={{ transform: "translateZ(-20px)" }}
              />
              <div
                className="pointer-events-none absolute -inset-8 rounded-[50px] border border-white/[0.02]"
                style={{ transform: "translateZ(-40px)" }}
              />

              <div
                className="glass h-full w-full overflow-hidden rounded-[32px] border-white/10 p-4 shadow-2xl shadow-black/50"
                style={{ transform: "preserve-3d" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#0A0A0A]"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <OptimizedImage
                    fallbackSrc={profileImg}
                    avifSrcSet={`${profileImgAvif640} 640w, ${profileImgAvif960} 960w`}
                    webpSrcSet={`${profileImgWebp640} 640w, ${profileImgWebp960} 960w`}
                    alt="Portrait of Raunak Kumar"
                    width={1575}
                    height={1575}
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 450px"
                    loading="eager"
                    fetchPriority="high"
                    className="contents"
                    imgClassName="relative z-10 h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="glass absolute top-8 left-8 rounded-full border border-white/10 px-4 py-2 text-xs font-bold tracking-widest text-white/50 shadow-lg"
                    style={{ transform: "translateZ(60px)" }}
                  >
                    BASED IN INDIA
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, User, ShoppingBag, Truck } from "lucide-react";
import ecommerceImg from "../../assets/ecommerce.png";
import ecommerceAvif480 from "../../assets/optimized/ecommerce-480.avif";
import ecommerceAvif800 from "../../assets/optimized/ecommerce-800.avif";
import ecommerceWebp480 from "../../assets/optimized/ecommerce-480.webp";
import ecommerceWebp800 from "../../assets/optimized/ecommerce-800.webp";
import portfolioImg from "../../assets/portfolio.png";
import portfolioAvif480 from "../../assets/optimized/portfolio-480.avif";
import portfolioAvif800 from "../../assets/optimized/portfolio-800.avif";
import portfolioWebp480 from "../../assets/optimized/portfolio-480.webp";
import portfolioWebp800 from "../../assets/optimized/portfolio-800.webp";
import flowerkartImg from "../../assets/flowerkart.png";
import flowerkartAvif480 from "../../assets/optimized/flowerkart-480.avif";
import flowerkartAvif800 from "../../assets/optimized/flowerkart-800.avif";
import flowerkartWebp480 from "../../assets/optimized/flowerkart-480.webp";
import flowerkartWebp800 from "../../assets/optimized/flowerkart-800.webp";
import isometricImg from "../../assets/isometric_2048.png";
import isometricAvif480 from "../../assets/optimized/isometric_2048-480.avif";
import isometricAvif800 from "../../assets/optimized/isometric_2048-800.avif";
import isometricWebp480 from "../../assets/optimized/isometric_2048-480.webp";
import isometricWebp800 from "../../assets/optimized/isometric_2048-800.webp";
import flappyImg from "../../assets/flappy_auth_arcade.png";
import flappyAvif480 from "../../assets/optimized/flappy_auth_arcade-480.avif";
import flappyAvif800 from "../../assets/optimized/flappy_auth_arcade-800.avif";
import flappyWebp480 from "../../assets/optimized/flappy_auth_arcade-480.webp";
import flappyWebp800 from "../../assets/optimized/flappy_auth_arcade-800.webp";
import OptimizedImage from "../../component/OptimizedImage";
import Seo from "../../component/Seo";
import { preloadRoute } from "../../utils/routePreload";

const projects = [
  {
    title: "FlowerKart Ecosystem",
    tech: ["MERN Stack", "Framer Motion", "Socket.io", "Tailwind"],
    desc: "A multi-platform flower delivery service featuring User, Seller, and Delivery Partner applications.",
    image: flowerkartImg,
    avifSrcSet: `${flowerkartAvif480} 480w, ${flowerkartAvif800} 800w`,
    webpSrcSet: `${flowerkartWebp480} 480w, ${flowerkartWebp800} 800w`,
    links: [
      { label: "User App", url: "https://flowerkartv2-jr8f.vercel.app/", icon: User },
      { label: "Seller Dashboard", url: "https://flowerkartv2.vercel.app/dashboard", icon: ShoppingBag },
      { label: "Delivery Partner", url: "https://flowerkartv2-dftv.vercel.app/", icon: Truck },
    ],
    github: "https://github.com/raunak5616",
  },
  {
    title: "Premium Portfolio V2",
    tech: ["Vite", "Framer Motion", "Tailwind v4", "Lucide"],
    desc: "A high-performance portfolio featuring smooth transitions, 3D interactions, and a cinematic dark aesthetic.",
    image: portfolioImg,
    avifSrcSet: `${portfolioAvif480} 480w, ${portfolioAvif800} 800w`,
    webpSrcSet: `${portfolioWebp480} 480w, ${portfolioWebp800} 800w`,
    link: "#",
    github: "https://github.com/raunak5616",
  },
  {
    title: "Flappy Bird Arcade",
    tech: ["React", "Express", "Node.js", "JWT Auth", "Tailwind"],
    desc: "A game-inspired authentication dashboard with dark/light mode, smooth bird physics, account handling, and a global leaderboard.",
    image: flappyImg,
    avifSrcSet: `${flappyAvif480} 480w, ${flappyAvif800} 800w`,
    webpSrcSet: `${flappyWebp480} 480w, ${flappyWebp800} 800w`,
    link: "https://authpract-kohl.vercel.app/",
    github: "https://github.com/raunak5616",
  },
  {
    title: "E-Commerce Ecosystem",
    tech: ["React", "Express", "Node.js", "MongoDB", "Razorpay"],
    desc: "A full-scale production-ready marketplace with real-time analytics, secure payments, and a robust vendor dashboard.",
    image: ecommerceImg,
    avifSrcSet: `${ecommerceAvif480} 480w, ${ecommerceAvif800} 800w`,
    webpSrcSet: `${ecommerceWebp480} 480w, ${ecommerceWebp800} 800w`,
    link: "https://e-commerce-xnuk.vercel.app/",
    github: "https://github.com/raunak5616",
  },
  {
    title: "Isometric 2048",
    tech: ["JavaScript", "Canvas", "Algorithms"],
    desc: "A reimagined 2048 game with 3D isometric rendering, smooth tile merging logic, and a neon aesthetic.",
    image: isometricImg,
    avifSrcSet: `${isometricAvif480} 480w, ${isometricAvif800} 800w`,
    webpSrcSet: `${isometricWebp480} 480w, ${isometricWebp800} 800w`,
    link: "/projects/isometric-2048",
    github: "https://github.com/raunak5616",
  },
];

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);

    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  return (
    <>
      <Seo
        title="Projects | Raunak Kumar"
        description="Explore selected React, MERN, and interactive frontend projects built by Raunak Kumar with a focus on polish and performance."
        pathname="/projects"
      />

      <section className="mt-20 w-full px-6 py-32 lg:px-12">
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass mb-6 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400"
          >
            Selected Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold sm:text-5xl md:text-7xl"
          >
            Featured <span className="italic text-white/40">Projects</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover="hover"
              whileTap="hover"
              animate={isMobile ? "hover" : "initial"}
              transition={{
                initial: { duration: 0.8, delay: index * 0.1 },
                whileInView: { duration: 0.8, delay: index * 0.1 },
                hover: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
              }}
              className="glass group relative mx-auto h-[480px] w-full cursor-pointer overflow-hidden rounded-3xl border-white/10 lg:max-w-[420px]"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <motion.div
                variants={{ hover: { y: -8 } }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="h-full w-full"
              >
                <div className="absolute inset-0 z-0">
                  <OptimizedImage
                    fallbackSrc={project.image}
                    avifSrcSet={project.avifSrcSet}
                    webpSrcSet={project.webpSrcSet}
                    alt={`${project.title} project preview`}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                    className="contents"
                    imgClassName="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                  <div className="mb-4 flex flex-wrap gap-2 transition-opacity duration-300 group-hover:opacity-80">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="glass rounded-lg px-3 py-1 text-[9px] font-bold text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                      {project.title}
                    </h3>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      variants={{ hover: { height: "auto", opacity: 1, marginTop: 12 } }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mb-4 line-clamp-2 text-sm text-white/50">{project.desc}</p>

                      {project.links ? (
                        <div className="flex flex-col gap-2">
                          {project.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} ${link.label}`}
                              className="glass flex justify-between rounded-lg px-4 py-2 text-xs transition-colors hover:bg-white/10"
                            >
                              <span className="flex items-center gap-2">
                                <link.icon size={14} />
                                {link.label}
                              </span>
                              <ArrowRight size={14} />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            className="glass rounded-lg p-3 transition-colors hover:bg-white/10"
                          >
                            <Github size={18} />
                          </a>

                          {project.link.startsWith("/") ? (
                            <Link
                              to={project.link}
                              onMouseEnter={() => preloadRoute("isometric2048")}
                              onFocus={() => preloadRoute("isometric2048")}
                              className="glass flex flex-1 items-center justify-between rounded-lg px-4 py-2 text-xs transition-colors hover:bg-white/10"
                            >
                              Visit <ArrowRight size={14} />
                            </Link>
                          ) : (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} live project`}
                              className="glass flex flex-1 items-center justify-between rounded-lg px-4 py-2 text-xs transition-colors hover:bg-white/10"
                            >
                              Visit <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;

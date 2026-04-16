import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, User, ShoppingBag, Truck } from "lucide-react";
import ecommerceImg from "../../assets/ecommerce.png";
import portfolioImg from "../../assets/portfolio.png";
import flowerkartImg from "../../assets/flowerkart.png";

const projects = [
  {
    title: "E-Commerce Ecosystem",
    tech: ["React", "Express", "Node.js", "MongoDB", "Razorpay"],
    desc: "A full-scale production-ready marketplace with real-time analytics, secure payments, and a robust vendor dashboard.",
    image: ecommerceImg,
    link: "https://e-commerce-xnuk.vercel.app/",
    github: "https://github.com/raunak5616",
    color: "#00f2ff"
  },
  {
    title: "FlowerKart Ecosystem",
    tech: ["MERN Stack", "Framer Motion", "Socket.io", "Tailwind"],
    desc: "A multi-platform flower delivery service featuring User, Seller, and Delivery Partner applications.",
    image: flowerkartImg,
    links: [
      { label: "User App", url: "https://flowerkartv2-jr8f.vercel.app/", icon: User },
      { label: "Seller Dashboard", url: "https://flowerkartv2.vercel.app/dashboard", icon: ShoppingBag },
      { label: "Delivery Partner", url: "https://flowerkartv2-dftv.vercel.app/", icon: Truck },
    ],
    github: "https://github.com/raunak5616",
    color: "#ff0080"
  },
  {
    title: "Premium Portfolio V2",
    tech: ["Vite", "Framer Motion", "Tailwind v4", "Lucide"],
    desc: "A high-performance portfolio featuring smooth transitions, 3D interactions, and a cinematic dark aesthetic.",
    image: portfolioImg,
    link: "#",
    github: "https://github.com/raunak5616",
    color: "#bc13fe"
  },
  {
    title: "Isometric 2048",
    tech: ["JavaScript", "Canvas", "Algorithms"],
    desc: "A reimagined 2048 game with 3D isometric rendering, smooth tile merging logic, and a neon aesthetic.",
    image: null,
    link: "#",
    github: "https://github.com/raunak5616",
    color: "#00ff88"
  }
];

const Projects = () => {
  return (
    <section className="w-full px-6 lg:px-12 py-32 mt-20">

      {/* Heading */}
      <div className="flex flex-col items-center mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 glass rounded-full text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase mb-6"
        >
          Selected Work
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold"
        >
          Featured <span className="text-white/40 italic">Projects</span>
        </motion.h2>
      </div>

      {/* ✅ AUTO RESPONSIVE GRID (NO SLIM CARDS) */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">

        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}

            className="group relative w-full max-w-[420px] mx-auto h-[480px] rounded-3xl overflow-hidden glass border-white/10"
            whileHover="hover"
            initial="initial"
            animate="animate"
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            {/* Added a stable hover wrapper if needed, but let's try this first */}
            <motion.div 
               variants={{ hover: { y: -8 } }}
               transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
               className="w-full h-full"
            >

            {/* Background */}
            <div className="absolute inset-0 z-0">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full bg-[#050505] flex items-center justify-center text-white/20 text-xl">
                  {project.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
              
              {/* Tech Tags - Always Visible but fade slightly on hover */}
              <div className="flex flex-wrap gap-2 mb-4 transition-opacity duration-300 group-hover:opacity-80">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[9px] font-bold text-white/70 glass rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Animated Expansion */}
              <div className="w-full">
                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {project.title}
                </h3>

                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  variants={{
                    hover: { height: "auto", opacity: 1, marginTop: 12 }
                  }}
                  animate={undefined} // Controlled by parent group hover if possible, but let's use CSS group-hover for simplicity or motion's whileHover logic
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                  // Using animate logic via variants triggered by parent
                >
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">
                    {project.desc}
                  </p>

                  {project.links ? (
                    <div className="flex flex-col gap-2">
                      {project.links.map(link => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between px-4 py-2 glass rounded-lg text-xs hover:bg-white/10 transition-colors"
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
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                        <Github size={18} />
                      </a>

                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 glass rounded-lg text-xs flex justify-between items-center hover:bg-white/10 transition-colors">
                        Visit <ExternalLink size={14} />
                      </a>
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
  );
};

export default Projects;
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
    <section className="max-w-7xl mx-auto px-6 py-32 mt-20">
      
      <div className="flex flex-col items-center mb-24 text-center">
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
          className="text-5xl md:text-7xl font-bold"
        >
          Featured <span className="text-white/40 italic">Projects</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`group relative h-[520px] rounded-[32px] overflow-hidden glass border-white/5 ${index === 1 ? 'lg:col-span-1' : ''}`}
          >

            <div className="absolute inset-0 z-0">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
              ) : (
                <div 
                  className="w-full h-full bg-[#0A0A0A] flex items-center justify-center font-['Outfit']"
                  style={{ background: `radial-gradient(circle at center, ${project.color}10, transparent)` }}
                >
                  <span className="text-white/5 font-bold text-9xl uppercase tracking-tighter rotate-12">
                     2048
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>


            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
              <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]">

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 text-[10px] font-medium font-mono text-white/50 glass rounded-full border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-white/40 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.desc}
                </p>

                <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" className="p-3 glass rounded-full hover:bg-white text-white hover:text-black transition-all flex items-center justify-center">
                      <Github size={18} />
                    </a>
                    
                    {project.links ? (
                       <div className="flex-1 grid grid-cols-1 gap-2">
                         {project.links.map(link => (
                            <a 
                              key={link.label}
                              href={link.url} 
                              target="_blank"
                              className="flex items-center justify-center gap-2 px-4 py-2 glass rounded-xl text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white text-white hover:text-black transition-all"
                            >
                              <link.icon size={12} /> {link.label}
                            </a>
                         ))}
                       </div>
                    ) : (
                      <a href={project.link} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white text-white hover:text-black transition-all">
                        Visit Site <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>


            <div 
               className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" 
               style={{ backgroundColor: project.color }}
            />
          </motion.div>
        ))}
      </div>


      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 flex justify-center"
      >
        <a href="https://github.com/raunak5616" target="_blank" className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300">
           <span className="text-sm font-bold uppercase tracking-[0.3em]">View Archive on GitHub</span>
           <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </a>
      </motion.div>

    </section>
  );
};

export default Projects;

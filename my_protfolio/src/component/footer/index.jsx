import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "../MagneticButton";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-32 bg-[#030303] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      
      {/* Background Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-t from-violet-600/5 via-cyan-500/5 to-transparent blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-16 md:grid-cols-4 mb-20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-extrabold tracking-tighter mb-6 inline-block">
              RAUNAK<span className="text-cyan-400">.</span>
            </Link>
            <p className="text-xl text-white/40 leading-relaxed max-w-sm">
              Creating digital products with a focus on high-end aesthetics, 
              performance, and user delight.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-white/50 hover:text-white transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-cyan-400 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-8">Social</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Github, href: "https://github.com/raunak5616", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/raunak-kumar-65a392256", label: "LinkedIn" },
                { icon: Mail, href: "mailto:raunakkh8789@gmail.com", label: "Email" }
              ].map((social, i) => (
                <MagneticButton key={i}>
                  <a 
                    href={social.href} 
                    target="_blank" 
                    className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-300 group"
                    title={social.label}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

        </div>

        {/* Divider with Glow */}
        <div className="relative h-px w-full bg-white/5">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-white/30 font-medium">
            © {new Date().getFullYear()} RAUNAK KUMAR. BUILT WITH PASSION.
          </p>
          
          <MagneticButton>
             <button 
               onClick={scrollToTop}
               className="group flex items-center gap-3 px-6 py-3 glass rounded-full text-[10px] font-bold uppercase tracking-widest border-white/10 hover:bg-white hover:text-black transition-all duration-500"
             >
               Back to Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
             </button>
          </MagneticButton>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

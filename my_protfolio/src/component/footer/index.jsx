import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "../MagneticButton";
import { preloadRoute } from "../../utils/routePreload";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/5 bg-[#030303] pt-24 pb-12">
      <div className="absolute bottom-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-gradient-to-t from-violet-600/5 via-cyan-500/5 to-transparent blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid gap-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="mb-6 inline-block text-3xl font-extrabold tracking-tighter">
              RAUNAK<span className="text-cyan-400">.</span>
            </Link>
            <p className="max-w-sm text-xl leading-relaxed text-white/40">
              Creating digital products with a focus on high-end aesthetics,
              performance, and user delight.
            </p>
          </div>

          <div>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-white/30">Navigation</p>
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
                    onMouseEnter={() => preloadRoute(item.name.toLowerCase())}
                    onFocus={() => preloadRoute(item.name.toLowerCase())}
                    className="group flex items-center gap-2 text-white/50 transition-all duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-white/30">Social</p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Github, href: "https://github.com/raunak5616", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/raunak-kumar-65a392256", label: "LinkedIn" },
                { icon: Mail, href: "mailto:raunakkh8789@gmail.com", label: "Email" },
              ].map((social) => (
                <MagneticButton key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 glass text-white/60 transition-all duration-300 hover:border-white hover:text-white"
                    title={social.label}
                  >
                    <social.icon size={20} className="transition-transform group-hover:scale-110" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-px w-full bg-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="text-sm font-medium text-white/30">
            {"\u00A9"} {new Date().getFullYear()} RAUNAK KUMAR. BUILT WITH PASSION.
          </p>

          <MagneticButton>
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-3 rounded-full border-white/10 glass px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 hover:bg-white hover:text-black"
            >
              Back to Top <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

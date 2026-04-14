import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../component/footer";

const Layout = () => {
  const location = useLocation();

  const handleExitComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen text-white font-['Inter'] selection:bg-cyan-500/30 overflow-x-hidden relative bg-[#030303]">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-pink-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      {/* Navbar - Floating Pill */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1 p-1.5 glass rounded-full shadow-2xl shadow-black/50"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `
                relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full
                ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </motion.div>
      </nav>

      <main className="relative z-10 flex flex-col min-h-screen overflow-hidden">
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.4 },
              filter: { duration: 0.4 }
            }}
            className="flex-1 flex flex-col will-change-[transform,opacity,filter]"
          >
            <Outlet />
            <Footer />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;

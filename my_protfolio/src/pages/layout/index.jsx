import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../component/footer";

const Layout = () => {
  return (
    <div className="min-h-screen text-white font-[Inter] overflow-x-hidden relative bg-[radial-gradient(ellipse_at_top,_#3b0a57_0%,_#0b0213_45%,_#050008_100%)]">

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-white/10 border border-white/10 rounded-full px-10 py-4 shadow-xl">
        <div className="flex gap-8 text-sm font-medium">

          <NavLink to="/" end className={({ isActive }) =>
            isActive ? "text-cyan-400" : "text-white/80 hover:text-white"
          }>
            Home
          </NavLink>

          <NavLink to="/about" className={({ isActive }) =>
            isActive ? "text-cyan-400" : "text-white/80 hover:text-white"
          }>
            About
          </NavLink>

          <NavLink to="/projects" className={({ isActive }) =>
            isActive ? "text-cyan-400" : "text-white/80 hover:text-white"
          }>
            Projects
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) =>
            isActive ? "text-cyan-400" : "text-white/80 hover:text-white"
          }>
            Contact
          </NavLink>

        </div>
      </nav>

      <main className="pt-32">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;

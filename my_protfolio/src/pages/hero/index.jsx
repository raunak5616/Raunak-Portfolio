import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import profileImg from "../../assets/raunak2.png";
import AnimatedSubtitle from "../../component/animatedText";
import MagneticButton from "../../component/MagneticButton";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-20 overflow-hidden">

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">


        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-cyan-400" />
            <span className="text-sm font-semibold tracking-[0.2em] text-cyan-400 uppercase">
              Full Stack Developer
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold leading-[1.1] mb-6"
          >
            I craft <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
              Digital
            </span> <br />
            <span className="relative inline-block">
              Experiences
              <motion.div
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
              />
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="text-xl md:text-2xl text-white/60 mb-8 max-w-lg">
            <span className="text-white/80">Hi, I'm Raunak.</span>
            <AnimatedSubtitle />
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-white/40 leading-relaxed max-w-lg mb-12">
            Transforming complex ideas into seamless, high-performance web applications
            with a focus on modern aesthetic and user-centric design.
          </motion.p>


          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
            <MagneticButton>
              <Link
                to="/projects"
                className="group flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                View Work
                <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={20} />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/Raunak_Kumar_Resume.pdf"
                download
                className="flex items-center gap-3 px-10 py-5 rounded-full glass border border-white/10 hover:bg-white/5 transition-colors font-semibold"
              >
                <Download size={20} className="text-cyan-400" />
                Resume
              </a>
            </MagneticButton>
          </motion.div>


          <motion.div variants={itemVariants} className="mt-12 flex gap-8">
            {[
              { icon: Github, href: "https://github.com/raunak5616", color: "hover:text-white" },
              { icon: Linkedin, href: "https://linkedin.com/in/raunak-kumar-65a392256", color: "hover:text-[#0077b5]" },
              { icon: Mail, href: "mailto:raunakkh8789@gmail.com", color: "hover:text-pink-400" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                className={`text-white/30 transition-all duration-300 hover:scale-110 ${social.color}`}
              >
                <social.icon size={26} />
              </a>
            ))}
          </motion.div>
        </motion.div>


        <motion.div
           initial={{ opacity: 0, scale: 0.9, x: 50 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative flex justify-center items-center mt-12 lg:mt-0"
           style={{ perspective: "1000px" }}
         >
 
           <div className="absolute inset-0 z-0">
             <motion.div
               animate={{
                 scale: [1, 1.2, 1],
                 rotate: [0, 10, 0]
               }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-500/20 via-violet-500/10 to-transparent rounded-full blur-[80px]"
             />
           </div>
 
           <motion.div 
             className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] lg:w-[450px] aspect-[4/5] group cursor-pointer"
             whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
             transition={{ type: "spring", stiffness: 300, damping: 20 }}
             style={{ transformStyle: "preserve-3d" }}
           >
 
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-white/10 to-violet-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
 
             <div 
               className="absolute -inset-4 border border-white/5 rounded-[40px] pointer-events-none transition-all duration-500 group-hover:-inset-2 group-hover:border-white/10" 
               style={{ transform: "translateZ(-20px)" }}
             />
             <div 
               className="absolute -inset-8 border border-white/[0.02] rounded-[50px] pointer-events-none" 
               style={{ transform: "translateZ(-40px)" }}
             />
 
             <div 
               className="w-full h-full glass border-white/10 rounded-[32px] overflow-hidden p-4 shadow-2xl shadow-black/50"
               style={{ transform: "preserve-3d" }}
             >
               <div 
                 className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#0A0A0A]"
                 style={{ transform: "translateZ(20px)" }}
               >
                 <img
                   src={profileImg}
                   alt="Raunak Kumar"
                   className="w-full h-full object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 relative z-10"
                 />
 
 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-20" />
 
 
                 <motion.div
                   initial={{ y: 0 }}
                   animate={{ y: [-10, 10, -10] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-8 left-8 px-4 py-2 glass rounded-full text-xs font-bold tracking-widest text-white/50 border border-white/10 shadow-lg"
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
  );
};

export default Hero;

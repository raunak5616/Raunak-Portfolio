import { motion } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  Layout, 
  Zap,
  Terminal,
  Database,
  Framer,
  GraduationCap,
  Calendar,
  BookOpen,
  Sparkles,
  SearchCode
} from "lucide-react";
import SkillCard from "../../component/SkillCard";

const About = () => {
  const skills = [
    { name: "MERN Stack", level: "Specialist", icon: Layers, color: "#61dbfb" },
    { name: "React & Tailwind", level: "Expert", icon: Layout, color: "#00f2ff" },
    { name: "Node & Express", level: "Advanced", icon: Database, color: "#bc13fe" },
    { name: "Generative AI", level: "Explorer", icon: Sparkles, color: "#ff0080" },
    { name: "DSA & OOP", level: "Advanced", icon: SearchCode, color: "#00ff88" },
    { name: "System Design", level: "Practitioner", icon: Terminal, color: "#ffbb00" },
  ];

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Guru Ghasidas University, Bilaspur, India",
      duration: "04/2024 – 03/2026",
      desc: "Focusing on advanced software engineering, cloud architecture, and full-stack development."
    },
    {
      degree: "Bachelors of Computer Applications (BCA)",
      institution: "DAV Institute of Engineering and Technology, Jalandhar, India",
      duration: "04/2021 – 03/2024",
      desc: "Graduated with honors. Developed strong foundation in Java, Database Management, and Web Technologies."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-32 mt-20">
      

      <div className="flex flex-col md:flex-row gap-12 mb-32 items-end">
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-px bg-violet-500" />
            <span className="text-sm font-semibold tracking-widest text-violet-400 uppercase">
              The Story
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            Building the <br />
            <span className="text-white/40 italic">Scalable</span> Future.
          </motion.h2>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-1 text-xl text-white/50 leading-relaxed mb-4"
        >
          I'm an MCA candidate (2026) and a passionate MERN Stack Developer. 
          I specialize in building scalable full-stack applications with 
          strong foundations in system design and API-first development. 
          My goal is to create digital platforms that bridge the gap between 
          complex backends and delightful user interfaces.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-20 mb-32">

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative group h-fit"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
          <div className="relative glass border-white/10 rounded-[32px] p-12 overflow-hidden">
             
             <h3 className="text-3xl font-bold mb-6">Mission & Vision</h3>
             <p className="text-lg text-white/60 mb-8 leading-relaxed">
               I focus on producing pixel-perfect executions for multi-vendor 
               marketplaces and multi-role web platforms. My training in Java and 
               MERN stack allows me to approach problems with both object-oriented 
               rigour and modern JavaScript flexibility.
             </p>

             <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Clean Code (OOP)", icon: Terminal },
                  { title: "AI-Ready Dev", icon: Zap }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-3 p-6 glass border-white/5 rounded-2xl">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-cyan-400">
                      <item.icon size={18} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-white/40">{item.title}</span>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>


        <div className="grid sm:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillCard {...skill} />
            </motion.div>
          ))}
        </div>
      </div>


      <div className="border-t border-white/5 pt-32">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-20 text-center"
         >
           <div className="flex items-center gap-2 mb-4">
             <GraduationCap className="text-violet-400" size={24} />
             <span className="text-xs font-bold tracking-[0.3em] text-violet-400 uppercase">Education</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-bold">Academic <span className="text-white/40 italic">Journey</span></h2>
         </motion.div>

         <div className="max-w-4xl mx-auto space-y-12">
            {education.map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative group"
               >
                 <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                 <div className="relative glass border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-violet-400 shrink-0">
                      <BookOpen size={28} />
                    </div>
                    <div className="flex-1">
                       <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-violet-400 transition-colors">{item.degree}</h4>
                          <span className="flex items-center gap-2 text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded-full">
                             <Calendar size={12} /> {item.duration}
                          </span>
                       </div>
                       <p className="text-sm font-semibold text-white/40 mb-4 tracking-wide uppercase">{item.institution}</p>
                       <p className="text-white/60 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                 </div>
               </motion.div>
            ))}
         </div>
      </div>

    </section>
  );
};

export default About;

import { motion } from "framer-motion";
import {
  Layers,
  Layout,
  Zap,
  Terminal,
  Database,
  GraduationCap,
  Calendar,
  BookOpen,
  Sparkles,
  SearchCode,
} from "lucide-react";
import SkillCard from "../../component/SkillCard";
import Seo from "../../component/Seo";

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
    duration: "04/2024 - 03/2026",
    desc: "Focusing on advanced software engineering, cloud architecture, and full-stack development.",
  },
  {
    degree: "Bachelors of Computer Applications (BCA)",
    institution: "DAV Institute of Engineering and Technology, Jalandhar, India",
    duration: "04/2021 - 03/2024",
    desc: "Graduated with honors. Developed strong foundation in Java, Database Management, and Web Technologies.",
  },
];

const About = () => {
  return (
    <>
      <Seo
        title="About | Raunak Kumar"
        description="Learn about Raunak Kumar's background, education, and expertise across MERN, UI engineering, and scalable application development."
        pathname="/about"
      />

      <section className="mx-auto mt-20 max-w-7xl px-6 py-32">
        <div className="mb-32 flex flex-col items-end gap-12 md:flex-row">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center gap-2"
            >
              <span className="h-px w-8 bg-violet-500" />
              <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
                The Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-5xl font-bold md:text-7xl"
            >
              Building the <br />
              <span className="italic text-white/40">Scalable</span> Future.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex-1 text-xl leading-relaxed text-white/50"
          >
            I&apos;m an MCA candidate (2026) and a passionate MERN Stack Developer.
            I specialize in building scalable full-stack applications with strong
            foundations in system design and API-first development. My goal is to
            create digital platforms that bridge the gap between complex backends
            and delightful user interfaces.
          </motion.p>
        </div>

        <div className="mb-32 grid gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative h-fit"
          >
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-violet-600/20 to-cyan-500/20 opacity-50 blur-xl transition duration-1000 group-hover:opacity-100" />
            <div className="glass relative overflow-hidden rounded-[32px] border-white/10 p-12">
              <h3 className="mb-6 text-3xl font-bold">Mission &amp; Vision</h3>
              <p className="mb-8 text-lg leading-relaxed text-white/60">
                I focus on producing pixel-perfect executions for multi-vendor
                marketplaces and multi-role web platforms. My training in Java and
                MERN stack allows me to approach problems with both object-oriented
                rigour and modern JavaScript flexibility.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Clean Code (OOP)", icon: Terminal },
                  { title: "AI-Ready Dev", icon: Zap },
                ].map((item) => (
                  <div key={item.title} className="glass flex flex-col gap-3 rounded-2xl border-white/5 p-6">
                    <div className="glass flex h-10 w-10 items-center justify-center rounded-full text-cyan-400">
                      <item.icon size={18} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-white/40">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
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
            className="mb-20 flex flex-col items-center text-center"
          >
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="text-violet-400" size={24} />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">Education</span>
            </div>
            <h2 className="text-4xl font-bold md:text-6xl">
              Academic <span className="italic text-white/40">Journey</span>
            </h2>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-12">
            {education.map((item, idx) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600/10 to-transparent opacity-0 blur transition duration-500 group-hover:opacity-100" />
                <div className="glass relative flex flex-col items-start gap-8 rounded-3xl border-white/10 p-8 md:flex-row md:p-12">
                  <div className="glass flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-violet-400">
                    <BookOpen size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                      <h4 className="text-xl font-bold text-white transition-colors group-hover:text-violet-400 md:text-2xl">
                        {item.degree}
                      </h4>
                      <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-white/40">
                        <Calendar size={12} /> {item.duration}
                      </span>
                    </div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">
                      {item.institution}
                    </p>
                    <p className="font-medium leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

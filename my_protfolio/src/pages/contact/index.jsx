import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, MapPin, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import MagneticButton from "../../component/MagneticButton";
import Seo from "../../component/Seo";

const contactItems = [
  { icon: Mail, label: "Email", value: "raunakkh8789@gmail.com", href: "mailto:raunakkh8789@gmail.com" },
  { icon: MapPin, label: "Location", value: "India" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/raunak5616", label: "GitHub profile" },
  { icon: Linkedin, href: "https://linkedin.com/in/raunak-kumar-65a392256", label: "LinkedIn profile" },
];

const Contact = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { default: emailjs } = await import("@emailjs/browser");

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
      form.current?.reset();
    } catch {
      setStatus({ type: "error", message: "Failed to send message. Please try again or email me directly." });
    } finally {
      setLoading(false);
      window.setTimeout(() => setStatus({ type: null, message: "" }), 5000);
    }
  };

  const whatsappNumber = "+918789561656";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Raunak,%20I'd%20love%20to%20discuss%20a%20project%20with%20you!`;

  return (
    <>
      <Seo
        title="Contact | Raunak Kumar"
        description="Get in touch with Raunak Kumar for frontend, React, MERN, and product engineering opportunities."
        pathname="/contact"
      />

      <section className="relative mx-auto mt-20 max-w-7xl px-6 py-32">
        <AnimatePresence>
          {status.type && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className={`glass fixed top-24 left-1/2 z-[100] flex items-center gap-3 rounded-2xl border-white/10 px-6 py-3 shadow-2xl ${
                status.type === "success" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm font-medium">{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-20 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center gap-2"
            >
              <span className="h-px w-8 bg-cyan-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-6xl font-bold leading-[1.1] md:text-8xl"
            >
              Let&apos;s <br />
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent italic">
                Connect.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12 max-w-md text-xl leading-relaxed text-white/50"
            >
              Have a project in mind or just want to chat about the future of tech?
              My inbox is always open.
            </motion.p>

            <div className="space-y-8">
              {contactItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item.href ? (
                    <a href={item.href} className="group flex items-center gap-6">
                      <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-widest text-white/30">{item.label}</p>
                        <p className="text-lg font-medium text-white/80 transition-colors group-hover:text-white">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="group flex items-center gap-6">
                      <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-widest text-white/30">{item.label}</p>
                        <p className="text-lg font-medium text-white/80">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-white hover:text-white"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-cyan-500/20 to-violet-500/20 opacity-50 blur-2xl" />
            <div className="glass relative rounded-[40px] border-white/10 p-12">
              <form ref={form} className="space-y-8" onSubmit={sendEmail}>
                <div className="space-y-2">
                  <label htmlFor="user_name" className="ml-1 text-xs uppercase tracking-widest text-white/30">
                    Your Name
                  </label>
                  <input
                    id="user_name"
                    required
                    name="user_name"
                    type="text"
                    placeholder="NAME"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 outline-none transition-all placeholder:text-white/10 focus:border-cyan-400/50 focus:bg-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="user_email" className="ml-1 text-xs uppercase tracking-widest text-white/30">
                    Email Address
                  </label>
                  <input
                    id="user_email"
                    required
                    name="user_email"
                    type="email"
                    placeholder="ABC@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 outline-none transition-all placeholder:text-white/10 focus:border-cyan-400/50 focus:bg-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="user_message" className="ml-1 text-xs uppercase tracking-widest text-white/30">
                    Message
                  </label>
                  <textarea
                    id="user_message"
                    required
                    name="user_message"
                    rows={4}
                    placeholder="Let's build something world-class..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 outline-none transition-all placeholder:text-white/10 focus:border-cyan-400/50 focus:bg-white/10"
                  />
                </div>

                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-black/20 border-t-black"
                      />
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </MagneticButton>

                <div className="pt-2">
                  <div className="relative mb-4 flex items-center gap-4">
                    <span className="h-px w-full bg-white/5" />
                    <span className="whitespace-nowrap text-[10px] uppercase tracking-widest text-white/20">
                      Or prefer quick chat?
                    </span>
                    <span className="h-px w-full bg-white/5" />
                  </div>

                  <MagneticButton className="w-full">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex w-full items-center justify-center gap-3 rounded-2xl border-white/10 px-10 py-4 text-[10px] font-bold uppercase tracking-widest text-white/80 transition-all hover:bg-white/5 hover:text-white"
                    >
                      Chat on WhatsApp <MessageCircle size={18} className="text-emerald-400" />
                    </a>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;

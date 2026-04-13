import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, Send, MapPin, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import MagneticButton from "../../component/MagneticButton";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
        form.current.reset();
      }, (error) => {
        setStatus({ type: "error", message: "Failed to send message. Please try again or email me directly." });
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setStatus({ type: null, message: "" }), 5000);
      });
  };

  const whatsappNumber = "+918789561656";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Raunak,%20I'd%20love%20to%20discuss%20a%20project%20with%20you!`;

  return (
    <section className="max-w-7xl mx-auto px-6 py-32 mt-20 relative">


      <AnimatePresence>
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-[100] px-6 py-3 rounded-2xl glass flex items-center gap-3 shadow-2xl border-white/10 ${status.type === "success" ? "text-emerald-400" : "text-rose-400"
              }`}
          >
            {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-20">


        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-px bg-cyan-400" />
            <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1]"
          >
            Let's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 italic">Connect.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/50 leading-relaxed max-w-md mb-12"
          >
            Have a project in mind or just want to chat about the future of tech?
            My inbox is always open.
          </motion.p>

          <div className="space-y-8">
            {[
              { icon: Mail, label: "Email", value: "raunakkh8789@gmail.com", href: "mailto:raunakkh8789@gmail.com" },
              { icon: MapPin, label: "Location", value: "India", href: "#" },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/30 mb-1">{item.label}</p>
                  <p className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>


          <div className="mt-16 flex gap-6">
            {[
              { icon: Github, href: "https://github.com/raunak5616" },
              { icon: Linkedin, href: "https://linkedin.com/in/raunak-kumar-65a392256" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-300"
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
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-[40px] blur-2xl opacity-50" />
          <div className="relative glass border-white/10 rounded-[40px] p-12">
            <form ref={form} className="space-y-8" onSubmit={sendEmail}>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/30 ml-1">Your Name</label>
                <input
                  required
                  name="user_name"
                  type="text"
                  placeholder="NAME"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/30 ml-1">Email Address</label>
                <input
                  required
                  name="user_email"
                  type="email"
                  placeholder="ABC@example.com"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/30 ml-1">Message</label>
                <textarea
                  required
                  name="user_message"
                  rows={4}
                  placeholder="Let's build something world-class..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all placeholder:text-white/10 resize-none"
                />
              </div>

              <MagneticButton className="w-full">
                <button
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold hover:bg-cyan-50 transition-colors uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                    />
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </MagneticButton>

              <div className="pt-2">
                <div className="relative flex items-center gap-4 mb-4">
                  <span className="w-full h-px bg-white/5" />
                  <span className="text-[10px] text-white/20 uppercase tracking-widest whitespace-nowrap">Or prefer quick chat?</span>
                  <span className="w-full h-px bg-white/5" />
                </div>

                <MagneticButton className="w-full">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-3 px-10 py-4 rounded-2xl glass border-white/10 text-white/80 font-bold hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-[10px]"
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
  );
};

export default Contact;

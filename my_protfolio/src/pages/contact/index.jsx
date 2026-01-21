import { Github, Linkedin, Mail } from "lucide-react";

const Contact = () => (
  <section className="px-6 py-32 text-center">
    <h2 className="text-5xl font-bold mb-8">Let’s Create Something</h2>
    <p className="text-white/70 mb-12">
      Open to frontend & MERN opportunities, freelance work, and collaborations.
    </p>
    <div className="flex justify-center gap-8">
      <a href="https://github.com/raunak5616" target="_blank" rel="noreferrer">
        <Github size={28} />
      </a>
      <a href="#" target="_blank" rel="noreferrer">
        <Linkedin size={28} />
      </a>
      <a href="mailto:raunakkh8789@gmail.com">
        <Mail size={28} />
      </a>
    </div>
  </section>
);

export default Contact;

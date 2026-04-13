import { motion } from "framer-motion";

const SkillCard = ({ icon: Icon, name, level, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-6 rounded-2xl glass overflow-hidden transition-all duration-300"
    >
      <div 
        className="absolute inset-x-0 bottom-0 h-1 transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}
      />
      
      <div className="flex flex-col gap-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500"
          style={{ color: color }}
        >
          <Icon size={24} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
            {name}
          </h3>
          <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
            {level}
          </p>
        </div>
      </div>

      <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/5 rounded-full blur-2xl group-hover:bg-opacity-20 transition-all duration-500" 
           style={{ backgroundColor: `${color}20` }}
      />
    </motion.div>
  );
};

export default SkillCard;

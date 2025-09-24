import { motion } from 'framer-motion';

const RulesAndRegulations = () => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-1 sm:px-2"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        id="reg" 
        className="p-4 sm:p-8 bg-black rounded-2xl shadow-2xl space-y-6 w-[98%] sm:w-full mx-auto backdrop-blur-lg"
      >
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          Rules & Regulations
        </motion.h1>
        
        <div className="grid gap-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-4 sm:p-6 bg-black/80 backdrop-blur-md rounded-xl border border-white/20 shadow-xl hover:shadow-white/10 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center group">
              <span className="bg-white/10 p-3 rounded-xl mr-4 group-hover:bg-white/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Final Rounds
            </h2>
            <div className="space-y-6 text-gray-300">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="leading-relaxed text-lg"
              >
                The Final stages of <span className="text-white font-semibold">SACCMCT&apos;24</span> will be held on <span className="text-white font-semibold">24th November 2024</span> from <span className="text-white font-semibold">8:00 am</span> onwards at Ananda College, Colombo.
              </motion.p>

              <div className="grid gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-black p-4 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">Competition Stages</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>Knockouts - All selected teams compete starting at 9:00 am</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>Semi Final - Top four teams compete in an oral round simultaneously</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>Grand Finale - Top two teams compete for the Sir Arthur C Clarke Memorial Challenge Trophy 2024</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-black p-4 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">Schedule & Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>Registration: 8:00 am - 9:00 am</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>Event Duration: 8:00 am - 5:00 pm</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>School uniform is mandatory</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>Only pre-confirmed team members allowed</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>Lunch and refreshments will be provided</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-black p-4 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">Equipment Rules</h3>
                  <p>Scientific calculators are permitted. Electronic devices capable of storing/retrieving text, including electronic dictionaries and mobile phones, are strictly prohibited.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RulesAndRegulations;

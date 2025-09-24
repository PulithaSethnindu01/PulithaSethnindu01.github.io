import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.5
          }
        }}
        className="relative"
      >
        <motion.div
          className="relative"
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaRocket className="w-16 h-16 text-blue-500" />
          
          <motion.div
            className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div 
          className="mt-8 text-blue-400 font-medium text-lg"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
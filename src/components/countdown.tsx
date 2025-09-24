// "use client";

// // import { motion } from "framer-motion";
// import { useEffect, useState, useMemo } from "react";
// import { Moon, Sun, Star, Rocket } from "lucide-react";

// export default function Countdown() {
//   const targetDate = useMemo(() => new Date("2024-11-24"), []);

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   const [dotCount, setDotCount] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = targetDate.getTime() - now;

//       setTimeLeft({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000),
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   useEffect(() => {
//     const dotTimer = setInterval(() => {
//       setDotCount((prev) => (prev + 1) % 4);
//     }, 1000);

//     return () => clearInterval(dotTimer);
//   }, []);

//   return (
//     <div className="py-12 bg-black text-white flex items-center justify-center p-4">
//       <div className="relative w-full max-w-3xl">
//         <h1 className="text-[1.8rem] md:text-4xl font-bold tracking-widest text-center mb-8 font-heading text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
//           COMMENCING IN{".".repeat(dotCount)}
//         </h1>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
//           {[
//             { label: "DAYS", value: timeLeft.days, icon: Sun },
//             { label: "HOURS", value: timeLeft.hours, icon: Moon },
//             { label: "MINUTES", value: timeLeft.minutes, icon: Star },
//             { label: "SECONDS", value: timeLeft.seconds, icon: Rocket },
//           ].map((item) => (
//             <div
//               key={item.label}
//               className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700 relative overflow-hidden group"
//             >
//               <item.icon className="absolute top-3 right-3 w-7 h-7 text-gray-500 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
//               <div
//                 className="text-5xl md:text-6xl font-mono font-bold mb-3"
//                 aria-label={`${item.value} ${item.label.toLowerCase()}`}
//               >
//                 {item.value.toString().padStart(2, "0")}
//               </div>
//               <div className="text-sm md:text-base text-gray-400 font-light tracking-wider">
//                 {item.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Moon, Sun, Star, Rocket } from "lucide-react";

export default function Countdown() {
  const targetDate = useMemo(() => new Date("2025-11-24"), []);

  // Updated state to handle both numbers and strings
  const [timeLeft, setTimeLeft] = useState<{
    days: number | string;
    hours: number | string;
    minutes: number | string;
    seconds: number | string;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer); // Stop the timer
        setTimeLeft({
          days: "-",
          hours: "-",
          minutes: "-",
          seconds: "-",
        });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(dotTimer);
  }, []);

  return (
    <div className="py-12 bg-black text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl">
        <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[1.8rem] md:text-4xl font-bold tracking-widest text-center mb-8 font-heading text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          COMMENCING IN{".".repeat(dotCount)}
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "DAYS", value: timeLeft.days, icon: Sun },
            { label: "HOURS", value: timeLeft.hours, icon: Moon },
            { label: "MINUTES", value: timeLeft.minutes, icon: Star },
            { label: "SECONDS", value: timeLeft.seconds, icon: Rocket },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700 relative overflow-hidden group"
            >
              <item.icon className="absolute top-3 right-3 w-7 h-7 text-gray-500 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
              <div
                className="text-5xl md:text-6xl font-mono font-bold mb-3"
                aria-label={`${item.value} ${item.label.toLowerCase()}`}
              >
                {item.value === "-" ? "-" : item.value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm md:text-base text-gray-400 font-light tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

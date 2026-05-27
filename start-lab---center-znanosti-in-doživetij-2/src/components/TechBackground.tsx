import { motion } from 'motion/react';

export default function TechBackground() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none select-none bg-[#fffaf5]">
      {/* Dynamic colorful blobs inspired by Papumba style */}
      <motion.div 
        animate={{
          x: [0, 120, -60, 0],
          y: [0, 80, 140, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-linear-to-tr from-brand-red/8 to-play-pink/8 blur-[100px]"
      />
      
      <motion.div 
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 150, -50, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute top-[25%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-linear-to-bl from-play-yellow/12 to-play-pink/8 blur-[110px]"
      />

      <motion.div 
        animate={{
          x: [0, 80, -90, 0],
          y: [0, -120, 80, 0],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute -bottom-[15%] left-[15%] w-[50vw] h-[50vw] rounded-full bg-linear-to-tl from-play-teal/10 to-play-blue/10 blur-[130px]"
      />

      <motion.div 
        animate={{
          x: [0, -140, 60, 0],
          y: [0, -100, -160, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7
        }}
        className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-linear-to-r from-play-purple/8 to-brand-red/8 blur-[120px]"
      />

      {/* Floating playful vector elements (Gears, Stars, Triangles, Circles) */}
      <div className="absolute inset-0 opacity-[0.25]">
        {/* Star 1 */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[15%] left-[10%] text-play-yellow"
          style={{ width: '32px', height: '32px' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </motion.div>

        {/* Star 2 */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[25%] right-[8%] text-play-pink"
          style={{ width: '40px', height: '40px' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </motion.div>

        {/* Playful Donut/Circle */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[40%] left-[8%] border-[6px] border-play-blue rounded-full w-12 h-12"
        />

        {/* Colorful Gear 1 */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[20%] right-[15%] text-play-teal"
          style={{ width: '56px', height: '56px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </motion.div>

        {/* Cute science atom/cube representation */}
        <motion.div
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -20, 10, 0],
            rotate: [360, 0, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[10%] left-[25%] text-play-purple"
          style={{ width: '48px', height: '48px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M1.5 12a48.607 48.607 0 001.324 7.324 4.006 4.006 0 003.7 3.7c2.408.183 4.881.183 7.288 0 2.224-.17 3.93-1.956 4.032-4.184.053-.515.1-1.033.138-1.554M1.5 12l3 3m-3-3l-3 3" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Dotted pattern grid of soft warm points */}
        <div className="absolute inset-0 bg-[#80808005] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
             style={{ backgroundImage: 'radial-gradient(circle, #e31e24 0.8px, transparent 0.8px)', backgroundSize: '24px 24px' }} 
        />
      </div>
    </div>
  );
}

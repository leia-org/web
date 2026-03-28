import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-secondary-950 transition-colors duration-300">

      {/* Animated gradient blobs for background aesthetics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-brand-300/30 dark:bg-brand-900/30 mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-primary-300/30 dark:bg-primary-900/30 mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40rem] h-[40rem] rounded-full bg-pink-300/30 dark:bg-fuchsia-900/30 mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-max relative z-10 w-full pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm font-medium text-brand-700 dark:text-brand-300"
          >
            <Sparkles size={16} className="text-brand-500" />
            <span>Discover the next generation of learning</span>
          </motion.div>

          <div className="space-y-8 w-full">
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight text-secondary-900 dark:text-white"
              >
                Learn <span className="gradient-text">with</span> AI
                <span className="block mt-2 text-secondary-500 dark:text-secondary-400 font-semibold md:text-7xl">not from AI.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="max-w-2xl mx-auto text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 font-light"
              >
                Boost the learning process with deeply immersive and personalized experiences.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
            >
              <button
                className="modern-button w-full sm:w-auto hover:scale-105"
                onClick={() => window.open('https://workbench.leia.ovh/?email=_test_webd&code=RMEWO1XRAK73U2YC4', '_blank')}
              >
                View Live Demo
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="/docs"
                className="modern-button modern-button--outline w-full sm:w-auto"
              >
                Read the Docs
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent dark:from-secondary-950 dark:to-transparent z-0"></div>
    </section>
  )
}

export default Hero

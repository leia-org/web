import React from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import universities from '../data/universities.json'
import FromPreBuildComponentsGif from '../gifs/FromPreBuiltComponents.gif'
import DesignUsingExistingLEIAsGif from '../gifs/DesignFromThis.gif'
import ReplicateGif from '../gifs/Replicate.gif'
import StudentsGif from '../gifs/Students.gif'
const Hero: React.FC = () => {
  const universityItems = universities as Array<{ name: string; icon: string }>
  const featureTemplates = [
    {
      id: 1,
      title: 'Design your LEIA',
      description: 'You can create your own from pre-built components or design it using existing LEIAs, you can also try your new LEIA and then add it to an activity.',
      gifs: [FromPreBuildComponentsGif, DesignUsingExistingLEIAsGif],
    },    
    {
      id: 2,
      title: 'Configurate your Activity',
      description: 'Now you can replicate your activity and customize the LEIA configuration, such as the LLM provider and submission and evaluation settings.',
      gifs: [ReplicateGif],
    },
    {
      id: 3,
      title: 'Interaction with the LEIA',
      description: 'Students can interact with the LEIA in a deeply immersive way using natural language and submit their answers, which will be automatically graded with feedback provided.',
      gifs: [StudentsGif],
    },
  ]
  const [activeGifByTemplate, setActiveGifByTemplate] = React.useState<Record<number, number>>(
    () => Object.fromEntries(featureTemplates.map((template) => [template.id, 0])),
  )

  const goToGif = (templateId: number, total: number, direction: 'next' | 'prev') => {
    if (total <= 1) return
    setActiveGifByTemplate((previous) => {
      const current = previous[templateId] ?? 0
      const nextIndex = direction === 'next'
        ? (current + 1) % total
        : (current - 1 + total) % total

      return {
        ...previous,
        [templateId]: nextIndex,
      }
    })
  }

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
                <span>View Live Demo</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="/docs"
                className="modern-button modern-button--outline w-full sm:w-auto"
              >
                <span>Read the Docs</span>
              </a>
            </motion.div>
            {/* Universities Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="mt-10 w-full max-w-3xl mx-auto"
            >
              <h4 className="text-lg md:text-xl font-semibold text-secondary-900 dark:text-white mb-5 text-center">
                Universities involved
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {universityItems.map((university) => (
                  <div
                    key={university.name}
                    className="flex items-center justify-between gap-3 px-1 py-2"
                  >
                    <span className="text-sm text-secondary-700 dark:text-secondary-200 text-left">{university.name}</span>
                    <img
                      src={university.icon}
                      alt={`Logo de ${university.name}`}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
            {/*Explanation of highlighted features*/}
            <div className="mt-12 space-y-6 max-w-5xl mx-auto">
              {featureTemplates.map((template, index) => (
                <motion.article
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 + index * 0.1, ease: "easeOut" }}
                  className="p-5 md:p-6 rounded-2xl bg-white/70 dark:bg-secondary-900/70 border border-secondary-200/60 dark:border-secondary-700/50 shadow-sm"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-secondary-900 dark:text-white text-center mb-5">
                    {template.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-md group">
                      <div className="relative h-52 md:h-56">
                        <AnimatePresence mode="sync" initial={false}>
                          <motion.img
                            key={`${template.id}-${activeGifByTemplate[template.id] ?? 0}`}
                            src={template.gifs[activeGifByTemplate[template.id] ?? 0]}
                            alt={`${template.title} preview`}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            initial={{ opacity: 0, scale: 1.01 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.99 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          />
                        </AnimatePresence>
                      </div>

                      { template.gifs.length>1 && (<button 
                        type="button"
                        onClick={() => goToGif(template.id, template.gifs.length, 'prev')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-0 bg-transparent border-0 shadow-none text-black transition-transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                        disabled={template.gifs.length <= 1}
                        aria-label={`Previous gif for ${template.title}`}
                      >
                        <ChevronLeft size={32} strokeWidth={2.5} />
                      </button>)}

                      { template.gifs.length>1 && (<button
                        type="button"
                        onClick={() => goToGif(template.id, template.gifs.length, 'next')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0 bg-transparent border-0 shadow-none text-black transition-transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                        disabled={template.gifs.length <= 1}
                        aria-label={`Next gif for ${template.title}`}
                      >
                        <ChevronRight size={32} strokeWidth={2.5} />
                      </button>)}
                    </div>

                    <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed text-left">
                      {template.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent dark:from-secondary-950 dark:to-transparent z-0"></div>
    </section>
  )
}

export default Hero

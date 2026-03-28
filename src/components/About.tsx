import React from 'react'
import { CheckCircle, ArrowRight, Star } from 'lucide-react'
import ScrollRevealParagraph from './ScrollRevealParagraph'

const About: React.FC = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Entrepreneur",
      content: "I created a customized assistant for my business in just 3 steps. Now I have a helper that understands perfectly what I need.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      role: "Student",
      content: "My study assistant helps me understand difficult concepts. It's like having a personal tutor available 24/7.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Professional",
      content: "I have different assistants for different tasks: one for work, another for personal. LEIA makes everything super easy.",
      rating: 5
    }
  ]

  const stats = [
    { number: "3", label: "Simple Steps" },
    { number: "∞", label: "Customizations" },
    { number: "24/7", label: "Available" },
    { number: "100%", label: "Secure" }
  ]

  return (
    <section id="acerca" className="py-24 bg-gray-50 dark:bg-secondary-900 transition-colors duration-300">
      <div className="container-max">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white mb-8 leading-tight">
              About LEIA
            </h2>
            <ScrollRevealParagraph
              paragraph="LEIA was born from the idea that everyone should be able to create their own customized AI assistant. You don't need to be a technology expert to have an assistant that understands exactly what you need and helps you the way you want."
              className="text-xl text-gray-500 mb-6"
            />
            <ScrollRevealParagraph
              paragraph="We believe that AI should be your companion, not your replacement. That's why LEIA allows you to create assistants that adapt to your style, your work, and your specific needs. It's like having a personal helper that never sleeps and is always ready to help you."
              className="text-xl text-gray-500 mb-8"
            />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-gray-600 dark:text-gray-400" size={20} />
                <span className="text-gray-500 dark:text-gray-400">Easy to use for anyone</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-gray-600 dark:text-gray-400" size={20} />
                <span className="text-gray-500 dark:text-gray-400">Complete customization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-gray-600 dark:text-gray-400" size={20} />
                <span className="text-gray-500 dark:text-gray-400">Always available 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-gray-600 dark:text-gray-400" size={20} />
                <span className="text-gray-500 dark:text-gray-400">Completely secure data</span>
              </div>
            </div>

            <a
              href="/docs/intro"
              className="modern-button modern-button--dark px-6 py-3 mt-8 flex items-center gap-2 no-underline hover:no-underline inline-flex"
            >
              Learn more about us
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 border border-gray-200 dark:border-secondary-700">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
              Our Mission
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              To make it possible for anyone to create their own customized AI assistant,
              without the need for complex technical knowledge.
            </p>
            <div className="border-t border-gray-200 dark:border-secondary-700 pt-6">
              <h4 className="font-semibold text-black dark:text-white mb-3">Our Vision</h4>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                A world where everyone has access to customized AI assistants
                that help them be more productive and creative in everything they do.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-black dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white mb-6 leading-tight">
            What our users say
          </h2>
          <div className="max-w-2xl mx-auto">
            <ScrollRevealParagraph
              paragraph="Real people who have created their customized assistants with LEIA"
              className="text-xl text-gray-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-secondary-800 p-8 rounded-2xl border border-gray-200 dark:border-secondary-700">
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-gray-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-black dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

import React from 'react'
import {
  Brain,
  Zap,
  Shield,
  Users,
  BarChart3,
  Globe,
  MessageSquare,
  Settings,
  Lock,
  TrendingUp
} from 'lucide-react'
import ScrollRevealParagraph from './ScrollRevealParagraph'

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Total Customization",
      description: "Create unique assistants by choosing personality, behavior, and specific purpose for your needs.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Creation in 3 Steps",
      description: "Super simple process: choose personality, define behavior, and set the purpose. Done!",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Shield,
      title: "Protected Data",
      description: "All your information is completely secure with enterprise-level protection.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Users,
      title: "Multiple Assistants",
      description: "Create as many assistants as you need: one for work, another for personal, another for education.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: BarChart3,
      title: "Experiment and Improve",
      description: "Test different versions, compare results, and optimize your assistant for better performance.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Globe,
      title: "Always Available",
      description: "Your personal assistant is ready 24/7, without interruptions, always there when you need it.",
      color: "bg-cyan-100 text-cyan-600"
    }
  ]

  const benefits = [
    {
      icon: MessageSquare,
      title: "Direct Chat",
      description: "Talk directly with your assistant in real time, as if it were a natural conversation."
    },
    {
      icon: Settings,
      title: "Easy to Modify",
      description: "Change and improve your assistant whenever you want. No technical complications."
    },
    {
      icon: Lock,
      title: "Secure Access",
      description: "Only you can access your assistants. Your privacy is completely protected."
    },
    {
      icon: TrendingUp,
      title: "Constant Improvement",
      description: "Your assistant learns from every conversation to give you better and better responses."
    }
  ]

  return (
    <section id="caracteristicas" className="py-24 bg-white dark:bg-secondary-950 transition-colors duration-300">
      <div className="container-max">
        {/* Features Grid */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white mb-6 leading-tight">
            Main Features
          </h2>
          <div className="max-w-2xl mx-auto">
            <ScrollRevealParagraph
              paragraph="Discover the capabilities that make LEIA the most advanced AI platform on the market"
              className="text-xl text-gray-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-gray-200 dark:border-secondary-800 hover:border-gray-300 dark:hover:border-secondary-700 transition-colors duration-200"
            >
              <div className="mb-6">
                <feature.icon size={24} className="text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 dark:bg-secondary-900/50 rounded-2xl p-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white mb-6 leading-tight">
              Why choose LEIA?
            </h2>
            <div className="max-w-2xl mx-auto">
              <ScrollRevealParagraph
                paragraph="More than a tool, LEIA is your intelligent companion for success"
                className="text-xl text-gray-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700">
                    <benefit.icon className="text-gray-600 dark:text-gray-400" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

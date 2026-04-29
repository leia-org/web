import React from 'react'
import { Linkedin, Twitter, Github } from 'lucide-react'
import people from '../../data/people.json'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const peopleItems = people as Array<{ name: string; photo: string }>
  const footerLinks = {
    producto: [
      { name: 'Features', href: '#caracteristicas' },
      { name: 'Documentation', href: '/docs/intro' },
      { name: 'API', href: '/docs/api' },
      { name: 'Tutorials', href: '/docs/tutorial-basics/create-a-document' }
    ],
    empresa: [
      { name: 'About', href: '#acerca' },
      { name: 'Blog', href: '/blog' },
      { name: 'Team', href: '#team' },
      { name: 'Contact', href: '#contacto' }
    ],
    soporte: [
      { name: 'Help Center', href: '/docs/intro' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Community', href: '#comunidad' },
      { name: 'Contact', href: '#contacto' }
    ],
    legal: [
      { name: 'Privacy', href: '#privacidad' },
      { name: 'Terms', href: '#terminos' },
      { name: 'Cookies', href: '#cookies' },
      { name: 'Security', href: '#seguridad' }
    ]
  }

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' }
  ]

  return (
    
    <footer id="contacto" className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="container-max py-24">

        {/* People */}
        <div className="mb-12">
          <div>
            <h4 className="text-xl font-semibold text-white mb-6 text-center lg:text-left">
              People involved
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-10 md:gap-x-14">
              {peopleItems.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center justify-between gap-3 px-1 py-2"
                >
                  <span className="text-sm text-gray-200">{person.name}</span>
                  <img
                    src={person.photo}
                    alt={`Foto de ${person.name}`}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} LEIA Team. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

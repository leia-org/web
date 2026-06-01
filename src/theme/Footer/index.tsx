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

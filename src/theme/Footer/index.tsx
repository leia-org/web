import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
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

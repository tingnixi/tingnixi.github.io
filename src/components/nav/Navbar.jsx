import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <span className="font-display font-bold text-lg">T.W</span>
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => scrollToSection('work')}
            className="text-sm uppercase tracking-widest hover:text-[#CCFF00] transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm uppercase tracking-widest hover:text-[#CCFF00] transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('thoughts')}
            className="text-sm uppercase tracking-widest hover:text-[#CCFF00] transition-colors"
          >
            Thoughts
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm uppercase tracking-widest hover:text-[#CCFF00] transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

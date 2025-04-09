import React, { useState, useEffect } from 'react';
import { Scissors, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Fechar o menu quando clicar em um link de navegação
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full bg-barber-dark text-barber-light z-50 transition-all duration-300 ${scrolled ? 'shadow-lg py-2' : 'py-4'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center gap-2 text-barber-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ 
              duration: 1,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Scissors className="h-6 w-6" />
          </motion.div>
          <motion.span 
            className="text-xl font-bold tracking-wider"
            animate={{ 
              textShadow: ["0 0 0px rgba(212, 175, 55, 0)", "0 0 8px rgba(212, 175, 55, 0.5)", "0 0 0px rgba(212, 175, 55, 0)"] 
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            VAZ BARBER
          </motion.span>
        </motion.a>
        
        {/* Mobile menu button */}
        <motion.button 
          className="md:hidden text-barber-light hover:text-barber-secondary"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { id: 'services', label: 'Serviços' },
            { id: 'barbers', label: 'Barbeiros' },
            { id: 'contact', label: 'Contato' },
          ].map((item, index) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`} 
              className="text-barber-light hover:text-barber-secondary transition-colors relative"
              whileHover={{ scale: 1.05 }}
              custom={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.1 * index,
                duration: 0.5
              }}
            >
              <span className="relative">
                {item.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-barber-secondary"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration:.2 }}
                ></motion.span>
              </span>
            </motion.a>
          ))}
          <motion.a 
            href="#appointment" 
            className="px-4 py-2 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors"
            whileHover={{ scale: 1.05, backgroundColor: "#C19A6B" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            Agendar
          </motion.a>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-barber-dark"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="container mx-auto px-4 py-4 flex flex-col gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { id: 'services', label: 'Serviços' },
                { id: 'barbers', label: 'Barbeiros' },
                { id: 'contact', label: 'Contato' },
              ].map((item, index) => (
                <motion.a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  className="text-barber-light hover:text-barber-secondary transition-colors py-2 border-b border-barber-accent/20"
                  onClick={handleLinkClick}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a 
                href="#appointment" 
                className="px-4 py-2 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors text-center mt-2"
                onClick={handleLinkClick}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Agendar
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
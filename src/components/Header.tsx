
import React, { useState } from 'react';
import { Scissors, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-barber-dark text-barber-light z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-barber-secondary">
          <Scissors className="h-6 w-6" />
          <span className="text-xl font-bold tracking-wider">NAVALHA DIGITAL</span>
        </a>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-barber-light hover:text-barber-secondary"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-barber-light hover:text-barber-secondary transition-colors">
            Serviços
          </a>
          <a href="#barbers" className="text-barber-light hover:text-barber-secondary transition-colors">
            Barbeiros
          </a>
          <a href="#contact" className="text-barber-light hover:text-barber-secondary transition-colors">
            Contato
          </a>
          <a 
            href="#appointment" 
            className="px-4 py-2 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors"
          >
            Agendar
          </a>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-barber-dark">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#services" 
              className="text-barber-light hover:text-barber-secondary transition-colors py-2 border-b border-barber-accent/20"
              onClick={toggleMenu}
            >
              Serviços
            </a>
            <a 
              href="#barbers" 
              className="text-barber-light hover:text-barber-secondary transition-colors py-2 border-b border-barber-accent/20"
              onClick={toggleMenu}
            >
              Barbeiros
            </a>
            <a 
              href="#contact" 
              className="text-barber-light hover:text-barber-secondary transition-colors py-2 border-b border-barber-accent/20"
              onClick={toggleMenu}
            >
              Contato
            </a>
            <a 
              href="#appointment" 
              className="px-4 py-2 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors text-center"
              onClick={toggleMenu}
            >
              Agendar
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

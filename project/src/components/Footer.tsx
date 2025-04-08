
import React from 'react';
import { Scissors } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-barber-dark text-barber-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-barber-secondary mb-4">
              <Scissors className="h-6 w-6" />
              <span className="text-xl font-bold tracking-wider">NAVALHA DIGITAL</span>
            </div>
            <p className="text-barber-light/70 mb-6">
              Oferecendo cortes premium e serviços de barbearia com estilo e precisão desde 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-barber-primary flex items-center justify-center hover:bg-barber-accent transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4 fill-current text-barber-light" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-barber-primary flex items-center justify-center hover:bg-barber-accent transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4 fill-current text-barber-light" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-barber-primary flex items-center justify-center hover:bg-barber-accent transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4 fill-current text-barber-light" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-barber-secondary">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#services" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#barbers" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Barbeiros
                </a>
              </li>
              <li>
                <a href="#appointment" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Agendamento
                </a>
              </li>
              <li>
                <a href="#contact" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-barber-secondary">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Corte Clássico
                </a>
              </li>
              <li>
                <a href="#services" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Barba Completa
                </a>
              </li>
              <li>
                <a href="#services" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Corte Degradê
                </a>
              </li>
              <li>
                <a href="#services" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Hot Towel Shave
                </a>
              </li>
              <li>
                <a href="#services" className="text-barber-light/80 hover:text-barber-secondary transition-colors">
                  Tratamento Capilar
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-barber-secondary">Contato</h3>
            <address className="not-italic text-barber-light/80">
              <p className="mb-2">Av. Paulista, 1000</p>
              <p className="mb-2">Bela Vista, São Paulo - SP</p>
              <p className="mb-2">CEP: 01310-100</p>
              <p className="mb-2">
                <a href="tel:+551199999999" className="hover:text-barber-secondary transition-colors">
                  (11) 9999-9999
                </a>
              </p>
              <p>
                <a href="mailto:contato@navalhadigital.com" className="hover:text-barber-secondary transition-colors">
                  contato@navalhadigital.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-barber-light/10 mt-12 pt-8 text-center text-barber-light/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Navalha Digital. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

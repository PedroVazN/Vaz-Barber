
import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-barber-dark text-barber-light pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-barber-secondary">Estilo</span> e{" "}
            <span className="text-barber-secondary">Precisão</span> em cada corte
          </h1>
          <p className="text-lg md:text-xl mb-8 text-barber-light/90">
            Uma experiência única de barbearia com os melhores profissionais e 
            um ambiente sofisticado para realçar o seu estilo pessoal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#appointment" 
              className="px-6 py-3 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors text-lg font-medium"
            >
              Agendar Agora
            </a>
            <a 
              href="#services" 
              className="px-6 py-3 border-2 border-barber-secondary text-barber-secondary rounded hover:bg-barber-secondary/10 transition-colors text-lg font-medium"
            >
              Nossos Serviços
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;

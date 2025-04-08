
import React from 'react';
import { Scissors, Smile, Sparkles } from 'lucide-react';

const serviceItems = [
  {
    id: 1,
    title: 'Corte Clássico',
    description: 'Corte tradicional masculino com acabamento perfeito.',
    price: 'R$ 45',
    icon: Scissors,
    duration: '30 min'
  },
  {
    id: 2,
    title: 'Barba Completa',
    description: 'Modelagem e hidratação da barba para um visual impecável.',
    price: 'R$ 35',
    icon: Smile,
    duration: '25 min'
  },
  {
    id: 3,
    title: 'Combo Barba e Cabelo',
    description: 'Pacote completo com corte de cabelo e tratamento da barba.',
    price: 'R$ 70',
    icon: Scissors,
    duration: '50 min'
  },
  {
    id: 4,
    title: 'Corte Degradê',
    description: 'Corte moderno com técnica de degradê e acabamento personalizado.',
    price: 'R$ 55',
    icon: Scissors,
    duration: '35 min'
  },
  {
    id: 5,
    title: 'Hot Towel Shave',
    description: 'Barbear com toalha quente para uma experiência relaxante e premium.',
    price: 'R$ 40',
    icon: Smile,
    duration: '30 min'
  },
  {
    id: 6,
    title: 'Tratamento Capilar',
    description: 'Tratamento para fortalecer e hidratar os fios, incluindo massagem.',
    price: 'R$ 60',
    icon: Sparkles,
    duration: '40 min'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-barber-dark">
            <span className="brush-underline">Nossos Serviços</span>
          </h2>
          <p className="text-barber-dark/80 max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços para manter seu visual impecável, 
            desde cortes clássicos até tratamentos especiais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg p-6 shadow-md border border-barber-light/50 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <service.icon className="w-8 h-8 text-barber-primary" />
                <span className="text-xl font-bold text-barber-secondary">{service.price}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-barber-dark">{service.title}</h3>
              <p className="text-barber-dark/70 mb-4">{service.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-barber-primary font-medium">Duração: {service.duration}</span>
                <a 
                  href="#appointment" 
                  className="text-barber-secondary hover:text-barber-primary font-medium"
                >
                  Agendar →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

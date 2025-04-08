
import React from 'react';
import { Scissors, Smile, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

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

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.5,
    },
  }),
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-24 -right-24 w-48 h-48 bg-barber-primary/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div 
        className="absolute -bottom-24 -left-24 w-48 h-48 bg-barber-secondary/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-barber-dark">
            <span className="brush-underline">Nossos Serviços</span>
          </h2>
          <p className="text-barber-dark/80 max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços para manter seu visual impecável, 
            desde cortes clássicos até tratamentos especiais.
          </p>
        </motion.div>
        
        {/* Desktop view: Grid layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div 
              key={service.id} 
              className="bg-white rounded-lg p-6 shadow-md border border-barber-light/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="p-2 bg-barber-primary/10 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-8 h-8 text-barber-primary" />
                </motion.div>
                <span className="text-xl font-bold text-barber-secondary">{service.price}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-barber-dark">{service.title}</h3>
              <p className="text-barber-dark/70 mb-4">{service.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-barber-primary font-medium">Duração: {service.duration}</span>
                <motion.a 
                  href="#appointment" 
                  className="text-barber-secondary hover:text-barber-primary font-medium flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Agendar 
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'loop', ease: "easeInOut" }}
                  >→</motion.span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile view: Carousel */}
        <div className="md:hidden w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {serviceItems.map((service) => (
                <CarouselItem key={service.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="bg-white rounded-lg p-6 shadow-md border border-barber-light/50 h-full"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className="p-2 bg-barber-primary/10 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon className="w-8 h-8 text-barber-primary" />
                      </motion.div>
                      <span className="text-xl font-bold text-barber-secondary">{service.price}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-barber-dark">{service.title}</h3>
                    <p className="text-barber-dark/70 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-barber-primary font-medium">Duração: {service.duration}</span>
                      <motion.a 
                        href="#appointment" 
                        className="text-barber-secondary hover:text-barber-primary font-medium flex items-center"
                      >
                        Agendar →
                      </motion.a>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 h-8 w-8 rounded-full" />
              <CarouselNext className="static translate-y-0 h-8 w-8 rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Services;

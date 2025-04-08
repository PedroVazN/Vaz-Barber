
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-barber-dark text-barber-light pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      
      {/* Animação de gradiente */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-barber-dark/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
      
      {/* Elementos decorativos animados */}
      <motion.div 
        className="absolute top-20 right-10 w-32 h-32 bg-barber-secondary/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 w-40 h-40 bg-barber-primary/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              className="text-barber-secondary inline-block"
              animate={{ 
                textShadow: ["0 0 5px rgba(212, 175, 55, 0)", "0 0 15px rgba(212, 175, 55, 0.5)", "0 0 5px rgba(212, 175, 55, 0)"]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Estilo
            </motion.span> e{" "}
            <motion.span 
              className="text-barber-secondary inline-block"
              animate={{ 
                textShadow: ["0 0 5px rgba(212, 175, 55, 0)", "0 0 15px rgba(212, 175, 55, 0.5)", "0 0 5px rgba(212, 175, 55, 0)"] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              Precisão
            </motion.span> em cada corte
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-barber-light/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Uma experiência única de barbearia com os melhores profissionais e 
            um ambiente sofisticado para realçar o seu estilo pessoal.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <motion.a 
              href="#appointment" 
              className="px-6 py-3 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors text-lg font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="absolute inset-0 w-0 bg-barber-secondary/20 transition-all duration-300 group-hover:w-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Agendar Agora</span>
            </motion.a>
            
            <motion.a 
              href="#services" 
              className="px-6 py-3 border-2 border-barber-secondary text-barber-secondary rounded hover:bg-barber-secondary/10 transition-colors text-lg font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Nossos Serviços
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;

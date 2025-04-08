
import React from 'react';
import { motion } from 'framer-motion';

const barbers = [
  {
    id: 1,
    name: 'Ricardo Alves',
    role: 'Barbeiro Master',
    experience: '12 anos de experiência',
    image: 'https://images.unsplash.com/photo-1578176603894-57973e38890f?q=80&w=2080&auto=format&fit=crop',
    specialty: 'Degradês e Cortes Clássicos'
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    role: 'Especialista em Barbas',
    experience: '8 anos de experiência',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074&auto=format&fit=crop',
    specialty: 'Barbas Estilizadas e Tratamentos'
  },
  {
    id: 3,
    name: 'Fernando Costa',
    role: 'Barbeiro Estilista',
    experience: '10 anos de experiência',
    image: 'https://st4allthings4p4ci.blob.core.windows.net/allthingshair/allthingshair/wp-content/uploads/sites/2/2017/03/barbeiro-ruim-377x483.jpg',
    specialty: 'Cortes Modernos e Coloração'
  }
];

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Barbers = () => {
  return (
    <section id="barbers" className="py-20 bg-barber-dark text-barber-light relative overflow-hidden">
      {/* Elementos decorativos */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      
      <motion.div 
        className="absolute -top-20 -right-20 w-40 h-40 bg-barber-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-barber-secondary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-barber-light">
            <span className="brush-underline">Nossa Equipe</span>
          </h2>
          <p className="text-barber-light/80 max-w-2xl mx-auto">
            Conheça nossos profissionais altamente qualificados e experientes, 
            prontos para oferecer o melhor serviço.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {barbers.map((barber) => (
            <motion.div 
              key={barber.id} 
              className="group"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden vintage-border">
                <div className="aspect-w-3 aspect-h-4">
                  <motion.img 
                    src={barber.image} 
                    alt={barber.name}
                    className="object-cover w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-barber-dark/90 to-transparent opacity-80"></div>
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 10, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-xl font-bold mb-1 text-barber-secondary"
                    initial={{ y: 5, opacity: 0.9 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {barber.name}
                  </motion.h3>
                  <motion.p 
                    className="text-barber-light/90 mb-2"
                    initial={{ y: 5, opacity: 0.8 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {barber.role}
                  </motion.p>
                  <motion.div 
                    className="flex flex-col gap-1 text-sm"
                    initial={{ y: 10, opacity: 0.7 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <span className="text-barber-light/80">{barber.experience}</span>
                    <span className="text-barber-secondary font-medium">Especialidade: {barber.specialty}</span>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div 
                className="mt-4 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.a 
                  href="#appointment" 
                  className="px-4 py-2 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "#C19A6B" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Agendar com {barber.name.split(' ')[0]}
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Barbers;

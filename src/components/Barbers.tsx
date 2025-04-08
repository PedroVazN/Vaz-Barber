
import React from 'react';

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
    image: 'https://images.unsplash.com/photo-1599351431613-18ef1feae3b0?q=80&w=1988&auto=format&fit=crop',
    specialty: 'Cortes Modernos e Coloração'
  }
];

const Barbers = () => {
  return (
    <section id="barbers" className="py-20 bg-barber-dark text-barber-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-barber-light">
            <span className="brush-underline">Nossa Equipe</span>
          </h2>
          <p className="text-barber-light/80 max-w-2xl mx-auto">
            Conheça nossos profissionais altamente qualificados e experientes, 
            prontos para oferecer o melhor serviço.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber) => (
            <div key={barber.id} className="group">
              <div className="relative overflow-hidden vintage-border">
                <div className="aspect-w-3 aspect-h-4">
                  <img 
                    src={barber.image} 
                    alt={barber.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-barber-dark/90 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-1 text-barber-secondary">{barber.name}</h3>
                  <p className="text-barber-light/90 mb-2">{barber.role}</p>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-barber-light/80">{barber.experience}</span>
                    <span className="text-barber-secondary font-medium">Especialidade: {barber.specialty}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <a 
                  href="#appointment" 
                  className="px-4 py-2 bg-barber-primary text-barber-light rounded hover:bg-barber-accent transition-colors"
                >
                  Agendar com {barber.name.split(' ')[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Barbers;

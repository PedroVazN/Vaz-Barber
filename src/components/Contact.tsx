
import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-barber-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-barber-dark">
            <span className="brush-underline">Onde Estamos</span>
          </h2>
          <p className="text-barber-dark/80 max-w-2xl mx-auto">
            Venha nos visitar e conheça nosso espaço dedicado ao seu estilo e bem-estar.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-6 rounded-lg shadow-md vintage-border">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1972080562456!2d-46.65412708502399!3d-23.56388118468454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Barbearia"
                className="rounded-lg"
              ></iframe>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-barber-light/50 p-4 rounded-lg">
                <h3 className="font-bold text-barber-primary mb-2 text-lg">Endereço</h3>
                <p className="text-barber-dark">
                  Av. Paulista, 1000<br />
                  Bela Vista, São Paulo - SP<br />
                  CEP: 01310-100
                </p>
              </div>
              
              <div className="bg-barber-light/50 p-4 rounded-lg">
                <h3 className="font-bold text-barber-primary mb-2 text-lg">Horário de Funcionamento</h3>
                <p className="text-barber-dark">
                  Segunda - Sexta: 9h às 19h<br />
                  Sábado: 9h às 18h<br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-barber-dark text-xl mb-4">Entre em Contato</h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-barber-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-barber-dark">Telefone</h4>
                  <a href="tel:+551199999999" className="text-barber-primary hover:text-barber-accent transition-colors">
                    (11) 9999-9999
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-barber-primary flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-barber-dark">Email</h4>
                  <a href="mailto:contato@navalhadigital.com" className="text-barber-primary hover:text-barber-accent transition-colors">
                    contato@navalhadigital.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-barber-dark text-barber-light p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-6 text-barber-secondary">Envie uma Mensagem</h3>
              
              <form>
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="Nome" 
                    className="w-full px-4 py-2 rounded bg-barber-dark border border-barber-light/30 text-barber-light focus:outline-none focus:ring-2 focus:ring-barber-secondary"
                  />
                </div>
                
                <div className="mb-4">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-4 py-2 rounded bg-barber-dark border border-barber-light/30 text-barber-light focus:outline-none focus:ring-2 focus:ring-barber-secondary"
                  />
                </div>
                
                <div className="mb-4">
                  <textarea 
                    placeholder="Mensagem" 
                    rows={4}
                    className="w-full px-4 py-2 rounded bg-barber-dark border border-barber-light/30 text-barber-light focus:outline-none focus:ring-2 focus:ring-barber-secondary"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 bg-barber-secondary text-barber-dark rounded hover:bg-barber-secondary/90 transition-colors font-medium"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

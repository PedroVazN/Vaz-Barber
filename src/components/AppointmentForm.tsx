
import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const barbers = [
  { id: 1, name: 'Ricardo Alves' },
  { id: 2, name: 'Carlos Mendes' },
  { id: 3, name: 'Fernando Costa' }
];

const services = [
  { id: 1, name: 'Corte Clássico', duration: '30 min', price: 'R$ 45' },
  { id: 2, name: 'Barba Completa', duration: '25 min', price: 'R$ 35' },
  { id: 3, name: 'Combo Barba e Cabelo', duration: '50 min', price: 'R$ 70' },
  { id: 4, name: 'Corte Degradê', duration: '35 min', price: 'R$ 55' },
  { id: 5, name: 'Hot Towel Shave', duration: '30 min', price: 'R$ 40' },
  { id: 6, name: 'Tratamento Capilar', duration: '40 min', price: 'R$ 60' }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];

const AppointmentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    barber: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if all fields are filled
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    
    if (isFormValid) {
      // Form submission logic would go here in a real application
      console.log('Form submitted:', formData);
      
      // Show success message
      toast({
        title: "Agendamento realizado!",
        description: `Seu horário foi agendado para ${formData.date} às ${formData.time}`,
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        service: '',
        barber: ''
      });
    } else {
      // Show error message
      toast({
        title: "Erro no agendamento",
        description: "Por favor, preencha todos os campos do formulário",
        variant: "destructive",
      });
    }
  };
  
  // Calculate tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="appointment" className="py-20 bg-barber-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-barber-dark">
            <span className="brush-underline">Agende seu Horário</span>
          </h2>
          <p className="text-barber-dark/80 max-w-2xl mx-auto">
            Reserve um horário com nossos especialistas e garanta um atendimento personalizado 
            para realçar seu estilo.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 bg-barber-dark p-8 flex items-center justify-center">
                <div className="text-center text-barber-light">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-barber-secondary" />
                  <h3 className="text-2xl font-bold mb-2">Horário de Funcionamento</h3>
                  <div className="space-y-2 mt-6">
                    <p className="flex justify-between border-b border-barber-secondary/30 pb-1">
                      <span>Segunda - Sexta:</span>
                      <span>9:00 - 19:00</span>
                    </p>
                    <p className="flex justify-between border-b border-barber-secondary/30 pb-1">
                      <span>Sábado:</span>
                      <span>9:00 - 18:00</span>
                    </p>
                    <p className="flex justify-between border-b border-barber-secondary/30 pb-1">
                      <span>Domingo:</span>
                      <span>Fechado</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 p-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-barber-dark mb-1">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-barber-primary" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 w-full rounded-md border border-barber-accent/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                          placeholder="Seu nome"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-barber-dark mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-barber-accent/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-barber-dark mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-barber-accent/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                        placeholder="seu@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-barber-dark mb-1">
                        Serviço
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Scissors className="h-5 w-5 text-barber-primary" />
                        </div>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="pl-10 w-full rounded-md border border-barber-accent/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                        >
                          <option value="">Selecione um serviço</option>
                          {services.map(service => (
                            <option key={service.id} value={service.name}>
                              {service.name} - {service.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="barber" className="block text-sm font-medium text-barber-dark mb-1">
                        Barbeiro
                      </label>
                      <select
                        id="barber"
                        name="barber"
                        value={formData.barber}
                        onChange={handleChange}
                        className="w-full rounded-md border border-barber-accent/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                      >
                        <option value="">Selecione um barbeiro</option>
                        {barbers.map(barber => (
                          <option key={barber.id} value={barber.name}>
                            {barber.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-barber-dark mb-1">
                        Data
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-barber-primary" />
                        </div>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          min={minDate}
                          value={formData.date}
                          onChange={handleChange}
                          className="pl-10 w-full rounded-md border border-barber-accent/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-barber-dark mb-1">
                        Horário
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-barber-primary" />
                        </div>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="pl-10 w-full rounded-md border border-barber-accent/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                        >
                          <option value="">Selecione um horário</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-8 py-3 bg-barber-primary text-barber-light rounded-md hover:bg-barber-accent transition-colors font-medium"
                    >
                      Confirmar Agendamento
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;

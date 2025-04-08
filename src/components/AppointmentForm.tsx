
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Scissors, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseData } from '@/hooks/use-supabase-data';

interface Barber {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

const AppointmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { data: barbers, isLoading: loadingBarbers } = useSupabaseData<Barber>({
    tableName: 'barbers',
    orderBy: { column: 'name' }
  });
  
  const { data: services, isLoading: loadingServices } = useSupabaseData<Service>({
    tableName: 'services',
    orderBy: { column: 'name' }
  });
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    barber: ''
  });
  
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generate available time slots
  useEffect(() => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 19; // 7 PM
    const interval = 30; // 30 minutes
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    
    setTimeSlots(slots);
  }, []);
  
  // Fetch booked slots when date or barber changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date || !formData.barber) return;
      
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('appointment_date', formData.date)
        .eq('barber_id', formData.barber);
      
      if (error) {
        console.error('Error fetching booked slots:', error);
        return;
      }
      
      const bookedTimes = data?.map(slot => slot.appointment_time.slice(0, 5)) || [];
      setBookedSlots(bookedTimes);
    };
    
    fetchBookedSlots();
  }, [formData.date, formData.barber]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    
    if (!isFormValid) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, preencha todos os campos do formulário",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Insert appointment data into Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            client_name: formData.name,
            client_phone: formData.phone,
            client_email: formData.email,
            appointment_date: formData.date,
            appointment_time: formData.time,
            barber_id: formData.barber,
            service_id: formData.service
          }
        ])
        .select();
        
      if (error) throw error;
      
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
      
      // Navigate to the barber schedule page
      navigate('/agenda');
      
    } catch (error) {
      console.error('Error submitting appointment:', error);
      let errorMessage = "Erro ao realizar agendamento. Tente novamente.";
      
      if (error instanceof Error) {
        // Check if it's a conflict error (same barber, date, time)
        if (error.message.includes('unique_barber_time')) {
          errorMessage = "Este horário já está ocupado. Por favor, escolha outro.";
        }
      }
      
      toast({
        title: "Erro no agendamento",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const getServicePrice = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? `R$ ${service.price.toFixed(2)}` : '';
  };

  const getServiceDuration = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? `${service.duration} min` : '';
  };

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
          <Link to="/agenda" className="inline-block mt-4 text-barber-primary hover:text-barber-accent transition-colors">
            Ver agenda completa do barbeiro →
          </Link>
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
                          disabled={loadingServices}
                        >
                          <option value="">Selecione um serviço</option>
                          {services.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.name} - R$ {service.price.toFixed(2)}
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
                        disabled={loadingBarbers}
                      >
                        <option value="">Selecione um barbeiro</option>
                        {barbers.map(barber => (
                          <option key={barber.id} value={barber.id}>
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
                          disabled={!formData.date || !formData.barber}
                        >
                          <option value="">Selecione um horário</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time} disabled={bookedSlots.includes(time)}>
                              {time} {bookedSlots.includes(time) ? '(Ocupado)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-8 py-3 bg-barber-primary text-barber-light rounded-md hover:bg-barber-accent transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processando...' : 'Confirmar Agendamento'}
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

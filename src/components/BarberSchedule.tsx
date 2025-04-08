
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Clock, Users } from 'lucide-react';

// Sample appointments data (in a real app, this would come from a database)
const sampleAppointments = [
  { id: 1, clientName: 'João Silva', service: 'Corte Clássico', date: new Date(2025, 3, 10, 10, 0), duration: 30 },
  { id: 2, clientName: 'Ricardo Pereira', service: 'Barba Completa', date: new Date(2025, 3, 10, 14, 30), duration: 25 },
  { id: 3, clientName: 'Antônio Santos', service: 'Combo Barba e Cabelo', date: new Date(2025, 3, 11, 11, 0), duration: 50 },
  { id: 4, clientName: 'Marcos Oliveira', service: 'Corte Degradê', date: new Date(2025, 3, 12, 15, 0), duration: 35 },
  { id: 5, clientName: 'Felipe Costa', service: 'Hot Towel Shave', date: new Date(2025, 3, 12, 16, 30), duration: 30 },
];

const barbers = [
  { id: 1, name: 'Ricardo Alves' },
  { id: 2, name: 'Carlos Mendes' },
  { id: 3, name: 'Fernando Costa' }
];

const BarberSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedBarber, setSelectedBarber] = useState(1);
  
  // Filter appointments for the selected date and barber
  const getAppointmentsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return sampleAppointments.filter(appointment => {
      const appDate = new Date(appointment.date);
      return appDate.getDate() === date.getDate() &&
             appDate.getMonth() === date.getMonth() &&
             appDate.getFullYear() === date.getFullYear();
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  
  const appointmentsForSelectedDate = getAppointmentsForDate(selectedDate);
  
  // Function to check if date has appointments
  const hasAppointments = (date: Date) => {
    return sampleAppointments.some(appointment => {
      const appDate = new Date(appointment.date);
      return appDate.getDate() === date.getDate() &&
             appDate.getMonth() === date.getMonth() &&
             appDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Get availability times for the selected date
  const getAvailabilityTimes = () => {
    const times = [];
    const startHour = 9; // 9 AM
    const endHour = 19; // 7 PM
    const interval = 30; // 30 minutes
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isBooked = appointmentsForSelectedDate.some(appointment => {
          const appTime = formatTime(appointment.date);
          return appTime === timeStr;
        });
        
        times.push({ 
          time: timeStr, 
          isBooked 
        });
      }
    }
    
    return times;
  };
  
  const availableTimes = getAvailabilityTimes();
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-barber-dark">
            <span className="brush-underline">Agenda do Barbeiro</span>
          </h2>
          <p className="text-barber-dark/80 max-w-2xl mx-auto">
            Visualize todos os agendamentos e horários disponíveis para facilitar a organização da sua barbearia.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-barber-primary/20 shadow-md h-full">
              <CardHeader className="bg-barber-dark text-barber-light rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-barber-secondary" />
                  Calendário
                </CardTitle>
                <CardDescription className="text-barber-light/80">
                  Selecione uma data para ver os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border p-3 pointer-events-auto"
                  modifiers={{
                    booked: (date) => hasAppointments(date),
                  }}
                  modifiersClassNames={{
                    booked: "bg-barber-secondary/30 text-barber-dark font-bold",
                  }}
                />
              </CardContent>
              <CardFooter className="bg-barber-dark/5 p-4 flex flex-col items-start border-t">
                <div className="flex items-center gap-1 text-sm mb-2">
                  <div className="w-4 h-4 rounded-full bg-barber-secondary/30"></div>
                  <span>Agendamentos existentes</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="w-4 h-4 rounded-full bg-barber-primary"></div>
                  <span>Data selecionada</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-barber-primary/20 shadow-md h-full">
              <CardHeader className="bg-barber-dark text-barber-light rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-barber-secondary" />
                    {selectedDate ? (
                      <span>
                        Agendamentos para{' '}
                        {selectedDate.toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </CardTitle>
                  
                  <select 
                    className="bg-barber-dark text-barber-light border-barber-secondary/50 rounded px-2 py-1 text-sm"
                    value={selectedBarber}
                    onChange={(e) => setSelectedBarber(Number(e.target.value))}
                  >
                    {barbers.map(barber => (
                      <option key={barber.id} value={barber.id}>
                        {barber.name}
                      </option>
                    ))}
                  </select>
                </div>
                <CardDescription className="text-barber-light/80">
                  Visualize e gerencie os agendamentos do dia
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4">
                {appointmentsForSelectedDate.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-barber-dark">Horário</TableHead>
                          <TableHead className="text-barber-dark">Cliente</TableHead>
                          <TableHead className="text-barber-dark">Serviço</TableHead>
                          <TableHead className="text-barber-dark">Duração</TableHead>
                          <TableHead className="text-barber-dark text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointmentsForSelectedDate.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              {formatTime(appointment.date)}
                            </TableCell>
                            <TableCell>{appointment.clientName}</TableCell>
                            <TableCell>{appointment.service}</TableCell>
                            <TableCell>{appointment.duration} min</TableCell>
                            <TableCell className="text-right">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-barber-primary hover:bg-barber-primary hover:text-barber-light"
                                  >
                                    Detalhes
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Detalhes do Agendamento</DialogTitle>
                                    <DialogDescription>
                                      Informações completas sobre o agendamento
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Cliente</span>
                                        <span className="text-barber-dark font-semibold">{appointment.clientName}</span>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Serviço</span>
                                        <span className="text-barber-dark font-semibold">{appointment.service}</span>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Duração</span>
                                        <span className="text-barber-dark font-semibold">{appointment.duration} min</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <span className="text-sm font-medium text-muted-foreground">Data e Hora</span>
                                      <span className="text-barber-dark font-semibold">
                                        {appointment.date.toLocaleDateString('pt-BR', {
                                          weekday: 'long',
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric'
                                        })} às {formatTime(appointment.date)}
                                      </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <span className="text-sm font-medium text-muted-foreground">Barbeiro</span>
                                      <span className="text-barber-dark font-semibold">
                                        {barbers.find(b => b.id === selectedBarber)?.name}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="outline" 
                                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    >
                                      Cancelar Agendamento
                                    </Button>
                                    <Button className="bg-barber-primary text-barber-light hover:bg-barber-secondary">
                                      Confirmar
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-barber-dark/5 rounded-md">
                    <Clock className="w-10 h-10 mx-auto mb-2 text-barber-primary/60" />
                    <h3 className="text-xl font-semibold text-barber-dark mb-1">Sem Agendamentos</h3>
                    <p className="text-barber-dark/70">
                      Não há agendamentos para esta data. Todos os horários estão disponíveis.
                    </p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="bg-barber-dark/5 p-4 border-t">
                <div className="w-full">
                  <h3 className="font-medium text-barber-dark mb-2 flex items-center gap-1">
                    <Clock className="h-4 w-4 text-barber-primary" />
                    Disponibilidade de Horários
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
                    {availableTimes.map((slot, index) => (
                      <div 
                        key={index}
                        className={`text-center px-2 py-1 rounded-md border text-sm font-medium ${
                          slot.isBooked 
                            ? 'bg-barber-primary/10 text-barber-primary/50 border-barber-primary/30' 
                            : 'bg-barber-light border-barber-secondary/30 text-barber-dark hover:bg-barber-secondary/20 cursor-pointer'
                        }`}
                      >
                        {slot.time}
                      </div>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BarberSchedule;

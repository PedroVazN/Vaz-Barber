
import React, { useState, useEffect } from 'react';
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
import { CalendarDays, Clock, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

interface Appointment {
  id: string;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  barber_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
  service?: Service;
}

const BarberSchedule = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<{ time: string; isBooked: boolean }[]>([]);

  // Fetch barbers from Supabase
  const { data: barbers } = useSupabaseData<Barber>({
    tableName: 'barbers',
    orderBy: { column: 'name' }
  });

  // Fetch services from Supabase
  const { data: services } = useSupabaseData<Service>({
    tableName: 'services'
  });

  useEffect(() => {
    // Set default barber when data loads
    if (barbers.length > 0 && !selectedBarber) {
      setSelectedBarber(barbers[0].id);
    }
  }, [barbers, selectedBarber]);

  // Subscribe to changes in the appointments table
  useEffect(() => {
    const appointmentsChannel = supabase
      .channel('appointments-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'appointments'
      }, () => {
        // When changes occur, refresh the appointments data
        fetchAppointmentsForDate();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(appointmentsChannel);
    };
  }, [selectedDate, selectedBarber]);

  // Fetch appointments when selected date or barber changes
  useEffect(() => {
    if (selectedDate && selectedBarber) {
      fetchAppointmentsForDate();
    }
  }, [selectedDate, selectedBarber]);

  // Generate available time slots
  useEffect(() => {
    updateAvailableTimes();
  }, [appointments]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const updateAvailableTimes = () => {
    const times = [];
    const startHour = 9; // 9 AM
    const endHour = 19; // 7 PM
    const interval = 30; // 30 minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isBooked = appointments.some(appointment => {
          return appointment.appointment_time.slice(0, 5) === timeStr;
        });

        times.push({
          time: timeStr,
          isBooked
        });
      }
    }

    setAvailableTimes(times);
  };

  const fetchAppointmentsForDate = async () => {
    if (!selectedDate || !selectedBarber) return;

    setIsLoading(true);

    try {
      const dateString = selectedDate.toISOString().split('T')[0];

      // Fetch appointments for the selected date and barber
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          service:service_id (
            name,
            duration,
            price
          )
        `)
        .eq('appointment_date', dateString)
        .eq('barber_id', selectedBarber)
        .order('appointment_time');

      if (error) throw error;

      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Erro ao carregar agendamentos",
        description: "Não foi possível carregar os agendamentos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) throw error;

      toast({
        title: "Agendamento cancelado",
        description: "O agendamento foi cancelado com sucesso.",
        variant: "default",
      });

      // The subscription will automatically trigger a refresh
    } catch (error) {
      console.error('Error canceling appointment:', error);
      toast({
        title: "Erro ao cancelar",
        description: "Não foi possível cancelar o agendamento.",
        variant: "destructive",
      });
    }
  };

  // Check if a date has appointments
  const hasAppointments = async (date: Date) => {
    if (!selectedBarber) return false;

    const dateString = date.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('appointments')
      .select('id')
      .eq('appointment_date', dateString)
      .eq('barber_id', selectedBarber)
      .limit(1);

    if (error) {
      console.error('Error checking appointments:', error);
      return false;
    }

    return (data && data.length > 0);
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

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
                    onChange={(e) => setSelectedBarber(e.target.value)}
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
                {isLoading ? (
                  <div className="text-center p-8">
                    <Loader2 className="w-10 h-10 mx-auto mb-2 text-barber-primary animate-spin" />
                    <p>Carregando agendamentos...</p>
                  </div>
                ) : appointments.length > 0 ? (
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
                        {appointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              {formatTime(appointment.appointment_time)}
                            </TableCell>
                            <TableCell>{appointment.client_name}</TableCell>
                            <TableCell>{appointment.service?.name}</TableCell>
                            <TableCell>{appointment.service?.duration} min</TableCell>
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
                                        <span className="text-barber-dark font-semibold">{appointment.client_name}</span>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Serviço</span>
                                        <span className="text-barber-dark font-semibold">{appointment.service?.name}</span>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Duração</span>
                                        <span className="text-barber-dark font-semibold">{appointment.service?.duration} min</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <span className="text-sm font-medium text-muted-foreground">Data e Hora</span>
                                      <span className="text-barber-dark font-semibold">
                                        {formatDate(appointment.appointment_date)} às {formatTime(appointment.appointment_time)}
                                      </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <span className="text-sm font-medium text-muted-foreground">Contato</span>
                                      <span className="text-barber-dark font-semibold">
                                        {appointment.client_phone}
                                        {appointment.client_email && ` - ${appointment.client_email}`}
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
                                      onClick={() => handleCancelAppointment(appointment.id)}
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
                        className={`text-center px-2 py-1 rounded-md border text-sm font-medium ${slot.isBooked
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


import React from 'react';
import Header from '@/components/Header';
import BarberSchedule from '@/components/BarberSchedule';
import Footer from '@/components/Footer';

const BarberSchedulePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="pt-20 bg-barber-dark text-barber-light py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Agenda do Barbeiro</h1>
            <p className="text-barber-light/80 max-w-2xl mx-auto">
              Gerencie seus agendamentos e visualize sua disponibilidade de horários.
            </p>
          </div>
        </div>
        <BarberSchedule />
      </main>
      <Footer />
    </div>
  );
};

export default BarberSchedulePage;


import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Barbers from '../components/Barbers';
import AppointmentForm from '../components/AppointmentForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Barbers />
        <AppointmentForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

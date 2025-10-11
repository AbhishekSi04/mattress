import React from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import MattressForm from './components/MattressForm';
import TestimonialsSection from './components/TestimonialsSection';
import SleepExpertise from './components/SleepExpertise';
import InfluencerCollab from './components/InfluencerCollab';
import ReferralProgram from './components/ReferralProgram';
// import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <ProductShowcase />
        <TestimonialsSection />
        <MattressForm />
         <SleepExpertise />
        <InfluencerCollab />
         <ReferralProgram />
         {/* <ContactCTA /> */}
      </main>
      <Footer />
    </>
  );
}
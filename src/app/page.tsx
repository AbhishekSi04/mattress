import React from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import SleepQuizPreview from './components/SleepQuizPreview';
import TestimonialsSection from './components/TestimonialsSection';
import SleepExpertise from './components/SleepExpertise';
import TrustBadges from './components/TrustBadges';
import InfluencerCollab from './components/InfluencerCollab';
import ReferralProgram from './components/ReferralProgram';
import ContactCTA from './components/ContactCTA';
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
        <SleepQuizPreview />
        <SleepExpertise />
        <InfluencerCollab />
        <ReferralProgram />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
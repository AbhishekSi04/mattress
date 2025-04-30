import React from 'react';
import Hero from './components/Hero';
import MattressBuilderPreview from './components/MattressBuilderPreview';
import SleepQuizPreview from './components/SleepQuizPreview';
import UGCSection from './components/UGCSection';
import InfluencerCollab from './components/InfluencerCollab';
import ReferralProgram from './components/ReferralProgram';

export default function Home() {
  return (
    <main>
      <Hero />
      <MattressBuilderPreview />
      <SleepQuizPreview />
      <UGCSection />
      <InfluencerCollab />
      <ReferralProgram />
    </main>
  );
}
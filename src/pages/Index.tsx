
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import VideoSection from '@/components/home/VideoSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Footer from '@/components/home/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;

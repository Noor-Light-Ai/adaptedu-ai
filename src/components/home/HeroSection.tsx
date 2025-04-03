
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCounter from './AnimatedCounter';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-32 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className={`max-w-2xl transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full inline-flex items-center text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Transform Your Content into Engaging Courses
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="hero-gradient">AI-Powered</span> Course Creation Assistant
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Convert your PDFs and content into structured, engaging courses with the power of AI. Create professional learning experiences in minutes, not hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/create">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="gap-2">
                <Link to="/dashboard">
                  View Courses
                  <BookOpen className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <AnimatedCounter initialCount={1765329} isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

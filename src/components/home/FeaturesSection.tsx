
import { useState, useEffect, useRef } from 'react';
import { FileText, RotateCcw, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isScrollVisible = useScrollAnimation(sectionRef);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const animationVisible = isVisible || isScrollVisible;

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      title: "Upload Your Content",
      description: "Upload your PDF files containing the raw material for your course creation.",
      delay: 0,
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-indigo-500" />,
      title: "AI Processes & Structures",
      description: "Our AI analyzes your content and generates a structured course with chapters, quizzes, and assignments.",
      delay: 100,
    },
    {
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
      title: "Publish & Share",
      description: "Review, customize if needed, and publish your course with AI voice narration for enhanced learning.",
      delay: 200,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${animationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-4">How AdaptEdU Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            A simple three-step process to transform your content into engaging educational experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
              animationVisible={animationVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

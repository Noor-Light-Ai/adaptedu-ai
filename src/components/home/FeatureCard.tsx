
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
  animationVisible: boolean;
}

const FeatureCard = ({ icon, title, description, delay, animationVisible }: FeatureCardProps) => {
  return (
    <Card className={`border-none shadow-md overflow-hidden transition-all duration-700 delay-${delay} transform ${animationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;

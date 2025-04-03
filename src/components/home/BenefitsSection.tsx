
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Lightbulb, FileText, Award, ChevronRight } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: "Save Time",
      description: "Convert hours of manual work into minutes of automated course creation.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-emerald-500" />,
      title: "Enhanced Learning",
      description: "AI structures content for optimal learning with built-in assessments.",
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      title: "Content Flexibility",
      description: "Works with your existing PDF materials without reformatting.",
    },
    {
      icon: <Award className="h-6 w-6 text-purple-500" />,
      title: "Professional Results",
      description: "Generate polished, engaging courses that look professionally designed.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose AdaptEdU</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Create professional learning experiences without the complexity and time investment
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 shadow-sm h-full">
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/create">
              Start Creating Your Course
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

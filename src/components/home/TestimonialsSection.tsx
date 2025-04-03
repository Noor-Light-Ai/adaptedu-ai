
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Professor of Biology, Stanford University",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      quote: "AdaptEdU transformed my dense research papers into engaging courses that my students actually enjoy. The AI-generated quizzes save me hours of preparation time.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Corporate Trainer, Tech Innovations Inc.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      quote: "Our training materials were outdated and boring. With AdaptEdU, we converted our PDFs into interactive courses with voice narration. Employee engagement increased by 78%!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "High School Teacher, Westlake Academy",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      quote: "As a teacher with limited tech skills, I was amazed at how easy it was to create professional courses. My history lessons are now multimedia experiences my students love.",
      rating: 4,
    },
    {
      name: "David Thompson",
      role: "Online Course Creator",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      quote: "I was spending 40+ hours creating each course. AdaptEdU reduced that to just a few hours and the AI structuring actually improved my content organization.",
      rating: 5,
    },
    {
      name: "Jennifer Park",
      role: "L&D Director, Global Finance Corp",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      quote: "Our compliance training used to be painfully dry. AdaptEdU helped us transform regulatory documents into engaging modules with automatic assessment tools.",
      rating: 4,
    },
    {
      name: "Robert Chambers",
      role: "Educational Content Publisher",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      quote: "The voice narration feature is game-changing. Our materials are now accessible to learners with different needs, and the natural-sounding AI voices are impressive.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Educators and content creators are transforming their learning materials with AdaptEdU
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 flex-grow">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300 dark:text-gray-600'}`} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/create">
              Join Our Community
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, RotateCcw, Zap, Lightbulb, FileText, Award, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(1765329);

  useEffect(() => {
    setIsVisible(true);

    // Increment counter every 2 seconds for animation effect
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Format counter with commas
  const formattedCount = count.toLocaleString('en-US');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
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

              {/* Animated Counter */}
              <div className={`mt-8 text-lg text-gray-600 dark:text-gray-300 transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xl mr-2">{formattedCount}</span>
                  <span>Courses Adapted and still counting</span>
                </div>
              </div>
            </div>
            
            {/* Removed the vertical rectangle with upload sign */}
          </div>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">See AdaptEdU in Action</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Watch this short video to understand how AdaptEdU works and how it can transform your content
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl cursor-pointer group">
                <img 
                  src="https://img.youtube.com/vi/YlTbv09no7M/maxresdefault.jpg" 
                  alt="AdaptEdU Video Thumbnail" 
                  className="w-full aspect-video object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/70 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <Play className="h-6 w-6 text-blue-500 group-hover:text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-medium">AdaptEdU Explainer Video</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black">
              <div className="w-full aspect-video">
                <iframe 
                  src="https://www.youtube.com/embed/YlTbv09no7M?autoplay=1" 
                  title="AdaptEdU Explainer Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How AdaptEdU Works</h2>
            <p className="text-gray-600 dark:text-gray-300">
              A simple three-step process to transform your content into engaging educational experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload className="h-6 w-6 text-blue-500" />,
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
            ].map((feature, index) => (
              <Card key={index} className={`border-none shadow-md overflow-hidden transition-all duration-700 delay-${feature.delay} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose AdaptEdU</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Create professional learning experiences without the complexity and time investment
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
            ].map((benefit, index) => (
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
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Educators and content creators are transforming their learning materials with AdaptEdU
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, index) => (
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
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 dark:bg-gray-900/30 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
                AdaptEdU
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Transform your content into engaging learning experiences
              </p>
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                Home
              </Link>
              <Link to="/create" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                Create
              </Link>
              <Link to="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AdaptEdU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

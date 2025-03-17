
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Upload, BookOpen, FileText, RotateCcw, Zap, Lightbulb, Award, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
            </div>
            
            <div className={`relative transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-full h-full max-w-sm">
                <div className="glass-panel p-8 rounded-2xl relative z-10">
                  <div className="flex items-center justify-center w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
                    <Upload className="h-10 w-10 text-blue-500/50" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <div className="h-9 bg-blue-500 rounded-md w-1/2"></div>
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                  </div>
                </div>
                <div className="absolute top-6 right-6 w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl border border-white/20 dark:border-white/5 -z-10"></div>
                <div className="absolute top-12 right-12 w-full h-full bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl border border-white/10 dark:border-white/5 -z-20"></div>
              </div>
            </div>
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

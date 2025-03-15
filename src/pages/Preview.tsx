
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header';
import CoursePreview, { CourseSection } from '@/components/CoursePreview';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mock course data for the preview page
const mockCourseData = {
  "1": {
    title: "Introduction to Machine Learning Concepts",
    description: "A beginner-friendly guide to understanding the fundamentals of machine learning, including key algorithms, practical applications, and implementation basics.",
    coverImage: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop",
    estimatedDuration: "1.5 hours",
    learningObjectives: [
      "Understand the core concepts and terminology of machine learning",
      "Identify different types of machine learning algorithms and their use cases",
      "Recognize how machine learning is applied in real-world situations",
      "Develop a basic understanding of the machine learning workflow"
    ],
    sections: [
      {
        id: "s1",
        type: "header",
        content: "Introduction to Machine Learning"
      },
      {
        id: "s2",
        type: "paragraph",
        content: "Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. The focus is on developing computer programs that can access data and use it to learn for themselves."
      },
      {
        id: "s3",
        type: "paragraph",
        content: "The process of learning begins with observations or data, such as examples, direct experience, or instruction. It looks for patterns in data so that later decisions can be made based on the examples that we provide. The primary aim is to allow computers to learn automatically without human intervention or assistance and adjust actions accordingly."
      },
      {
        id: "s4",
        type: "header",
        content: "Types of Machine Learning"
      },
      {
        id: "s5",
        type: "subheader",
        content: "Supervised Learning"
      },
      {
        id: "s6",
        type: "paragraph",
        content: "Supervised learning is where you have input variables (x) and an output variable (y) and you use an algorithm to learn the mapping function from the input to the output. The goal is to approximate the mapping function so well that when you have new input data (x), you can predict the output variables (y) for that data."
      },
      {
        id: "s7",
        type: "image",
        content: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: "s8",
        type: "subheader",
        content: "Unsupervised Learning"
      },
      {
        id: "s9",
        type: "paragraph",
        content: "Unsupervised learning is where you only have input data (x) and no corresponding output variables. The goal for unsupervised learning is to model the underlying structure or distribution in the data in order to learn more about the data."
      },
      {
        id: "s10",
        type: "quiz",
        content: "Which type of machine learning uses labeled data to train algorithms?",
        options: [
          "Unsupervised Learning",
          "Supervised Learning",
          "Reinforcement Learning",
          "Semi-supervised Learning"
        ],
        answer: 1
      }
    ]
  },
  "2": {
    title: "Digital Marketing for Small Business",
    description: "Learn effective digital marketing strategies tailored for small businesses to maximize online presence and customer acquisition.",
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
    estimatedDuration: "2 hours",
    learningObjectives: [
      "Develop a comprehensive digital marketing strategy for small businesses",
      "Learn how to optimize social media presence for maximum engagement",
      "Understand SEO fundamentals and how to improve website visibility",
      "Learn cost-effective advertising techniques for limited budgets"
    ],
    sections: [
      {
        id: "s1",
        type: "header",
        content: "Introduction to Digital Marketing"
      },
      {
        id: "s2",
        type: "paragraph",
        content: "Digital marketing encompasses all marketing efforts that use electronic devices or the internet. Businesses leverage digital channels such as search engines, social media, email, and websites to connect with current and prospective customers."
      },
      {
        id: "s3",
        type: "paragraph",
        content: "For small businesses, digital marketing offers a cost-effective way to reach targeted audiences and compete with larger companies. With the right strategy, even businesses with limited budgets can achieve significant results and growth."
      },
      {
        id: "s4",
        type: "header",
        content: "Social Media Marketing"
      },
      {
        id: "s5",
        type: "paragraph",
        content: "Social media platforms provide small businesses with powerful tools to connect with customers, increase brand awareness, and drive sales. Different platforms serve different purposes and audiences, so it's important to choose the right ones for your business."
      },
      {
        id: "s6",
        type: "quiz",
        content: "Which of the following is NOT a major benefit of social media marketing for small businesses?",
        options: [
          "Increased brand awareness",
          "Higher conversion rates",
          "Guaranteed immediate ROI",
          "Improved customer engagement"
        ],
        answer: 2
      }
    ]
  },
  "3": {
    title: "Web Development Fundamentals",
    description: "Master the essential concepts and technologies behind modern web development, from HTML and CSS to JavaScript and responsive design.",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
    estimatedDuration: "2.5 hours",
    learningObjectives: [
      "Understand the fundamentals of HTML, CSS, and JavaScript",
      "Learn how to create responsive websites that work on all devices",
      "Gain practical experience with modern web development tools",
      "Build a complete web project from scratch"
    ],
    sections: [
      {
        id: "s1",
        type: "header",
        content: "Introduction to Web Development"
      },
      {
        id: "s2",
        type: "paragraph",
        content: "Web development is the work involved in developing a website for the internet or an intranet. It ranges from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services."
      },
      {
        id: "s3",
        type: "image",
        content: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop"
      },
      {
        id: "s4",
        type: "header",
        content: "HTML Basics"
      },
      {
        id: "s5",
        type: "paragraph",
        content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages, using various tags and attributes to format text, images, and other material."
      },
      {
        id: "s6",
        type: "assignment",
        content: "Create a simple HTML page that includes a header, paragraph, image, and a list of items. Submit your code and a screenshot of the rendered page."
      }
    ]
  }
};

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = course ? `${course.title} | AdaptEdU` : 'Course Preview | AdaptEdU';
  }, [course]);

  useEffect(() => {
    if (id) {
      // In a real app, this would fetch from an API
      // For now, we're using mock data
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const courseData = mockCourseData[id as keyof typeof mockCourseData];
        
        if (courseData) {
          setCourse(courseData);
        } else {
          toast.error('Course not found');
          navigate('/dashboard');
        }
        
        setLoading(false);
      }, 800);
    }
  }, [id, navigate]);

  const handlePublish = () => {
    toast.success('Course published successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <div className="container max-w-6xl mx-auto pt-28 px-6">
        <div className="mb-6">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Preview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Course Preview
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Review your course before publishing
          </p>
        </div>
        
        {loading ? (
          <div className="h-[600px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading course...</p>
            </div>
          </div>
        ) : course ? (
          <CoursePreview 
            course={course} 
            useTts={true}
            onPublish={handlePublish}
          />
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">Course not found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;

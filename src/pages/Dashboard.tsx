
import { useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { CourseSection } from '@/components/CoursePreview';

// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Machine Learning Concepts',
    description: 'A beginner-friendly guide to understanding the fundamentals of machine learning, including key algorithms, practical applications, and implementation basics.',
    coverImage: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop',
    createdAt: 'May 15, 2023',
    duration: '1.5 hours',
    sections: 15
  },
  {
    id: '2',
    title: 'Digital Marketing for Small Business',
    description: 'Learn effective digital marketing strategies tailored for small businesses to maximize online presence and customer acquisition.',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop',
    createdAt: 'June 2, 2023',
    duration: '2 hours',
    sections: 12
  },
  {
    id: '3',
    title: 'Web Development Fundamentals',
    description: 'Master the essential concepts and technologies behind modern web development, from HTML and CSS to JavaScript and responsive design.',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop',
    createdAt: 'July 10, 2023',
    duration: '2.5 hours',
    sections: 18
  }
];

const DashboardPage = () => {
  useEffect(() => {
    document.title = 'Dashboard | AdaptEdU';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-6">
        <Dashboard courses={mockCourses} />
      </main>
    </div>
  );
};

export default DashboardPage;

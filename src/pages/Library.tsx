
import { useEffect } from 'react';
import Header from '@/components/Header';
import Library from '@/components/Library';

// Mock data for courses with one trending course
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Machine Learning Concepts',
    description: 'A beginner-friendly guide to understanding the fundamentals of machine learning, including key algorithms, practical applications, and implementation basics.',
    coverImage: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop',
    createdAt: 'May 15, 2023',
    duration: '1.5 hours',
    sections: 15,
    trending: true
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
  },
  {
    id: '4',
    title: 'Data Science and Analytics',
    description: 'Dive into the world of data science with practical exercises in Python, statistical analysis, and visualization techniques.',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop',
    createdAt: 'August 5, 2023',
    duration: '3 hours',
    sections: 20
  },
  {
    id: '5',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native framework with hands-on projects and industry best practices.',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop',
    createdAt: 'September 12, 2023',
    duration: '2.5 hours',
    sections: 16
  },
  {
    id: '6',
    title: 'UX/UI Design Principles',
    description: 'Master the art of user experience design with focus on wireframing, prototyping, and user research methodologies.',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop',
    createdAt: 'October 18, 2023',
    duration: '1.8 hours',
    sections: 14
  }
];

const LibraryPage = () => {
  useEffect(() => {
    document.title = 'Library | AdaptEdU';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-6">
        <Library courses={mockCourses} />
      </main>
    </div>
  );
};

export default LibraryPage;

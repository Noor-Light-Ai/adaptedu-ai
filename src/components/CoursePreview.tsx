
import { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookOpen, 
  Clock, 
  Award, 
  Mic,
  Check,
  Play,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CourseSection {
  id: string;
  type: 'header' | 'subheader' | 'paragraph' | 'image' | 'quiz' | 'assignment';
  content: string;
  options?: string[];
  answer?: number;
}

interface CourseData {
  title: string;
  description: string;
  sections: CourseSection[];
  estimatedDuration: string;
  learningObjectives: string[];
  coverImage?: string;
}

interface CoursePreviewProps {
  course: CourseData;
  useTts: boolean;
  onPublish: () => void;
}

const CoursePreview = ({ course, useTts, onPublish }: CoursePreviewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Calculate pages with 3 sections per page (except cover)
  const totalSections = course.sections.length;
  const sectionsPerPage = 3;
  const contentPages = Math.ceil(totalSections / sectionsPerPage);
  const totalPages = contentPages + 1; // +1 for cover page
  
  // Create a mapping of sections to pages for easy reference
  const sectionToPageMap = course.sections.reduce((map, section, index) => {
    // Adding 1 because page 0 is the cover
    const pageNumber = Math.floor(index / sectionsPerPage) + 1;
    map[section.id] = pageNumber;
    return map;
  }, {} as Record<string, number>);
  
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = 0;
    }
    
    // Stop audio playback when changing pages
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, [currentPage]);
  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleAnswerSelect = (sectionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [sectionId]: answerIndex }));
  };
  
  const handleCheckAnswer = (sectionId: string) => {
    setShowAnswers(prev => ({ ...prev, [sectionId]: true }));
  };
  
  const isAnswerCorrect = (sectionId: string) => {
    const section = course.sections.find(s => s.id === sectionId);
    return section?.answer === selectedAnswers[sectionId];
  };

  const handlePlayAudio = async () => {
    try {
      // If already playing, stop the playback
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      
      // Gather text content for the current page
      let textToRead = '';
      
      if (currentPage === 0) {
        // Cover page content
        textToRead = `${course.title}. ${course.description}. Learning objectives: ${course.learningObjectives.join('. ')}`;
      } else {
        // Get sections for this page
        const startIndex = (currentPage - 1) * sectionsPerPage;
        const endIndex = Math.min(startIndex + sectionsPerPage, totalSections);
        const sectionsToRead = course.sections.slice(startIndex, endIndex);
        
        // Only include text content (no quizzes or images)
        textToRead = sectionsToRead
          .filter(section => ['header', 'subheader', 'paragraph'].includes(section.type))
          .map(section => section.content)
          .join('. ');
      }
      
      if (!textToRead) {
        toast.error('No text content to read on this page');
        setIsLoading(false);
        return;
      }
      
      // Call the text-to-speech edge function
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: textToRead,
          voice: 'alloy'
        }
      });
      
      if (error) {
        console.error('TTS error:', error);
        throw new Error(error.message);
      }
      
      if (!data || !data.audioContent) {
        throw new Error('No audio content returned');
      }
      
      // Create audio element and play
      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        toast.error('Failed to play audio');
        setIsPlaying(false);
        setIsLoading(false);
      };
      
      await audio.play();
      setIsPlaying(true);
      
    } catch (error) {
      console.error('TTS error:', error);
      toast.error('Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCoverPage = () => (
    <div className="flex flex-col items-center justify-center text-center min-h-[600px] p-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center gap-6 max-w-2xl">
        {course.coverImage && (
          <img
            src={course.coverImage}
            alt="Course cover"
            className="w-32 h-32 object-cover rounded-xl mb-4"
          />
        )}
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
          {course.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          {course.description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm">
            <Clock className="w-4 h-4 mr-2" />
            {course.estimatedDuration}
          </div>
          <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-sm">
            <BookOpen className="w-4 h-4 mr-2" />
            {course.sections.filter(s => s.type === 'quiz').length} Quizzes
          </div>
          <div className="flex items-center bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full text-sm">
            <Award className="w-4 h-4 mr-2" />
            {course.sections.filter(s => s.type === 'assignment').length} Assignments
          </div>
        </div>
        
        <div className="w-full">
          <h3 className="text-lg font-medium mb-3">Learning Objectives</h3>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {course.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-left">
                    <div className="min-w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContentPage = (pageIndex: number) => {
    // Calculate section indices for this page
    const startIndex = (pageIndex - 1) * sectionsPerPage;
    const endIndex = Math.min(startIndex + sectionsPerPage, totalSections);
    
    // Get sections for this page
    const sectionsToShow = course.sections.slice(startIndex, endIndex);
    
    return (
      <div className="space-y-8 min-h-[600px] p-6 animate-fade-in">
        {sectionsToShow.map((section, index) => (
          <div key={section.id} className="animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
            {renderSection(section)}
          </div>
        ))}
      </div>
    );
  };
  
  const renderSection = (section: CourseSection) => {
    switch (section.type) {
      case 'header':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              {section.content}
            </h2>
          </div>
        );
      case 'subheader':
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {section.content}
            </h3>
          </div>
        );
      case 'paragraph':
        return (
          <div>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {section.content}
            </p>
          </div>
        );
      case 'image':
        return (
          <div className="my-6">
            <img 
              src={section.content} 
              alt="Course illustration" 
              className="rounded-lg max-h-64 mx-auto"
            />
          </div>
        );
      case 'quiz':
        return (
          <Card className="overflow-hidden border-blue-100 dark:border-blue-900/30">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-100 dark:border-blue-900/30">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Knowledge Check
              </h4>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-700 dark:text-gray-200 mb-4">{section.content}</p>
              <div className="space-y-2 mb-4">
                {section.options?.map((option, index) => (
                  <div 
                    key={index}
                    onClick={() => handleAnswerSelect(section.id, index)}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                      ${selectedAnswers[section.id] === index 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }
                      ${showAnswers[section.id] && index === section.answer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : ''
                      }
                      ${showAnswers[section.id] && selectedAnswers[section.id] === index && index !== section.answer
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : ''
                      }
                    `}
                  >
                    <div className={`w-5 h-5 mr-3 rounded-full flex items-center justify-center border
                      ${selectedAnswers[section.id] === index
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 dark:border-gray-600'
                      }
                      ${showAnswers[section.id] && index === section.answer
                        ? 'border-green-500 bg-green-500 text-white'
                        : ''
                      }
                    `}>
                      {selectedAnswers[section.id] === index && (
                        <Check className="w-3 h-3" />
                      )}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{option}</span>
                  </div>
                ))}
              </div>
              
              {selectedAnswers[section.id] !== undefined && !showAnswers[section.id] && (
                <Button 
                  onClick={() => handleCheckAnswer(section.id)}
                  variant="outline"
                  className="mt-2"
                >
                  Check Answer
                </Button>
              )}
              
              {showAnswers[section.id] && (
                <div className={`mt-4 p-3 rounded-lg text-sm
                  ${isAnswerCorrect(section.id)
                    ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300'
                    : 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300'
                  }`}
                >
                  {isAnswerCorrect(section.id)
                    ? '✓ Correct! Well done.'
                    : `✗ Incorrect. The correct answer is: ${section.options?.[section.answer || 0]}`
                  }
                </div>
              )}
            </CardContent>
          </Card>
        );
      case 'assignment':
        return (
          <Card className="overflow-hidden border-purple-100 dark:border-purple-900/30">
            <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 border-b border-purple-100 dark:border-purple-900/30">
              <h4 className="font-medium text-purple-700 dark:text-purple-300 flex items-center">
                <Bookmark className="w-4 h-4 mr-2" />
                Practice Assignment
              </h4>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-700 dark:text-gray-200">{section.content}</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
          <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
          Course Preview
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage + 1} of {totalPages}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="h-7 w-7"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div 
        ref={previewRef}
        className="overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 300px)', minHeight: '600px' }}
      >
        {currentPage === 0 ? renderCoverPage() : renderContentPage(currentPage)}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          {useTts && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayAudio}
              disabled={isLoading}
              className={`gap-2 ${isPlaying ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                  Loading...
                </>
              ) : isPlaying ? (
                <>
                  <Square className="h-4 w-4 fill-current" />
                  Stop Audio
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  Play Audio
                </>
              )}
            </Button>
          )}
        </div>

        <Button 
          onClick={onPublish}
          className="gap-2"
        >
          <Bookmark className="h-4 w-4" />
          Publish Course
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CoursePreview;

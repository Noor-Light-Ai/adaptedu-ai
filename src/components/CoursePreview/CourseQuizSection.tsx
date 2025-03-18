
import { useState } from 'react';
import { Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CourseSection } from '../CoursePreview';

interface CourseQuizSectionProps {
  section: CourseSection;
}

const CourseQuizSection = ({ section }: CourseQuizSectionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const isAnswerCorrect = () => {
    return section.answer === selectedAnswer;
  };

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
              onClick={() => handleAnswerSelect(index)}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                ${selectedAnswer === index 
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
                ${showAnswer && index === section.answer
                  ? 'border-green-500 bg-green-500 text-white'
                  : ''
                }
                ${showAnswer && selectedAnswer === index && index !== section.answer
                  ? 'border-red-500 bg-red-500 text-white'
                  : ''
                }
              `}
            >
              <div className={`w-5 h-5 mr-3 rounded-full flex items-center justify-center border
                ${selectedAnswer === index
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 dark:border-gray-600'
                }
                ${showAnswer && index === section.answer
                  ? 'border-green-500 bg-green-500 text-white'
                  : ''
                }
              `}>
                {selectedAnswer === index && (
                  <Check className="w-3 h-3" />
                )}
              </div>
              <span className="text-gray-700 dark:text-gray-200">{option}</span>
            </div>
          ))}
        </div>
        
        {selectedAnswer !== undefined && !showAnswer && (
          <Button 
            onClick={handleCheckAnswer}
            variant="outline"
            className="mt-2"
          >
            Check Answer
          </Button>
        )}
        
        {showAnswer && (
          <div className={`mt-4 p-3 rounded-lg text-sm
            ${isAnswerCorrect()
              ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300'
            }`}
          >
            {isAnswerCorrect()
              ? '✓ Correct! Well done.'
              : `✗ Incorrect. The correct answer is: ${section.options?.[section.answer || 0]}`
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseQuizSection;

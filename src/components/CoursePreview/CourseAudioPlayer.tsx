
import { useState, useRef } from 'react';
import { Play, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CourseAudioPlayerProps {
  currentPage: number;
  isCourseCoverPage: boolean;
  courseTitle: string;
  courseDescription: string;
  learningObjectives: string[];
  sectionsToRead: string;
}

const CourseAudioPlayer = ({ 
  currentPage,
  isCourseCoverPage,
  courseTitle,
  courseDescription,
  learningObjectives,
  sectionsToRead
}: CourseAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = async () => {
    try {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      
      let textToRead = '';
      
      if (isCourseCoverPage) {
        textToRead = `${courseTitle}. ${courseDescription}. Learning objectives: ${learningObjectives.join('. ')}`;
      } else {
        textToRead = sectionsToRead;
      }
      
      if (!textToRead) {
        toast.error('No text content to read on this page');
        setIsLoading(false);
        return;
      }
      
      if (textToRead.length > 4000) {
        textToRead = textToRead.substring(0, 4000) + '...';
      }
      
      console.log('Sending TTS request with text length:', textToRead.length);
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: textToRead,
          voice: 'alloy'
        }
      });
      
      if (error) {
        console.error('TTS error from function invoke:', error);
        throw new Error(error.message || 'Failed to call TTS service');
      }
      
      if (!data || !data.audioContent) {
        console.error('No audio content returned:', data);
        throw new Error('No audio content returned from the TTS service');
      }
      
      const audio = new Audio();
      audio.src = `data:audio/mp3;base64,${data.audioContent}`;
      audioRef.current = audio;
      
      audio.onloadeddata = () => {
        console.log('Audio loaded successfully');
      };
      
      audio.onended = () => {
        console.log('Audio playback ended');
        setIsPlaying(false);
        audioRef.current = null;
      };
      
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        toast.error('Failed to play audio');
        setIsPlaying(false);
        setIsLoading(false);
      };
      
      try {
        await audio.play();
        console.log('Audio playback started');
        setIsPlaying(true);
      } catch (playError) {
        console.error('Error playing audio:', playError);
        toast.error('Browser could not play the audio');
        throw playError;
      }
    } catch (error) {
      console.error('TTS processing error:', error);
      toast.error('Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePlayAudio}
      disabled={isLoading}
      className={`gap-2 ${isPlaying ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30' : ''}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
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
  );
};

export default CourseAudioPlayer;

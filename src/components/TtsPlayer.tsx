
import { useState, useRef } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TtsPlayerProps {
  text: string;
}

const TtsPlayer = ({ text }: TtsPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTts = async () => {
    try {
      // If already playing, stop the playback
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      
      // Call the text-to-speech edge function
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: text,
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

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-0 right-0 w-8 h-8 -mt-1 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      onClick={handleTts}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-blue-500' : ''}`} />
      )}
    </Button>
  );
};

export default TtsPlayer;

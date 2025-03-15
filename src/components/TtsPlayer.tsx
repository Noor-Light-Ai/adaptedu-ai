
import { useState, useRef } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface TtsPlayerProps {
  text: string;
}

// Mock implementation - in a real app, this would use a TTS API
const TtsPlayer = ({ text }: TtsPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const handlePlay = () => {
    // In a real implementation, this would call a TTS API
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsPlaying(false);
      toast.info('Paused narration');
    } else {
      toast.success('Playing narration');
      setIsPlaying(true);
      // Simulate audio progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
      intervalRef.current = interval;
    }
  };
  
  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setProgress(0);
    setIsPlaying(false);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    } else if (value[0] === 0) {
      setIsMuted(true);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-3 w-3" />;
    if (volume < 0.5) return <Volume1 className="h-3 w-3" />;
    return <Volume2 className="h-3 w-3" />;
  };

  return (
    <div className="absolute top-0 right-0 flex items-center gap-1 -mt-7">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePlay}
        className="h-7 w-7 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700/80"
      >
        {isPlaying ? (
          <Pause className="h-3 w-3 text-gray-700 dark:text-gray-300" />
        ) : (
          <Play className="h-3 w-3 text-gray-700 dark:text-gray-300" />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="h-7 w-7 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700/80"
      >
        {getVolumeIcon()}
      </Button>
      
      <div className="relative group">
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity py-2 px-3 -mt-12 -mr-12 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700 z-10">
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>

      {isPlaying && (
        <div className="relative ml-1">
          <div className="h-1 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {progress > 0 && !isPlaying && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-7 w-7 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700/80"
        >
          <RotateCcw className="h-3 w-3 text-gray-700 dark:text-gray-300" />
        </Button>
      )}
    </div>
  );
};

export default TtsPlayer;

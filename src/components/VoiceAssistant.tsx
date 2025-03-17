
import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface VoiceAssistantProps {
  courseTitle?: string;
  courseContent?: string;
  onAssistantResponse?: (response: string) => void;
}

const VoiceAssistant = ({ courseTitle, courseContent, onAssistantResponse }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
      console.log('Audio playback ended');
    };

    // Clean up
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    try {
      // Check if browser supports speech recognition
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        toast.error('Speech recognition is not supported in your browser');
        return;
      }

      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
        toast.info('Listening...', { duration: 2000 });
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          if (finalTranscript.trim().length > 3) {
            processVoiceCommand(finalTranscript);
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'no-speech') {
          toast.info('No speech detected. Please try again.');
        } else {
          toast.error(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error('Failed to start speech recognition');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processVoiceCommand = async (command: string) => {
    try {
      setIsLoading(true);
      stopListening();

      const context = courseContent 
        ? `Course Title: ${courseTitle || 'Course'}\nCourse Content: ${courseContent}\n\n`
        : '';

      console.log('Sending voice command to AI:', command);
      
      // Call Supabase Edge Function to process the command
      const { data, error } = await supabase.functions.invoke('process-voice-command', {
        body: {
          command,
          context,
          voice: 'alloy' // OpenAI voice ID
        }
      });
      
      if (error) {
        console.error('Error processing voice command:', error);
        toast.error('Failed to process your request');
        return;
      }
      
      if (data.response) {
        // Call onAssistantResponse callback with the text response
        if (onAssistantResponse) {
          onAssistantResponse(data.response);
        }
        
        // Play audio response if available
        if (data.audioContent && !isMuted && audioRef.current) {
          const audioSrc = `data:audio/mp3;base64,${data.audioContent}`;
          audioRef.current.src = audioSrc;
          audioRef.current.play().catch(err => {
            console.error('Error playing audio:', err);
          });
        }
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      toast.error('Failed to process your request');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="top" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Voice Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="text-sm space-y-2">
              <p>Ask me anything about the course or for help navigating.</p>
              <p className="text-muted-foreground text-xs">
                Examples: "Explain the key concepts", "Summarize this section", "Navigate to the next page"
              </p>
            </div>
            
            {transcript && (
              <div className="p-3 bg-muted rounded-md text-sm">
                <p className="font-medium text-xs mb-1">You said:</p>
                <p>{transcript}</p>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleListening}
                disabled={isLoading}
              >
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default VoiceAssistant;

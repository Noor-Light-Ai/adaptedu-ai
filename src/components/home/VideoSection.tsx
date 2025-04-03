
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play } from 'lucide-react';

const VideoSection = () => {
  return (
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
  );
};

export default VideoSection;

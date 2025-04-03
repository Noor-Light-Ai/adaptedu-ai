
import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  initialCount: number;
  isVisible: boolean;
}

const AnimatedCounter = ({ initialCount, isVisible }: AnimatedCounterProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Increment counter every 2 seconds for animation effect
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Format counter with commas
  const formattedCount = count.toLocaleString('en-US');

  return (
    <div className={`mt-10 text-center transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="flex flex-col items-center">
        <span className="font-bold text-blue-600 dark:text-blue-400 text-3xl md:text-4xl">{formattedCount}</span>
        <span className="text-gray-600 dark:text-gray-300 text-lg mt-2">Total courses created</span>
      </div>
    </div>
  );
};

export default AnimatedCounter;

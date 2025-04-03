
import { useState, useEffect, RefObject } from 'react';

export function useScrollAnimation(ref: RefObject<HTMLElement>, threshold = 0.1): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the element is visible, we can stop observing it
          observer.unobserve(entry.target);
        }
      },
      {
        threshold, // Percentage of element visibility needed to trigger the callback
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
}

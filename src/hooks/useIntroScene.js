import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

export const useIntroScene = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const completeIntro = useCallback(() => {
    setIsIntroComplete(true);
    setIsLoading(false);
  }, []);

  const skipIntro = useCallback(() => {
    gsap.to('.intro-canvas', {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        completeIntro();
      }
    });
  }, [completeIntro]);

  useEffect(() => {
    // Preload essential assets
    const preloadAssets = async () => {
      try {
        // Add any asset preloading here if needed
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading assets:', error);
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  return {
    isIntroComplete,
    isLoading,
    completeIntro,
    skipIntro
  };
}; 
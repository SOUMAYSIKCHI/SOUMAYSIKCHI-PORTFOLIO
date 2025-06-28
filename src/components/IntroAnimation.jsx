import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  SpotLight, 
  Text,
  Sparkles,
  Stars
} from '@react-three/drei';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import RobotCharacter from './RobotCharacter';
import FloatingProjectScreens from './FloatingProjectScreens';

// Scene Lighting
const SceneLighting = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light for overall scene illumination */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color={0xffffff}
      />
      
      {/* Spotlights */}
      <SpotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color={0x0088ff}
      />
      <SpotLight
        position={[-5, 8, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        castShadow
        color={0xff0088}
      />
      <SpotLight
        position={[5, 8, -5]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        castShadow
        color={0x88ff00}
      />
      
      {/* Additional fill lights */}
      <pointLight
        position={[0, 5, 10]}
        intensity={0.3}
        color={0x0088ff}
      />
      <pointLight
        position={[0, 5, -10]}
        intensity={0.3}
        color={0xff0088}
      />
    </>
  );
};

// Particle Effects
const ParticleEffects = () => {
  return (
    <>
      <Sparkles 
        count={100} 
        scale={20} 
        size={2} 
        speed={0.3} 
        color={0x0088ff}
      />
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
    </>
  );
};

// Main Intro Scene
const IntroScene = ({ onComplete }) => {
  const { camera } = useThree();
  const sceneRef = useRef();
  const [robotReachedCenter, setRobotReachedCenter] = useState(false);

  useEffect(() => {
    // Camera animation
    gsap.to(camera.position, {
      x: 0,
      y: 3,
      z: 8,
      duration: 3,
      ease: "power2.out"
    });

    gsap.to(camera.rotation, {
      x: -0.2,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power2.out"
    });

    // Complete animation after 6 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6000);

    return () => clearTimeout(timer);
  }, [camera, onComplete]);

  const handleRobotReachedCenter = () => {
    setRobotReachedCenter(true);
    // Add dramatic camera movement when robot reaches center
    gsap.to(camera.position, {
      x: 0,
      y: 2,
      z: 5,
      duration: 2,
      ease: "power2.inOut"
    });
  };

  return (
    <group ref={sceneRef}>
      <RobotCharacter 
        position={[0, 0, -10]} 
        onAnimationComplete={handleRobotReachedCenter}
      />
      <FloatingProjectScreens />
      <SceneLighting />
      <ParticleEffects />
      
      {/* Welcome Text */}
      <Text
        position={[0, 4, 0]}
        fontSize={1}
        color={0x0088ff}
        anchorX="center"
        anchorY="middle"
      >
        Welcome to PORTFOLIO
      </Text>
      
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color={0xffffff}
        anchorX="center"
        anchorY="middle"
      >
        Soumay Sikchi's Portfolio
      </Text>

      {/* Subtitle that appears when robot reaches center */}
      {robotReachedCenter && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.3}
          color={0x00ffff}
          anchorX="center"
          anchorY="middle"
        >
          Engineering Imagination into Code
        </Text>
      )}
    </group>
  );
};

// Main Intro Animation Component
const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSkipButton, setShowSkipButton] = useState(false);

  const handleIntroComplete = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  const handleSkip = () => {
    handleIntroComplete();
  };

  useEffect(() => {
    // Show skip button after 3 seconds
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    return () => clearTimeout(skipTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="intro-canvas"
      >
        <IntroScene onComplete={handleIntroComplete} />
        
        <EffectComposer>
          <Bloom 
            intensity={1.5} 
            luminanceThreshold={0.5} 
            luminanceSmoothing={0.9} 
          />
          <Glitch 
            delay={[1.5, 3.5]} 
            duration={[0.2, 0.3]} 
            strength={[0.3, 0.4]} 
            mode="constant" 
          />
        </EffectComposer>
      </Canvas>

      {/* Skip Button */}
      {showSkipButton && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 z-10 px-6 py-3 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue hover:text-white transition-all duration-300 border border-neon-blue/30 backdrop-blur-sm"
        >
          Skip Intro
        </button>
      )}

      {/* Loading Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-2 text-neon-blue">
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
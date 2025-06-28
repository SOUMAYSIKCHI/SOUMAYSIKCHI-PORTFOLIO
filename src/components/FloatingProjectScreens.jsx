import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import projects from '../data/projects';

const ProjectScreen = ({ project, position, index }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Try to load project image texture
  const texture = useTexture(
    project.imageGallery && project.imageGallery[0] ? project.imageGallery[0] : '/projects/devsync-1.png',
    (loadedTexture) => {
      setImageLoaded(true);
    },
    (error) => {
      console.warn('Failed to load project image:', error);
      setImageLoaded(false);
    }
  );

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Rotate slowly
      meshRef.current.rotation.y = time * 0.2 + index * 0.5;
      // Float up and down
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.5;
      
      // Pulse effect when hovered
      if (hovered) {
        meshRef.current.scale.x = 1.3 + Math.sin(time * 5) * 0.05;
        meshRef.current.scale.y = 1.3 + Math.sin(time * 5) * 0.05;
      } else {
        meshRef.current.scale.x = 1.3;
        meshRef.current.scale.y = 1.3;
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main screen frame - Much larger size */}
        <mesh>
          <planeGeometry args={[5, 3.5]} />
          <meshBasicMaterial 
            color={hovered ? 0x0088ff : 0xffffff}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Project image - Much larger size */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[4.6, 3.1]} />
          {imageLoaded ? (
            <meshBasicMaterial map={texture} />
          ) : (
            <meshBasicMaterial color={0x333333} />
          )}
        </mesh>

        {/* Glow effect when hovered */}
        {hovered && (
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[5.2, 3.7]} />
            <meshBasicMaterial 
              color={0x0088ff} 
              transparent 
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Project title */}
        <Text
          position={[0, -1.8, 0.02]}
          fontSize={0.2}
          color={hovered ? 0xffffff : 0x0088ff}
          anchorX="center"
          anchorY="middle"
        >
          {project.name}
        </Text>

        {/* Tech stack tags */}
        <Text
          position={[0, -2.1, 0.02]}
          fontSize={0.12}
          color={0x888888}
          anchorX="center"
          anchorY="middle"
          maxWidth={4.4}
        >
          {project.techStack.slice(0, 3).join(' • ')}
        </Text>

        {/* Corner accent */}
        <mesh position={[2.2, 1.2, 0.02]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial 
            color={0x0088ff} 
            transparent 
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingProjectScreens = () => {
  // Show more projects in the intro - up to 6 projects
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6);
  
  return (
    <group>
      {featuredProjects.map((project, index) => {
        const angle = (index / featuredProjects.length) * Math.PI * 2;
        const radius = 15; // Increased radius for better spacing
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 3 + Math.sin(angle * 2) * 2;
        
        return (
          <ProjectScreen
            key={index}
            project={project}
            position={[x, y, z]}
            index={index}
          />
        );
      })}

      {/* Additional floating elements */}
      {[...Array(8)].map((_, index) => (
        <mesh
          key={`floating-${index}`}
          position={[
            Math.sin(index * 0.785) * 20,
            5 + Math.sin(index * 1.571) * 3,
            Math.cos(index * 0.785) * 20
          ]}
        >
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial 
            color={0x0088ff} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Side project screens - Left side */}
      {projects.slice(0, 3).map((project, index) => (
        <ProjectScreen
          key={`left-${index}`}
          project={project}
          position={[-18, 2 + index * 3, 0]}
          index={index + 10}
        />
      ))}

      {/* Side project screens - Right side */}
      {projects.slice(3, 6).map((project, index) => (
        <ProjectScreen
          key={`right-${index}`}
          project={project}
          position={[18, 2 + index * 3, 0]}
          index={index + 15}
        />
      ))}
    </group>
  );
};

export default FloatingProjectScreens; 
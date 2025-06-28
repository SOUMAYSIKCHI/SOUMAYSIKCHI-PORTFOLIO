import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RobotCharacter = ({ position, onAnimationComplete }) => {
  const robotRef = useRef();
  const glassesRef = useRef();
  const [robotModel, setRobotModel] = useState(null);

  // Create a detailed robot geometry
  useEffect(() => {
    const group = new THREE.Group();
    
    // Robot body with more detail
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x444444,
      shininess: 100,
      specular: 0x222222
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Robot head with more detail
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x666666,
      shininess: 100,
      specular: 0x333333
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.2;
    group.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.3
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.3, 0.35);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.3, 0.35);
    group.add(rightEye);

    // AR Glasses with enhanced glow
    const glassesGeometry = new THREE.BoxGeometry(0.9, 0.3, 0.1);
    const glassesMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.8,
      emissive: 0x0088ff,
      emissiveIntensity: 0.5,
      shininess: 200
    });
    const glasses = new THREE.Mesh(glassesGeometry, glassesMaterial);
    glasses.position.y = 1.1;
    glasses.position.z = 0.4;
    group.add(glasses);

    // Arms with joints
    const armGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const armMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x555555,
      shininess: 50
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.8, 0.2, 0);
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.8, 0.2, 0);
    group.add(rightArm);

    // Hands
    const handGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const handMaterial = new THREE.MeshPhongMaterial({ color: 0x777777 });
    
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.8, -0.3, 0);
    group.add(leftHand);
    
    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.8, -0.3, 0);
    group.add(rightHand);

    // Legs with joints
    const legGeometry = new THREE.BoxGeometry(0.4, 1, 0.4);
    const legMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 30
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.3, -1.2, 0);
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.3, -1.2, 0);
    group.add(rightLeg);

    // Feet
    const footGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.6);
    const footMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
    leftFoot.position.set(-0.3, -1.7, 0.1);
    group.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
    rightFoot.position.set(0.3, -1.7, 0.1);
    group.add(rightFoot);

    // Chest panel
    const chestGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
    const chestMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.3,
      emissive: 0x0088ff,
      emissiveIntensity: 0.2
    });
    const chest = new THREE.Mesh(chestGeometry, chestMaterial);
    chest.position.set(0, 0.3, 0.3);
    group.add(chest);

    setRobotModel(group);
  }, []);

  useFrame((state) => {
    if (robotRef.current) {
      const time = state.clock.elapsedTime;
      
      // Walking animation
      robotRef.current.position.y = Math.sin(time * 2) * 0.1;
      
      // Slight rotation for walking effect
      robotRef.current.rotation.y = Math.sin(time * 1.5) * 0.1;
      
      // Move forward
      if (robotRef.current.position.z < 0) {
        robotRef.current.position.z += 0.02;
      } else if (onAnimationComplete) {
        onAnimationComplete();
      }
    }

    // Enhanced glasses glow effect
    if (glassesRef.current) {
      const time = state.clock.elapsedTime;
      glassesRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.3;
      glassesRef.current.material.opacity = 0.8 + Math.sin(time * 2) * 0.1;
    }
  });

  if (!robotModel) return null;

  return (
    <group ref={robotRef} position={position}>
      <primitive object={robotModel} />
      
      {/* Enhanced glasses glow effect */}
      <mesh ref={glassesRef} position={[0, 1.1, 0.4]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial 
          color={0x0088ff} 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Additional glow rings around glasses */}
      <mesh position={[0, 1.1, 0.4]}>
        <ringGeometry args={[0.7, 0.8, 32]} />
        <meshBasicMaterial 
          color={0x0088ff} 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Energy field around robot */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color={0x0088ff} 
          transparent 
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default RobotCharacter; 
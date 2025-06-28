import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text, Sphere } from '@react-three/drei';
import { FiX, FiPlay, FiSkipForward } from 'react-icons/fi';

const DevTrialsGame = ({ onComplete, onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState('intro'); // intro, playing, levelComplete, gameComplete
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugs, setBugs] = useState([]);
  const [correctBugs, setCorrectBugs] = useState(0);
  const [stackItems, setStackItems] = useState([]);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [platforms, setPlatforms] = useState([]);
  const [mergeConflicts, setMergeConflicts] = useState([]);
  const [cloudPlatforms, setCloudPlatforms] = useState([]);

  const levels = [
    {
      name: "Bug Hunt",
      description: "Click on valid syntax errors as they scroll by",
      duration: 30,
      color: "#ff4444"
    },
    {
      name: "Stack Builder", 
      description: "Stack the correct tech logos to build your stack",
      duration: 45,
      color: "#00d4ff"
    },
    {
      name: "Code Sprint",
      description: "Jump between platforms, avoid semicolons and missing imports",
      duration: 60,
      color: "#00ff88"
    },
    {
      name: "Git Merge Mayhem",
      description: "Resolve merge conflicts by dragging the correct code",
      duration: 40,
      color: "#8b5cf6"
    },
    {
      name: "Cloud Ascension",
      description: "Jump between cloud platforms to reach the top",
      duration: 50,
      color: "#ec4899"
    }
  ];

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeLevel();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const startLevel = () => {
    setGameState('playing');
    setTimeLeft(levels[currentLevel].duration);
    setScore(0);
    initializeLevel();
  };

  const initializeLevel = () => {
    switch (currentLevel) {
      case 0: // Bug Hunt
        generateBugs();
        break;
      case 1: // Stack Builder
        generateStackItems();
        break;
      case 2: // Code Sprint
        generatePlatforms();
        break;
      case 3: // Git Merge Mayhem
        generateMergeConflicts();
        break;
      case 4: // Cloud Ascension
        generateCloudPlatforms();
        break;
    }
  };

  const generateBugs = () => {
    const bugTypes = [
      { text: "console.log('Hello World')", valid: true },
      { text: "const x = 5;", valid: false },
      { text: "function() {", valid: true },
      { text: "let y = 10", valid: true },
      { text: "if (condition) {", valid: false },
      { text: "return;", valid: false },
      { text: "import React from 'react'", valid: true },
      { text: "export default App", valid: true }
    ];

    const newBugs = [];
    for (let i = 0; i < 8; i++) {
      const bugType = bugTypes[Math.floor(Math.random() * bugTypes.length)];
      newBugs.push({
        id: i,
        text: bugType.text,
        valid: bugType.valid,
        x: Math.random() * 800,
        y: Math.random() * 400
      });
    }
    setBugs(newBugs);
  };

  const generateStackItems = () => {
    const items = ['React', 'Node', 'Mongo', 'Express', 'Socket.IO', 'AWS'];
    const newItems = items.map((item, index) => ({
      id: index,
      name: item,
      x: Math.random() * 600,
      y: 400 + Math.random() * 200
    }));
    setStackItems(newItems);
  };

  const generatePlatforms = () => {
    const newPlatforms = [];
    for (let i = 0; i < 10; i++) {
      newPlatforms.push({
        id: i,
        x: Math.random() * 800,
        y: i * 60,
        type: Math.random() < 0.3 ? 'obstacle' : 'platform'
      });
    }
    setPlatforms(newPlatforms);
  };

  const generateMergeConflicts = () => {
    const conflicts = [
      { id: 1, left: "function hello() {", right: "function hello() {", correct: 'left' },
      { id: 2, left: "console.log('Hi')", right: "console.log('Hello')", correct: 'right' },
      { id: 3, left: "return true", right: "return false", correct: 'left' }
    ];
    setMergeConflicts(conflicts);
  };

  const generateCloudPlatforms = () => {
    const clouds = ['AWS', 'GCP', 'Azure'];
    const newClouds = clouds.map((cloud, index) => ({
      id: index,
      name: cloud,
      x: Math.random() * 600,
      y: 400 - index * 80
    }));
    setCloudPlatforms(newClouds);
  };

  const handleBugClick = (bug) => {
    if (bug.valid) {
      setCorrectBugs(prev => prev + 1);
      setScore(prev => prev + 10);
      setBugs(prev => prev.filter(b => b.id !== bug.id));
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  const handleStackItemClick = (item) => {
    setScore(prev => prev + 15);
    setStackItems(prev => prev.filter(i => i.id !== item.id));
  };

  const handleKeyPress = (e) => {
    if (currentLevel === 2 && gameState === 'playing') {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setPlayerPosition(prev => Math.max(prev - 20, 0));
          break;
        case 'ArrowRight':
        case 'KeyD':
          setPlayerPosition(prev => Math.min(prev + 20, 760));
          break;
        case 'Space':
          e.preventDefault();
          // Jump logic would go here
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentLevel, gameState]);

  const completeLevel = () => {
    setGameState('levelComplete');
    if (currentLevel === 4) {
      setTimeout(() => {
        setGameState('gameComplete');
        setTimeout(() => {
          onComplete();
        }, 3000);
      }, 2000);
    }
  };

  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    setGameState('intro');
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case 0:
        return <BugHuntLevel bugs={bugs} onBugClick={handleBugClick} />;
      case 1:
        return <StackBuilderLevel items={stackItems} onItemClick={handleStackItemClick} />;
      case 2:
        return <CodeSprintLevel platforms={platforms} playerPosition={playerPosition} />;
      case 3:
        return <GitMergeLevel conflicts={mergeConflicts} />;
      case 4:
        return <CloudAscensionLevel platforms={cloudPlatforms} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="glass rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              🎮 The Dev Trials - Level {currentLevel + 1}
            </h2>
            <p className="text-gray-400">{levels[currentLevel]?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Game Stats */}
        <div className="px-6 py-4 bg-dark-800/50 flex justify-between items-center">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-neon-blue">{score}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-neon-green">{timeLeft}s</div>
              <div className="text-sm text-gray-400">Time</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-neon-purple">{currentLevel + 1}/5</div>
              <div className="text-sm text-gray-400">Level</div>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {gameState === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-3xl font-bold text-white">
                  {levels[currentLevel]?.name}
                </h3>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  {levels[currentLevel]?.description}
                </p>
                <button
                  onClick={startLevel}
                  className="button-primary flex items-center gap-2 mx-auto"
                >
                  <FiPlay />
                  Start Level
                </button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-96 relative"
              >
                {renderLevel()}
              </motion.div>
            )}

            {gameState === 'levelComplete' && (
              <motion.div
                key="levelComplete"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center space-y-6"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold text-neon-green">
                  Level {currentLevel + 1} Complete!
                </h3>
                <p className="text-gray-400">
                  Score: {score} | Time Bonus: {timeLeft * 2}
                </p>
                {currentLevel < 4 ? (
                  <button
                    onClick={nextLevel}
                    className="button-primary flex items-center gap-2 mx-auto"
                  >
                    <FiSkipForward />
                    Next Level
                  </button>
                ) : (
                  <p className="text-neon-blue font-bold">
                    All levels completed! Redirecting to LinkedIn...
                  </p>
                )}
              </motion.div>
            )}

            {gameState === 'gameComplete' && (
              <motion.div
                key="gameComplete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-3xl font-bold text-neon-blue">
                  Congratulations!
                </h3>
                <p className="text-gray-400 text-lg">
                  You've cleared all Dev Trials.
                  <br />
                  Now it's time to level up in real life.
                </p>
                <div className="text-neon-green font-bold text-xl">
                  🚀 Redirecting you to Soumay's LinkedIn...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Level Components
const BugHuntLevel = ({ bugs, onBugClick }) => (
  <div className="relative w-full h-full bg-dark-800 rounded-lg overflow-hidden">
    {bugs.map(bug => (
      <motion.div
        key={bug.id}
        initial={{ x: 800 }}
        animate={{ x: -100 }}
        transition={{ duration: 5, repeat: Infinity }}
        className={`absolute cursor-pointer px-4 py-2 rounded-lg ${
          bug.valid ? 'bg-red-500/80' : 'bg-gray-600/80'
        } text-white font-mono text-sm`}
        style={{ top: bug.y, left: bug.x }}
        onClick={() => onBugClick(bug)}
      >
        {bug.text}
      </motion.div>
    ))}
  </div>
);

const StackBuilderLevel = ({ items, onItemClick }) => (
  <div className="relative w-full h-full bg-dark-800 rounded-lg overflow-hidden">
    {items.map(item => (
      <motion.div
        key={item.id}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute cursor-pointer px-4 py-2 bg-neon-blue/80 text-white rounded-lg font-bold"
        style={{ top: item.y, left: item.x }}
        onClick={() => onItemClick(item)}
      >
        {item.name}
      </motion.div>
    ))}
  </div>
);

const CodeSprintLevel = ({ platforms, playerPosition }) => (
  <div className="relative w-full h-full bg-dark-800 rounded-lg overflow-hidden">
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Player */}
      <Box args={[1, 1, 1]} position={[playerPosition / 100 - 4, 0, 0]}>
        <meshStandardMaterial color="#00d4ff" />
      </Box>

      {/* Platforms */}
      {platforms.map(platform => (
        <Box
          key={platform.id}
          args={[2, 0.5, 1]}
          position={[platform.x / 100 - 4, platform.y / 100 - 2, 0]}
        >
          <meshStandardMaterial 
            color={platform.type === 'obstacle' ? '#ff4444' : '#00ff88'} 
          />
        </Box>
      ))}

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  </div>
);

const GitMergeLevel = ({ conflicts }) => (
  <div className="space-y-4">
    {conflicts.map(conflict => (
      <div key={conflict.id} className="glass p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-500/20 p-3 rounded border border-red-500/30">
            <div className="text-red-400 font-mono text-sm">{conflict.left}</div>
          </div>
          <div className="bg-blue-500/20 p-3 rounded border border-blue-500/30">
            <div className="text-blue-400 font-mono text-sm">{conflict.right}</div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <span className="text-gray-400 text-sm">Choose the correct version</span>
        </div>
      </div>
    ))}
  </div>
);

const CloudAscensionLevel = ({ platforms }) => (
  <div className="relative w-full h-full bg-dark-800 rounded-lg overflow-hidden">
    {platforms.map(platform => (
      <motion.div
        key={platform.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: platform.id * 0.2 }}
        className="absolute cursor-pointer px-6 py-3 bg-neon-purple/80 text-white rounded-lg font-bold text-center"
        style={{ top: platform.y, left: platform.x }}
      >
        {platform.name}
      </motion.div>
    ))}
  </div>
);

export default DevTrialsGame; 
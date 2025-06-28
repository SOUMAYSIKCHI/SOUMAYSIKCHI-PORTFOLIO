import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';

const MiniGame = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(2);
  const gameLoopRef = useRef(null);

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('portfolio-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setPlayerPosition(0);
    setObstacles([]);
    setCollectibles([]);
    setGameSpeed(2);
    startGameLoop();
  };

  const pauseGame = () => {
    setGameState('paused');
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  };

  const resumeGame = () => {
    setGameState('playing');
    startGameLoop();
  };

  const gameOver = () => {
    setGameState('gameOver');
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    // Update high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('portfolio-highscore', score.toString());
    }
  };

  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      if (gameState === 'playing') {
        // Update score
        setScore(prev => prev + 1);

        // Move obstacles
        setObstacles(prev => {
          const updated = prev.map(obs => ({
            ...obs,
            x: obs.x - gameSpeed
          })).filter(obs => obs.x > -10);

          // Add new obstacles
          if (Math.random() < 0.02) {
            updated.push({
              id: Date.now(),
              x: 20,
              y: Math.random() * 4 - 2,
              type: Math.random() < 0.7 ? 'bug' : 'error'
            });
          }

          return updated;
        });

        // Move collectibles
        setCollectibles(prev => {
          const updated = prev.map(col => ({
            ...col,
            x: col.x - gameSpeed
          })).filter(col => col.x > -10);

          // Add new collectibles
          if (Math.random() < 0.03) {
            updated.push({
              id: Date.now(),
              x: 20,
              y: Math.random() * 4 - 2,
              type: ['react', 'node', 'mongo'][Math.floor(Math.random() * 3)]
            });
          }

          return updated;
        });

        // Check collisions
        checkCollisions();

        // Increase game speed
        if (score % 100 === 0) {
          setGameSpeed(prev => Math.min(prev + 0.5, 8));
        }
      }
    }, 50);
  };

  const checkCollisions = () => {
    const playerBounds = {
      x: playerPosition,
      y: 0,
      width: 1,
      height: 1
    };

    // Check obstacle collisions
    obstacles.forEach(obstacle => {
      if (obstacle.x < playerBounds.x + playerBounds.width &&
          obstacle.x + 1 > playerBounds.x &&
          obstacle.y < playerBounds.y + playerBounds.height &&
          obstacle.y + 1 > playerBounds.y) {
        gameOver();
      }
    });

    // Check collectible collisions
    setCollectibles(prev => {
      return prev.filter(collectible => {
        if (collectible.x < playerBounds.x + playerBounds.width &&
            collectible.x + 1 > playerBounds.x &&
            collectible.y < playerBounds.y + playerBounds.height &&
            collectible.y + 1 > playerBounds.y) {
          setScore(prevScore => prevScore + 10);
          return false;
        }
        return true;
      });
    });
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'playing') {
        switch (e.code) {
          case 'ArrowLeft':
          case 'KeyA':
            setPlayerPosition(prev => Math.max(prev - 0.5, -8));
            break;
          case 'ArrowRight':
          case 'KeyD':
            setPlayerPosition(prev => Math.min(prev + 0.5, 8));
            break;
          case 'Space':
            e.preventDefault();
            pauseGame();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  const GameScene = () => {
    return (
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Player */}
        <Box args={[1, 1, 1]} position={[playerPosition, 0, 0]}>
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
        </Box>

        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <Box 
            key={obstacle.id}
            args={[1, 1, 1]} 
            position={[obstacle.x, obstacle.y, 0]}
          >
            <meshStandardMaterial 
              color={obstacle.type === 'bug' ? '#ff4444' : '#ff8800'} 
            />
          </Box>
        ))}

        {/* Collectibles */}
        {collectibles.map(collectible => (
          <Sphere 
            key={collectible.id}
            args={[0.5, 16, 16]} 
            position={[collectible.x, collectible.y, 0]}
          >
            <meshStandardMaterial 
              color={
                collectible.type === 'react' ? '#61dafb' :
                collectible.type === 'node' ? '#68a063' : '#4db33d'
              } 
              emissive={
                collectible.type === 'react' ? '#61dafb' :
                collectible.type === 'node' ? '#68a063' : '#4db33d'
              }
              emissiveIntensity={0.5}
            />
          </Sphere>
        ))}

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    );
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-neon-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Code Rush</span>
            <br />
            <span className="text-gray-300 text-2xl lg:text-3xl">Mini Game</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Take a break and enjoy this developer-themed side-scroller. 
            Collect tech icons, avoid bugs, and beat your high score!
          </p>
        </motion.div>

        {/* Game Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-xl p-6">
            {/* Game Stats */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue">{score}</div>
                  <div className="text-sm text-gray-400">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-green">{highScore}</div>
                  <div className="text-sm text-gray-400">High Score</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {gameState === 'menu' && (
                  <button
                    onClick={startGame}
                    className="button-primary flex items-center gap-2"
                  >
                    <FiPlay />
                    Start Game
                  </button>
                )}
                
                {gameState === 'playing' && (
                  <button
                    onClick={pauseGame}
                    className="button-secondary flex items-center gap-2"
                  >
                    <FiPause />
                    Pause
                  </button>
                )}
                
                {gameState === 'paused' && (
                  <div className="flex gap-2">
                    <button
                      onClick={resumeGame}
                      className="button-primary flex items-center gap-2"
                    >
                      <FiPlay />
                      Resume
                    </button>
                    <button
                      onClick={startGame}
                      className="button-secondary flex items-center gap-2"
                    >
                      <FiRotateCcw />
                      Restart
                    </button>
                  </div>
                )}
                
                {gameState === 'gameOver' && (
                  <button
                    onClick={startGame}
                    className="button-primary flex items-center gap-2"
                  >
                    <FiRotateCcw />
                    Play Again
                  </button>
                )}
              </div>
            </div>

            {/* Game Canvas */}
            <div className="relative h-96 bg-dark-800 rounded-lg overflow-hidden border border-white/20">
              {gameState === 'menu' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎮</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Code Rush</h3>
                    <p className="text-gray-400 mb-6">Click Start to begin your coding adventure!</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>🕹️ Use A/D or Arrow Keys to move</div>
                      <div>🎯 Collect React, Node, Mongo icons</div>
                      <div>🐛 Avoid red bugs and orange errors</div>
                      <div>⏸️ Press Space to pause</div>
                    </div>
                  </div>
                </div>
              )}

              {gameState === 'paused' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⏸️</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Game Paused</h3>
                    <p className="text-gray-400">Click Resume to continue</p>
                  </div>
                </div>
              )}

              {gameState === 'gameOver' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <div className="text-4xl mb-4">💀</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Game Over</h3>
                    <p className="text-gray-400 mb-4">Final Score: {score}</p>
                    {score > highScore && (
                      <p className="text-neon-green font-bold mb-4">🎉 New High Score! 🎉</p>
                    )}
                    <p className="text-gray-500">Click Play Again to try again</p>
                  </div>
                </div>
              )}

              {(gameState === 'playing' || gameState === 'paused') && (
                <GameScene />
              )}
            </div>

            {/* Game Controls */}
            <div className="mt-6 text-center">
              <div className="flex justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-neon-blue rounded"></div>
                  <span>Player</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Bugs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Errors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                  <span>Collectibles</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MiniGame; 
import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    // Matrix columns
    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(1);

    // Animation
    const draw = () => {
      // Semi-transparent black background for fade effect
      ctx.fillStyle = 'rgba(3, 3, 3, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix characters
      ctx.fillStyle = '#6366f1'; // Indigo color to match theme
      ctx.font = '14px JetBrains Mono';

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * 20;
        const y = drops[i] * 20;

        // Gradient effect
        const gradient = ctx.createLinearGradient(x, y - 20, x, y + 20);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);

        // Reset drop when it reaches bottom
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-bg fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.05 }}
    />
  );
};

export default MatrixBackground; 
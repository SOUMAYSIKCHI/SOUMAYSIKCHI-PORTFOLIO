import React, { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - 41}px`;
        glowRef.current.style.top = `${e.clientY - 41}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 82,
        height: 82,
        pointerEvents: "none",
        zIndex: 9999,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(236,72,153,0.5) 60%, transparent 100%)",
        filter: "blur(14px)",
        transition: "left 0.08s linear, top 0.08s linear"
      }}
    />
  );
};

export default CursorGlow; 
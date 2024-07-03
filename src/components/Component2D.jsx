import React, { useEffect, useRef, useState } from 'react';

const Component2D = () => {
  const canvasRef = useRef(null);
  const [rotationAngles, setRotationAngles] = useState({
    square: 0,
    circle: 0,
    triangle: 0,
  });
  const [rotationSpeeds, setRotationSpeeds] = useState({
    square: 0.01,
    circle: 0.01,
    triangle: 0.01,
  });
  const [visibility, setVisibility] = useState({
    square: true,
    circle: true,
    triangle: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationFrameId;

    const drawSquare = (x, y, size, angle) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.fillStyle = 'white';
      context.fillRect(-size / 2, -size / 2, size, size);
      context.restore();
    };

    const drawCircle = (x, y, radius) => {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fillStyle = 'white';
      context.fill();
    };

    const drawTriangle = (x, y, size, angle) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      context.moveTo(0, -size / 2);
      context.lineTo(size / 2, size / 2);
      context.lineTo(-size / 2, size / 2);
      context.closePath();
      context.fillStyle = 'white';
      context.fill();
      context.restore();
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (visibility.square) {
        drawSquare(150, canvas.height / 2, 100, rotationAngles.square);
      }
      if (visibility.circle) {
        drawCircle(canvas.width / 2, canvas.height / 2, 50);
      }
      if (visibility.triangle) {
        drawTriangle(canvas.width - 150, canvas.height / 2, 100, rotationAngles.triangle);
      }

      setRotationAngles((prevAngles) => ({
        square: prevAngles.square + rotationSpeeds.square,
        circle: prevAngles.circle + rotationSpeeds.circle,
        triangle: prevAngles.triangle + rotationSpeeds.triangle,
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [rotationAngles, rotationSpeeds, visibility]);

  const handleToggleVisibility = (object) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [object]: !prevVisibility[object],
    }));
  };

  const handleSpeedChange = (object, speed) => {
    setRotationSpeeds((prevSpeeds) => ({
      ...prevSpeeds,
      [object]: speed,
    }));
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-screen bg-[rgb(51,51,76)]"></canvas>
      <div className=" left-0 p-4 space-y-4 bg-gray-800 bg-opacity-75 rounded-md">
        <div className="flex space-x-4">
          <button
            onClick={() => handleToggleVisibility('square')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Toggle Square
          </button>
          <button
            onClick={() => handleToggleVisibility('circle')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Toggle Circle
          </button>
          <button
            onClick={() => handleToggleVisibility('triangle')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Toggle Triangle
          </button>
        </div>
        <div className="space-y-2">
          <label className="block">Square Speed:</label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.square}
            onChange={(e) => handleSpeedChange('square', parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.square}
            onChange={(e) => handleSpeedChange('square', parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block">Circle Speed:</label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.circle}
            onChange={(e) => handleSpeedChange('circle', parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.circle}
            onChange={(e) => handleSpeedChange('circle', parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block">Triangle Speed:</label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.triangle}
            onChange={(e) => handleSpeedChange('triangle', parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.triangle}
            onChange={(e) => handleSpeedChange('triangle', parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1 bg-gray-700 text-white rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Component2D;

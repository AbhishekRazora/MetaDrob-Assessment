
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Component3D = () => {
  const canvasRef = useRef(null);
  const [rotationSpeeds, setRotationSpeeds] = useState({
    box: 0.01,
    torus: 0.01,
    dodecahedron: 0.01,
  });
  const [visibility, setVisibility] = useState({
    box: true,
    torus: true,
    dodecahedron: true,
  });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.innerHTML = ''; // Clear previous renderers
    canvasRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);


    // creating objects
    let objects = {};

    const createObjects = () => {
      Object.keys(objects).forEach(key => {
        scene.remove(objects[key]);
        objects[key].geometry.dispose();
        objects[key].material.dispose();
      });

      const geometryBox = new THREE.BoxGeometry(4,4,4,4,4,4);
      const materialBox = new THREE.MeshPhongMaterial({ color: 0xffffff });
      objects.box = new THREE.Mesh(geometryBox, materialBox);
      if (visibility.box) scene.add(objects.box);

      const geometryTorus = new THREE.TorusGeometry(5, 1.5, 16, 100);
      const materialTorus = new THREE.MeshPhongMaterial({ color: 0xffffff });
      objects.torus = new THREE.Mesh(geometryTorus, materialTorus);
      if (visibility.torus) scene.add(objects.torus);

      const geometryDodecahedron = new THREE.DodecahedronGeometry(4);
      const materialDodecahedron = new THREE.MeshPhongMaterial({ color: 0xffffff });
      objects.dodecahedron = new THREE.Mesh(geometryDodecahedron, materialDodecahedron);
      if (visibility.dodecahedron) scene.add(objects.dodecahedron);

      objects.box.position.x = -15;
      objects.torus.position.x = 0;
      objects.dodecahedron.position.x = 15;
    };

    createObjects();

    camera.position.z = 20;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      if (visibility.box && objects.box) objects.box.rotation.x += rotationSpeeds.box;
      if (visibility.torus && objects.torus) objects.torus.rotation.x += rotationSpeeds.torus;
      if (visibility.dodecahedron && objects.dodecahedron) objects.dodecahedron.rotation.x += rotationSpeeds.dodecahedron;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      Object.keys(objects).forEach(key => {
        scene.remove(objects[key]);
        objects[key].geometry.dispose();
        objects[key].material.dispose();
      });
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [rotationSpeeds, visibility]);

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
    <div className='relative'>
      <div ref={canvasRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden', background:"rgb(51,51,76)"}}></div>
      <div className=" left-0 p-4 space-y-4 bg-gray-800 bg-opacity-75 rounded-md">
        <div className="flex space-x-4">
          <button
            onClick={() => handleToggleVisibility('box')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Toggle Box
          </button>
          <button
            onClick={() => handleToggleVisibility('torus')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Toggle Torus
          </button>
          <button
            onClick={() => handleToggleVisibility('dodecahedron')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Toggle Dodecahedron
          </button>
        </div>
        <div className="space-y-2">
          <label className="block">Box Speed:</label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.box}
            onChange={(e) => handleSpeedChange('box', parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.box}
            onChange={(e) => handleSpeedChange('box', parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block">Torus Speed:</label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.torus}
            onChange={(e) => handleSpeedChange('torus', parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.torus}
            onChange={(e) => handleSpeedChange('torus', parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block">Dodecahedron Speed:</label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.dodecahedron}
            onChange={(e) => handleSpeedChange('dodecahedron', parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.001"
            value={rotationSpeeds.dodecahedron}
            onChange={(e) => handleSpeedChange('dodecahedron', parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1 bg-gray-700 text-white rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Component3D;

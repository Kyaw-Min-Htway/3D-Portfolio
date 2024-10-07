import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Earth = () => {
  // Ensure the GLTF file is in the public/planet directory
  const { scene } = useGLTF('/planet/scene.gltf');

  return (
    <primitive
      object={scene}
      scale={[2.5, 2.5, 2.5]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      style={{ width: '100%', height: '100%' }} // Ensure responsiveness
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Controls */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Earth Model */}
        <Earth />
      </Suspense>

      {/* Preload Assets */}
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;

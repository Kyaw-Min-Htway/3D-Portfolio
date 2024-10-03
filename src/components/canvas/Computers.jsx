import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader'; // Assuming this is the path to your CanvasLoader

const Computers = ({ isMobile }) => {
  // Load the GLTF model
  const { scene } = useGLTF('./desktop_pc/scene.gltf');

  // useEffect(() => {
  //   // Cleanup resources when the component is unmounted to prevent memory leaks
  //   return () => scene.dispose();
  // }, [scene]);

  return (
    <mesh>
      {/* Lighting Setup */}
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={0.5} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.5} // Lower intensity to reduce GPU load
        castShadow
        shadow-mapSize={256}// Reduce shadow map size for better performance
      />
      {/* The loaded 3D model */}
      <primitive
        object={scene}
        scale={isMobile? 0.7 : 0.75}
        position={isMobile? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const handleContextLost = (event) => {
  event.preventDefault();
  console.log('WebGL context lost. Attempting to recover...');
};

const handleContextRestored = () => {
  console.log('WebGL context restored.');
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change',
      handleMediaQueryChange
    );

    return () => {
      mediaQuery.removeEventListener('change',
        handleMediaQueryChange
      );
    };
  }, []);
  return (
    <Canvas
      frameloop="demand"
      shadows={false}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        // Add WebGL context lost and restored event listeners
        gl.domElement.addEventListener('webglcontextlost', handleContextLost);
        gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false} // Disable zooming to limit user interaction
          maxPolarAngle={Math.PI / 2} // Restrict vertical rotation
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all /> {/* Preload all assets to optimize loading */}
    </Canvas>
  );
};

export default ComputersCanvas;

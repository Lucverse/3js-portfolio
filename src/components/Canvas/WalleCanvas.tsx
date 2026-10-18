"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import CanvasLoader from "@components/Loader/CanvasLoader";

function AnimatedWalleModel() {
  const { scene, animations } = useGLTF("/models/wall-eanimated.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Automatically play the waving & idle animation sequence
    if (actions && animations.length > 0) {
      const clipName = animations[0].name;
      const action = actions[clipName];
      if (action) {
        action.reset().fadeIn(0.4).play();
      }
    }
  }, [actions, animations]);

  return (
    <group position={[0, -0.85, 0]}>
      <Center top>
        <primitive
          object={scene}
          scale={0.5}
          position={[0, 0, 0]}
          rotation={[0, -0.4, 0]}
        />
      </Center>
    </group>
  );
}

// Preload the animated GLTF so it streams immediately
useGLTF.preload("/models/wall-eanimated.glb");

export default function WalleCanvas() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay canvas mount slightly so critical DOM paints first
    const timer = setTimeout(() => setShouldRender(true), 80);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) {
    return <div className="w-full h-full min-h-87.5" />;
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-none select-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          fov: 42,
          near: 0.1,
          far: 50,
          position: [0, 0.2, 4.6],
        }}
        className="w-full h-full"
      >
        {/* Crisp cinematic lighting matching portfolio palette */}
        <ambientLight intensity={1.9} />
        <directionalLight position={[4, 7, 5]} intensity={2.2} />
        <directionalLight position={[-4, 3, -4]} intensity={1.2} color="#bfae93" />
        <pointLight position={[0, -1.5, 2]} intensity={0.6} color="#bfae93" />

        <Suspense fallback={<CanvasLoader />}>
          <AnimatedWalleModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

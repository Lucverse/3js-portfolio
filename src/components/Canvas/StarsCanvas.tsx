import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const generateRandomSphere = (
  array: Float32Array,
  radius = 1.2,
): Float32Array => {
  for (let i = 0; i < array.length; i += 3) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(Math.random());

    array[i] = r * Math.sin(phi) * Math.cos(theta);
    array[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    array[i + 2] = r * Math.cos(phi);
  }
  return array;
};

const Stars: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  const [positions] = useState(() => {
    // Increased from 1500 → 3000 for a richer star field
    const points = new Float32Array(3000 * 3);
    return generateRandomSphere(points, 1.2);
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 100;
      ref.current.rotation.y -= delta / 105;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#e8dcc8" // warm white — matches the beige palette
          size={0.0018}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas: React.FC = () => {
  return (
    <div className="w-full h-auto absolute inset-0 -z-1">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;

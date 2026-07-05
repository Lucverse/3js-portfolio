import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader.js";
import * as THREE from "three";
import CanvasLoader from "@components/Loader/CanvasLoader";

const PCDViewer: React.FC = () => {
  const { camera, scene } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const meshRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const loader = new PCDLoader();
    loader.load("/human.pcd", (loadedPoints) => {
      const decimatedGeometry = loadedPoints.geometry.clone();
      const originalPosition = loadedPoints.geometry.attributes.position
        .array as Float32Array;
      const decimatedPosition: number[] = [];
      const decimationFactor = 5;

      for (let i = 0; i < originalPosition.length; i += 3 * decimationFactor) {
        decimatedPosition.push(
          originalPosition[i],
          originalPosition[i + 1],
          originalPosition[i + 2],
        );
      }

      decimatedGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(decimatedPosition, 3),
      );
      loadedPoints.geometry = decimatedGeometry;
      loadedPoints.geometry.center();
      loadedPoints.geometry.rotateX(Math.PI);
      loadedPoints.name = "human.pcd";

      const mat = loadedPoints.material as THREE.PointsMaterial;
      mat.size = 0.0001;
      mat.color = new THREE.Color("#bfae93");

      scene.add(loadedPoints);
      meshRef.current = loadedPoints;
    });

    camera.position.set(0.1, 0.2, 0.5);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera, scene]);

  // Subtle mouse-reactive drift on every frame
  useFrame(() => {
    if (meshRef.current) {
      const targetX = mouseRef.current.x * 0.025;
      const targetY = mouseRef.current.y * 0.025;
      meshRef.current.position.x +=
        (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y +=
        (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} minDistance={0.4} maxDistance={0.6} />
    </>
  );
};

const PCDCanvas: React.FC = () => {
  return (
    <Canvas className="cursor-grab min-h-[60dvh]">
      <Suspense fallback={<CanvasLoader />}>
        <PCDViewer />
      </Suspense>
    </Canvas>
  );
};

export default PCDCanvas;

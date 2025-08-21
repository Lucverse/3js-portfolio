import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../loader/CanvasLoader";

const Walle = () => {
    const walle = useGLTF("./walle/scene.gltf");

    return (
        <primitive
            object={walle.scene}
            scale={1.2}
            position={[0, -1, 0]}
            rotation-y={Math.PI / 4}
        />
    );
};

const WalleCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop='always'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Walle />

                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default WalleCanvas;

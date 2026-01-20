import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import * as THREE from 'three';

const PCDViewer = () => {
    const { camera, scene } = useThree();
    const controlsRef = useRef();

    useEffect(() => {
        const loader = new PCDLoader();
        loader.load('/human.pcd', (loadedPoints) => {
            const decimatedGeometry = loadedPoints.geometry.clone();
            const originalPosition = loadedPoints.geometry.attributes.position.array;
            const decimatedPosition = [];
            const decimationFactor = 5;

            for (let i = 0; i < originalPosition.length; i += 3 * decimationFactor) {
                decimatedPosition.push(originalPosition[i], originalPosition[i + 1], originalPosition[i + 2]);
            }

            decimatedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(decimatedPosition, 3));
            loadedPoints.geometry = decimatedGeometry;

            loadedPoints.geometry.center();
            loadedPoints.geometry.rotateX(Math.PI);
            loadedPoints.name = 'human.pcd';
            loadedPoints.material.size = 0.0001;
            scene.add(loadedPoints);
        });
        camera.position.set(0.1, 0.2, 0.5);
    }, [camera, scene]);

    return (
        <>
            <OrbitControls ref={controlsRef} minDistance={0.4} maxDistance={0.6} />
        </>
    );
};

const PCDViewerCanvas = () => {
    return (
        <Canvas style={{ cursor: 'grab', minHeight: '60dvh' }}>
            <PCDViewer />
        </Canvas>
    );
};

export default PCDViewerCanvas;
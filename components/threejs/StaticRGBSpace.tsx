// StaticRGBSpace.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { StaticRGBSceneProps } from './types';
import { createScene, createCustomAxes, createGrid, createRGBPoint } from './utils';
import styles from './style.module.css';

const StaticRGBSpace: React.FC<StaticRGBSceneProps> = ({
    points = [],
    width = window.innerWidth,
    height = window.innerHeight
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { scene, camera, renderer } = createScene(width, height);

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
        }

        // Setup scene
        createCustomAxes(scene);
        ['xy', 'xz', 'yz'].forEach(dir => createGrid(dir as 'xy' | 'xz' | 'yz', scene));
        points.forEach(point => createRGBPoint(point, scene));

        let direction = 0;
        let angle = Math.PI * (2 / 5);
        const SPEED = 0.001;
        const MAX_ANGLE = Math.PI * (2 / 3); // 180 degrees
        // Animation loop
        const animate = () => {
            angle += SPEED * direction;

            // Reverse direction when we hit the limits
            if (angle >= MAX_ANGLE || angle <= 0) {
                direction *= -1;
            }

            // camera.position.x = Math.cos(angle);
            // camera.position.z = Math.sin(angle);
            camera.lookAt(0, 0, 0);
            // camera.lookAt(.5, .5, .5);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
        };
    }, [points, width, height]);

    return <div ref={canvasRef} className={styles.canvasContainer} />;
};

export default StaticRGBSpace;  
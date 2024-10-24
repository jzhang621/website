"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimatedRGBSceneProps } from './types';
import { createScene, createCustomAxes, createGrid, normalizeRGB, createRGBPoint } from './utils';
import styles from './style.module.css';
import useAnimationTime from '@/hooks/useAnimationTime';

const AnimatedRGBSpace: React.FC<AnimatedRGBSceneProps> = ({
    startPoints = [],
    endPoints = [],
    width = window.innerWidth,
    height = window.innerHeight,
    animationDuration = 1000,
    controlMode = 'click',
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const spheresRef = useRef<THREE.Mesh[]>([]);
    const linesRef = useRef<THREE.Line[]>([]);

    const [isRunning, setIsRunning] = useState(false);
    const elapsedTime = useAnimationTime(animationDuration, isRunning);

    useEffect(() => {
        // console.log({ elapsedTime });
        const { labelRenderer, scene, camera, renderer } = createScene(width, height);

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
            canvasRef.current.appendChild(labelRenderer.domElement);
        }

        // Setup scene
        // createRGBCube(scene);
        createCustomAxes(scene);
        ['xy', 'xz', 'yz'].forEach(dir => createGrid(dir as 'xy' | 'xz' | 'yz', scene));

        // Initialize points
        spheresRef.current = [];
        linesRef.current = [];

        startPoints.forEach((point) => {
            // Create sphere
            const { sphere, line } = createRGBPoint(point, scene, 0.025);
            spheresRef.current.push(sphere);
            linesRef.current.push(line);
        });


        let direction = 0;
        let angle = Math.PI * (1 / 3);
        const SPEED = 0.001;
        const MAX_ANGLE = Math.PI * (2 / 3); // 180 degrees
        // // Animation loop
        const animate = () => {
            // angle += SPEED * direction;

            // // Reverse direction when we hit the limits
            // if (angle >= MAX_ANGLE || angle <= 0) {
            //     direction *= -1;
            // }

            // // camera.position.x = Math.cos(angle);
            // // camera.position.z = Math.sin(angle);
            // camera.lookAt(0, 0, 0);
            // labelRenderer.render(scene, camera);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);

        animate();

        const startAnimation = () => {

            const startTime = performance.now();

            const animatePoints = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / animationDuration, 1);

                startPoints.forEach((startPoint, index) => {
                    let endPoint = endPoints[index];

                    const [r1, g1, b1] = normalizeRGB(startPoint);
                    const [r2, g2, b2] = normalizeRGB(endPoint);

                    const r = THREE.MathUtils.lerp(r1, r2, progress);
                    const g = THREE.MathUtils.lerp(g1, g2, progress);
                    const b = THREE.MathUtils.lerp(b1, b2, progress);

                    const sphere = spheresRef.current[index];
                    const line = linesRef.current[index];

                    // Move the sphere
                    sphere.position.set(r, g, b);

                    sphere.position.set(r, g, b);
                    sphere.material.color.setRGB(r, g, b);

                    const positions = new Float32Array([0, 0, 0, r, g, b]);
                    line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                    line.material.color.setRGB(r, g, b);
                });

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animatePoints);
                } 
            };

            animationRef.current = requestAnimationFrame(animatePoints);
        };

        // Set up controls
        if (controlMode === 'click') {
            renderer.domElement.addEventListener('click', startAnimation);
            labelRenderer.domElement.addEventListener('click', startAnimation);
        }

        // Cleanup
        return () => {
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
                canvasRef.current.removeChild(labelRenderer.domElement);
            }
            renderer.domElement.removeEventListener('click', startAnimation);
        };
    }, [startPoints, endPoints, width, height, animationDuration, elapsedTime, isRunning]);


    return (
        <div className={`${styles.canvasContainer}`}>
            <div ref={canvasRef} />
            {/* {controlMode === 'button' && (
                <button
                    className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    onClick={() => {
                        if (!isAnimating) {
                            setIsAnimating(true);
                            const startTime = performance.now();
                            requestAnimationFrame(() => {
                                if (animationRef.current) {
                                    animationRef.current(startTime);
                                }
                            });
                        }
                    }}
                >
                    {isAnimating ? 'Animating...' : 'Transform Points'}
                </button>
            )} */}
        </div>
    );
};

export default AnimatedRGBSpace;
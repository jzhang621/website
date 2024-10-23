// AnimatedRGBSpace.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimatedRGBSceneProps } from './types';
import { createScene, createCustomAxes, createGrid, normalizeRGB } from './utils';

export const AnimatedRGBSpace: React.FC<AnimatedRGBSceneProps> = ({
    startPoints = [],
    endPoints = [],
    width = window.innerWidth,
    height = window.innerHeight,
    transformMatrix,
    animationDuration = 1000,
    controlMode = 'button',
    autoAnimate = false
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<number>();
    const spheresRef = useRef<THREE.Mesh[]>([]);
    const linesRef = useRef<THREE.Line[]>([]);

    useEffect(() => {
        const { scene, camera, renderer } = createScene(width, height);

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
        }

        // Setup scene
        createCustomAxes(scene);
        ['xy', 'xz', 'yz'].forEach(dir => createGrid(dir as 'xy' | 'xz' | 'yz', scene));

        // Initialize points
        spheresRef.current = [];
        linesRef.current = [];

        startPoints.forEach((point, index) => {
            const [r, g, b] = normalizeRGB(point);

            // Create sphere
            const sphereGeometry = new THREE.SphereGeometry(0.01, 16, 16);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(r, g, b)
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(r, g, b);
            scene.add(sphere);
            spheresRef.current.push(sphere);

            // Create line
            const lineMaterial = new THREE.LineBasicMaterial({
                color: new THREE.Color(r, g, b)
            });
            const linePoints = [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(r, g, b)
            ];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            linesRef.current.push(line);
        });

        let direction = 1;
        let angle = 0;
        const SPEED = 0.001;
        const MAX_ANGLE = Math.PI * (2 / 3); // 180 degrees
        // Animation loop
        const animate = () => {
            angle += SPEED * direction;

            // Reverse direction when we hit the limits
            if (angle >= MAX_ANGLE || angle <= 0) {
                direction *= -1;
            }

            camera.position.x = Math.cos(angle);
            camera.position.z = Math.sin(angle);
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Animation functions
        // const animate = () => {
        //     renderer.render(scene, camera);
        //     requestAnimationFrame(animate);
        // };

        const startAnimation = () => {
            if (isAnimating) return;

            const startTime = performance.now();
            const animatePoints = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / animationDuration, 1);

                startPoints.forEach((startPoint, index) => {
                    const endPoint = endPoints[index];
                    const [r1, g1, b1] = normalizeRGB(startPoint);
                    const [r2, g2, b2] = normalizeRGB(endPoint);

                    const r = THREE.MathUtils.lerp(r1, r2, progress);
                    const g = THREE.MathUtils.lerp(g1, g2, progress);
                    const b = THREE.MathUtils.lerp(b1, b2, progress);

                    const sphere = spheresRef.current[index];
                    const line = linesRef.current[index];

                    sphere.position.set(r, g, b);
                    sphere.material.color.setRGB(r, g, b);

                    const positions = new Float32Array([0, 0, 0, r, g, b]);
                    line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                    line.material.color.setRGB(r, g, b);
                });

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animatePoints);
                    setIsAnimating(true);
                } else {
                    setIsAnimating(false);
                }
            };

            animationRef.current = requestAnimationFrame(animatePoints);
        };

        // Set up controls
        if (controlMode === 'click') {
            renderer.domElement.addEventListener('click', startAnimation);
        }

        if (autoAnimate) {
            startAnimation();
        }

        animate();

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
            renderer.domElement.removeEventListener('click', startAnimation);
        };
    }, [startPoints, endPoints, width, height, animationDuration]);

    return (
        <div className="relative">
            <div ref={canvasRef} />
            {controlMode === 'button' && (
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
                    disabled={isAnimating}
                >
                    {isAnimating ? 'Animating...' : 'Transform Points'}
                </button>
            )}
        </div>
    );
};
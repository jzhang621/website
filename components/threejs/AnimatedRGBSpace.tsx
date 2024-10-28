"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimatedRGBSceneProps } from './types';
import { createScene, createCustomAxes, createGrid, normalizeRGB, createRGBPoint } from './utils';
import styles from './style.module.css';
import { useAnimationProgress } from '@/hooks/useAnimationProgress';
import ColorSwatch from '../rgb/ColorSwatch';
import { interpolateRGB } from '@/data/utils';
import { PlayArrow } from '@mui/icons-material';

const AnimatedRGBSpace: React.FC<AnimatedRGBSceneProps> = ({
    startPoints = [],
    endPoints = [],
    width = window.innerWidth,
    height = window.innerHeight,
    rotationAngle,
    animationDuration = 1000,
    cameraYPosition = 2
}) => {
    const delay = animationDuration * .25;
    // const [delay, setDelay] = useState(animationDuration * 0.5);

    const canvasRef = useRef<HTMLDivElement>(null);
    const spheresRef = useRef<THREE.Mesh[]>([]);
    const linesRef = useRef<THREE.Line[]>([]);

    const { startAnimation, progress, isRunning } = useAnimationProgress({
        duration: animationDuration,
        delay,
    });

    // Update the points based on the progress
    // Animation loop
    useEffect(() => {
        if (isRunning && progress < 1) {
            startPoints.forEach((startPoint, index) => {
                let endPoint = endPoints[index];
                const [r1, g1, b1] = normalizeRGB(startPoint);
                const [r2, g2, b2] = normalizeRGB(endPoint);

                // Normalized positions
                const r = THREE.MathUtils.lerp(r1, r2, progress);
                const g = THREE.MathUtils.lerp(g1, g2, progress);
                const b = THREE.MathUtils.lerp(b1, b2, progress);

                const newColor = new THREE.Color(r, g, b).convertSRGBToLinear();


                spheresRef.current[index].position.set(r, g, b);
                spheresRef.current[index].material.color.set(newColor);

                const positions = new Float32Array([0, 0, 0, r, g, b]);
                linesRef.current[index].geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                linesRef.current[index].material.color.set(newColor);
            });
        }
    }, [progress, isRunning]);

    // Setup the scene
    useEffect(() => {
        const { labelRenderer, scene, camera, renderer } = createScene(width, height);

        if (rotationAngle !== undefined) {
            const angle = Math.PI / 180 * rotationAngle;
            camera.position.set(Math.cos(angle), cameraYPosition, Math.sin(angle));
            camera.lookAt(0, 0, 0);
        }

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
            // canvasRef.current.appendChild(labelRenderer.domElement);
        }

        // Setup scene
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


        let direction = 1;
        let angle = Math.PI * (1 / 3);
        const SPEED = 0.001;
        const MAX_ANGLE = Math.PI * (2 / 3); // 180 degrees
        // // Animation loop
        const animate = () => {
            angle += SPEED * direction;

            // Reverse direction when we hit the limits
            if (angle >= MAX_ANGLE || angle <= 0) {
                direction *= -1;
            }

            camera.position.x = Math.cos(angle);
            camera.position.z = Math.sin(angle);
            camera.lookAt(0, 0, 0);
            labelRenderer.render(scene, camera);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };



        animate();


        // Cleanup
        return () => {
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
                // canvasRef.current.removeChild(labelRenderer.domElement);
            }
        };
    }, []);

    return (
        <div className={`${styles.canvasContainer}`}>

            <div className={"relative mx-auto w-full"} style={{ width: `${width}px`, height: `${height}px` }}>
                <div ref={canvasRef} />

                <button
                    className={`bg-[rgb(253,226,154,128)] hover:bg-[#FCD468] cursor-pointer
                absolute w-8 h-8 flex items-center justify-center rounded-md top-4 left-4`}
                    tabIndex={0}
                    onClick={() => startAnimation()}
                >
                    <PlayArrow className="text-amber-500 w-8 h-8 hover:text-amber-600" />
                </button>

                {/* <div className="absolute top-4 right-4">
                    <ColorSwatch rgb={interpolateRGB(startPoints[0], endPoints[0], animationDuration, progress * animationDuration)} />
                </div> */}

            </div>
            {/* <ColorSwatch rgb={interpolateRGB(startPoints[0], endPoints[0], animationDuration, progress * animationDuration)} /> */}
        </div>
    );
};

export default AnimatedRGBSpace;

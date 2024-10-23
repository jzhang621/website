"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RGBSceneProps {
    points?: Array<[number, number, number]>;
    width?: number;
    height?: number;
    transformMatrix?: number[][];
    animationDuration?: number;
    autoAnimate?: boolean;
    controlMode?: 'click' | 'button' | 'auto';
}

// ... (previous helper functions remain the same until RGBSpace component)

const RGBSpace: React.FC<RGBSceneProps> = ({
    points = [],
    width = window.innerWidth,
    height = window.innerHeight,
    transformMatrix = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ],
    animationDuration = 1000,
    controlMode = 'button',
    autoAnimate = false
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<number>();
    const sceneRef = useRef<THREE.Scene>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const spheresRef = useRef<THREE.Mesh[]>([]);
    const linesRef = useRef<THREE.Line[]>([]);

    const setupScene = () => {
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(5, 1, 5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current = renderer;
        renderer.setSize(width, height);

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
        }

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        createGrid('xy', scene);
        createGrid('xz', scene);
        createGrid('yz', scene);
        createCustomAxes(scene);

        return { scene, camera, renderer };
    };

    const initializePoints = (scene: THREE.Scene) => {
        spheresRef.current = [];
        linesRef.current = [];

        points.forEach((point) => {
            const [r, g, b] = point.map(v => v / 255);

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
    };

    const applyTransformMatrix = (rgbVector: number[], matrix: number[][]) => {
        const [r, g, b] = rgbVector;
        const [mr, mg, mb] = matrix;
        return [
            Math.min(1, Math.max(0, r * mr[0] + g * mr[1] + b * mr[2])),
            Math.min(1, Math.max(0, r * mg[0] + g * mg[1] + b * mg[2])),
            Math.min(1, Math.max(0, r * mb[0] + g * mb[1] + b * mb[2]))
        ];
    };

    const animatePoints = (startTime: number = performance.now()) => {
        if (!sceneRef.current || !rendererRef.current) return;

        const elapsedTime = performance.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        points.forEach((point, index) => {
            const [rStart, gStart, bStart] = point.map(v => v / 255);
            const [rEnd, gEnd, bEnd] = applyTransformMatrix(
                [rStart, gStart, bStart],
                transformMatrix
            );

            const r = THREE.MathUtils.lerp(rStart, rEnd, progress);
            const g = THREE.MathUtils.lerp(gStart, gEnd, progress);
            const b = THREE.MathUtils.lerp(bStart, bEnd, progress);

            const sphere = spheresRef.current[index];
            const line = linesRef.current[index];

            if (sphere && line) {
                sphere.position.set(r, g, b);
                sphere.material.color.setRGB(r, g, b);

                const lineGeometry = line.geometry;
                const positions = new Float32Array([
                    0, 0, 0,
                    r, g, b
                ]);
                lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                line.material.color.setRGB(r, g, b);
            }
        });

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(() => animatePoints(startTime));
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
        }
    };

    const startAnimation = () => {
        if (isAnimating) return;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        animatePoints();
    };

    useEffect(() => {
        const { scene, camera, renderer } = setupScene();
        initializePoints(scene);

        let cameraRotationFrame: number;
        const animate = () => {
            renderer.render(scene, camera);
            cameraRotationFrame = requestAnimationFrame(animate);
        };
        animate();

        if (controlMode === 'click') {
            renderer.domElement.addEventListener('click', startAnimation);
        }

        if (autoAnimate) {
            startAnimation();
        }

        return () => {
            cancelAnimationFrame(cameraRotationFrame);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (renderer.domElement) {
                renderer.domElement.removeEventListener('click', startAnimation);
            }
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
        };
    }, [points, transformMatrix]);

    return (
        <div className="relative">
            <div ref={canvasRef} />
            {controlMode === 'button' && (
                <button
                    className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    onClick={startAnimation}
                    disabled={isAnimating}
                >
                    {isAnimating ? 'Animating...' : 'Transform Points'}
                </button>
            )}
        </div>
    );
};

export default RGBSpace;
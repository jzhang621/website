// StaticRGBSpace.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { StaticRGBSceneProps } from './types';
import { createScene, createCustomAxes, createGrid, createRGBPoint } from './utils';
import styles from './style.module.css';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';


const StaticRGBSpace: React.FC<StaticRGBSceneProps> = ({
    points = [],
    width = window.innerWidth,
    height = window.innerHeight
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { labelRenderer, scene, camera, renderer } = createScene(width, height);

        if (canvasRef.current) {
            canvasRef.current.appendChild(renderer.domElement);
            // canvasRef.current.appendChild(labelRenderer.domElement);
        }

        // Setup scene
        createCustomAxes(scene);
        ['xy', 'xz', 'yz'].forEach(dir => createGrid(dir as 'xy' | 'xz' | 'yz', scene));
        points.forEach(point => createRGBPoint(point, scene, .025));

        // renderer.render(scene, camera);

        // Create the SVG renderer
        // const svgRenderer = new SVGRenderer();
        // svgRenderer.setSize(width, height);
        // document.body.appendChild(svgRenderer.domElement);

        // // Render the scene using the SVG renderer
        // svgRenderer.render(scene, camera);

        // // Export the SVG content
        // const svgElement = svgRenderer.domElement;

        // // Optionally save the SVG to a file or copy it to clipboard
        // const svgData = new XMLSerializer().serializeToString(svgElement);
        // const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        // const url = URL.createObjectURL(blob);

        // const link = document.createElement("a");
        // link.href = url;
        // link.download = "scene.svg";
        // link.click();

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
            labelRenderer.render(scene, camera);
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
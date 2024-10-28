
// utils.ts
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';




export const normalizeRGB = (rgb: [number, number, number]): [number, number, number] => {
    return rgb.map(v => v / 255) as [number, number, number];
};

export const createScene = (width: number, height: number) => {
    const scene = new THREE.Scene();

    const fov = 75;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);

    let angle = Math.PI / 5;

    camera.position.set(Math.cos(angle), 1.85, Math.sin(angle));
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Enable alpha on renderer
    renderer.setClearColor(0x000000, 0); // Set background color to black but fully transparent (alpha = 0)
    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadow map

    const light = new THREE.DirectionalLight(0xffffff, 1);

    // light.position.set(5, 10, 5);
    light.castShadow = true; // Enable shadow casting
    scene.add(light);

    // Configure shadow properties
    light.shadow.mapSize.width = 1024; // Increase the shadow map resolution
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5; // Adjust near and far clipping planes of the shadow camera
    light.shadow.camera.far = 500;

    // Create a plane (shadow-receiving surface)
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.15 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    plane.receiveShadow = true; // Enable shadow receiving
    scene.add(plane);

    // Add CSS2DRenderer to the scene
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';


    // Create labels
    const createLabel = (text: string, position: { x: number, y: number, z: number }, color = '#ffffff') => {
        const div = document.createElement('div');
        div.className = 'label';
        div.textContent = text;
        div.style.color = color;
        div.style.fontSize = '14px';
        div.style.fontFamily = 'sans-serif';
        div.style.fontWeight = '500';


        const label = new CSS2DObject(div);
        label.position.set(position.x, position.y, position.z);
        scene.add(label);
    };

    // X Axis Label
    createLabel("[255, 0, 0]", { x: 1.1, y: 0, z: 0 }, '#ff0000');

    // Y Axis Label
    createLabel("[0, 255, 0]", { y: 1.05, x: 0, z: 0 }, '#00ff00');

    // Z Axis Label
    createLabel("[0, 0, 255]", { x: 0, y: 0, z: 1.1 }, '#0000ff');


    return { labelRenderer, scene, camera, renderer, light }
};


export function createCustomAxes(scene: THREE.Scene) {

    const axisLength = 1;
    const axisRadius = 0.0085;  // Adjust this value to control thickness

    // Red X Axis (use CylinderGeometry)
    const xAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 32);
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const xAxis = new THREE.Mesh(xAxisGeometry, redMaterial);
    xAxis.rotation.z = Math.PI / 2; // Rotate cylinder to align with X axis
    xAxis.position.set(axisLength / 2, 0, 0); // Move to correct position

    // Green Y Axis
    const yAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 32);
    const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const yAxis = new THREE.Mesh(yAxisGeometry, greenMaterial);
    yAxis.position.set(0, axisLength / 2, 0); // Center on Y axis

    // Blue Z Axis
    const zAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 32);
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const zAxis = new THREE.Mesh(zAxisGeometry, blueMaterial);
    zAxis.rotation.x = Math.PI / 2; // Rotate to align with Z axis
    zAxis.position.set(0, 0, axisLength / 2);

    // Add axes to the scene
    scene.add(xAxis);
    scene.add(yAxis);
    scene.add(zAxis);
}

export const createGrid = (direction: 'xy' | 'xz' | 'yz', scene: THREE.Scene) => {
    const gridSize = 1;
    const divisions = 4;
    const gridColor = 0xffffff;
    const gridOpacity = 0.5;


    const grid = new THREE.GridHelper(gridSize, divisions, gridColor, gridColor);
    grid.material.opacity = gridOpacity;
    grid.material.transparent = true;

    switch (direction) {
        case 'xy':
            grid.rotation.x = Math.PI / 2;
            grid.position.set(0.5, 0.5, 0);
            break;
        case 'xz':
            grid.position.set(0.5, 0, 0.5);
            break;
        case 'yz':
            grid.rotation.z = Math.PI / 2;
            grid.position.set(0, 0.5, 0.5);
            break;
    }

    scene.add(grid);
};

export const createRGBPoint = (rgb: [number, number, number], scene: THREE.Scene, size = 0.025) => {
    const [r, g, b] = normalizeRGB(rgb);

    const sphereGeometry = new THREE.SphereGeometry(size, 16, 16);

    const color = new THREE.Color(r, g, b).convertSRGBToLinear();
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(r, g, b);
    sphere.castShadow = true; // Enable shadow casting
    scene.add(sphere);

    const lineMaterial = new THREE.LineBasicMaterial({
        color
    });
    const linePoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(r, g, b)
    ];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const line = new THREE.Line(lineGeometry, lineMaterial);

    line.castShadow = true; // Enable shadow casting
    scene.add(line);

    return { sphere, line };
};

export const createRGBCube = (scene: THREE.Scene) => {
    const cubeSize = 1; // Size of the cube to fit in RGB space (0-1 range)
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Use a semi-transparent material to visualize the cube without blocking the points inside
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.1,    // Set opacity to make it partially transparent
        transparent: true,
        side: THREE.BackSide // Render inside the cube
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // Position the cube so its edges are from (0,0,0) to (1,1,1)
    cube.position.set(0.5, 0.5, 0.5); // Move cube to center the RGB space

    scene.add(cube);
};

// utils.ts
import * as THREE from 'three';


export const normalizeRGB = (rgb: [number, number, number]): [number, number, number] => {
    return rgb.map(v => v / 255) as [number, number, number];
};

export const createScene = (width: number, height: number) => {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffffff);
    // scene.background = new THREE.Color(0xD0F0C0);
    // scene.background = new THREE.Color(0x4B0082);
    // scene.background = new THREE.Color(0x001f3f);
    // scene.background = new THREE.Color(0xfafafa);
    scene.background = new THREE.Color(0xEDE7E3);
    // scene.background = new THREE.Color(0x1E3D59);

    const fov = 75;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    // camera.position.set(3, 3, 3);
    camera.position.set(1.35, 1.35, 1.35);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    return { scene, camera, renderer };
};


export function createCustomAxes(scene: THREE.Scene) {
    const axisLength = 1;
    const axisRadius = 0.005;  // Adjust this value to control thickness

    // Red X Axis (use CylinderGeometry)
    const xAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 32);
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0xaa0000 });
    const xAxis = new THREE.Mesh(xAxisGeometry, redMaterial);
    xAxis.rotation.z = Math.PI / 2; // Rotate cylinder to align with X axis
    xAxis.position.set(axisLength / 2, 0, 0); // Move to correct position
  
    // Green Y Axis
    const yAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 32);
    const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ee00 });
    const yAxis = new THREE.Mesh(yAxisGeometry, greenMaterial);
    yAxis.position.set(0, axisLength / 2, 0); // Center on Y axis
  
    // Blue Z Axis
    const zAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 32);
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ee });
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

export const createRGBPoint = (rgb: [number, number, number], scene: THREE.Scene, size = 0.02) => {
    const [r, g, b] = normalizeRGB(rgb);

    const sphereGeometry = new THREE.SphereGeometry(size, 16, 16);
    // const sphereMaterial = new THREE.MeshBasicMaterial({
    //     color: new THREE.Color(r, g, b)
    // });

    const color = new THREE.Color(r, g, b).convertSRGBToLinear();
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(r, g, b);
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
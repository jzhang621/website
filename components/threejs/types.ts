// types.ts
export interface Point3D {
    x: number;
    y: number;
    z: number;
}

export interface RGBPoint {
    r: number;
    g: number;
    b: number;
}

export interface BaseRGBSceneProps {
    width?: number;
    height?: number;
}

export interface StaticRGBSceneProps extends BaseRGBSceneProps {
    points: Array<[number, number, number]>;
}

export interface AnimatedRGBSceneProps extends BaseRGBSceneProps {
    startPoints: Array<[number, number, number]>;
    endPoints: Array<[number, number, number]>;
    transformMatrix?: number[][];
    animationDuration?: number;
    controlMode?: 'click' | 'button' | 'auto';
    autoAnimate?: boolean;
}
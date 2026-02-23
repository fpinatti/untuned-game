"use client";

import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function Lights() {
    const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                ref={directionalLightRef}
                position={[10, 10, 10]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
            <hemisphereLight intensity={0.3} groundColor="black" />
        </>
    );
}

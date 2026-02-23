"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Sky, Stars, Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Lights } from "./Lights";
import { SpherePlayer } from "./SpherePlayer";
import { Corridor } from "./Corridor";
import { useGameStore } from "@/store/use-game-store";

export function Experience() {
    const { gameStarted } = useGameStore();

    return (
        <Canvas shadows className="bg-slate-950">
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

            <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="night" />

            <Lights />

            <Physics gravity={[0, 0, 0]}>
                <SpherePlayer />
                <Corridor />
            </Physics>

        </Canvas>
    );
}

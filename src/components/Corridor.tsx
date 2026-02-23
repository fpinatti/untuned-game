"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Plank } from "./Plank";
import { useGameStore } from "@/store/use-game-store";
import * as THREE from "three";

const SEGMENT_SIZE = 20;
const VISIBLE_SEGMENTS = 10;

export function Corridor() {
    const group = useRef<THREE.Group>(null!);
    const { gameStarted, isGameOver } = useGameStore();
    const [zOffset, setZOffset] = useState(0);

    // Generate random holes
    const planks = useMemo(() => {
        return Array.from({ length: 100 }, (_, i) => ({
            z: -i * SEGMENT_SIZE - 20,
            holeY: (Math.random() - 0.5) * 8, // Range from -4 to 4
        }));
    }, []);

    useFrame((state, delta) => {
        if (!gameStarted || isGameOver) return;

        // Move the group towards the camera
        group.current.position.z += delta * 5; // Speed
    });

    return (
        <group ref={group}>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, -500]}>
                <planeGeometry args={[20, 1000]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, -500]}>
                <planeGeometry args={[20, 1000]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Walls */}
            <mesh position={[-10, 0, -500]}>
                <boxGeometry args={[0.5, 12, 1000]} />
                <meshStandardMaterial color="#050505" />
            </mesh>
            <mesh position={[10, 0, -500]}>
                <boxGeometry args={[0.5, 12, 1000]} />
                <meshStandardMaterial color="#050505" />
            </mesh>

            {planks.map((plank, i) => (
                <Plank key={i} position={[0, 0, plank.z]} holeY={plank.holeY} />
            ))}
        </group>
    );
}

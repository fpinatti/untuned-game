"use client";

import { RigidBody } from "@react-three/rapier";
import { MeshDistortMaterial } from "@react-three/drei";
import { useGameStore } from "@/store/use-game-store";

interface PlankProps {
    position: [number, number, number];
    holeY: number;
}

export function Plank({ position, holeY }: PlankProps) {
    const { setGameOver, incrementScore } = useGameStore();

    return (
        <group position={position}>
            {/* Top Part */}
            <RigidBody
                type="fixed"
                colliders="cuboid"
                onCollisionEnter={() => setGameOver(true)}
            >
                <mesh position={[0, (holeY + 6) / 2 + 0.5, 0]}>
                    <boxGeometry args={[20, 5 - holeY + 5, 0.5]} />
                    <meshStandardMaterial color="#333" roughness={0.5} />
                </mesh>
            </RigidBody>

            {/* Bottom Part */}
            <RigidBody
                type="fixed"
                colliders="cuboid"
                onCollisionEnter={() => setGameOver(true)}
            >
                <mesh position={[0, (holeY - 6) / 2 - 0.5, 0]}>
                    <boxGeometry args={[20, holeY + 5 + 5, 0.5]} />
                    <meshStandardMaterial color="#333" roughness={0.5} />
                </mesh>
            </RigidBody>

            {/* Target Zone (Invisible trigger for scoring) */}
            <RigidBody
                type="fixed"
                colliders="cuboid"
                sensor
                onIntersectionEnter={() => incrementScore()}
            >
                <mesh position={[0, holeY, 0]}>
                    <boxGeometry args={[2, 1, 0.1]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>
            </RigidBody>

            {/* Visual indicator for the hole */}
            <mesh position={[0, holeY, 0]} rotation={[0, 0, 0]}>
                <ringGeometry args={[0.6, 0.7, 32]} />
                <meshBasicMaterial color="#ff00ff" />
            </mesh>
        </group>
    );
}

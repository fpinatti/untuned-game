"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { usePitch } from "@/hooks/use-pitch";
import { useGameStore } from "@/store/use-game-store";
import { frequencyToY } from "@/utils/math";
import * as THREE from "three";
import { Trail } from "@react-three/drei";

export function SpherePlayer() {
    const rb = useRef<RapierRigidBody>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);
    const { pitch, clarity } = usePitch();
    const { setPitch, setYPosition, gameStarted, isGameOver } = useGameStore();

    useFrame((state, delta) => {
        if (!gameStarted || isGameOver) return;

        if (pitch && clarity > 0.8) {
            const targetY = frequencyToY(pitch);
            setPitch(pitch);
            setYPosition(targetY);

            // Smoothly move the sphere to the target Y
            const currentPos = rb.current.translation();
            rb.current.setTranslation(
                { x: 0, y: THREE.MathUtils.lerp(currentPos.y, targetY, 0.1), z: 0 },
                true
            );
        }
    });

    return (
        <group>
            <RigidBody
                ref={rb}
                type="kinematicPosition"
                colliders="ball"
                position={[0, 0, 0]}
                onCollisionEnter={() => {
                    // We'll handle collision in the Corridor or here
                }}
            >
                <mesh ref={meshRef} castShadow>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={2}
                        roughness={0}
                        metalness={1}
                    />
                </mesh>

                <pointLight intensity={2} color="#00ffff" distance={5} />
            </RigidBody>

            <Trail
                width={1}
                length={5}
                color={new THREE.Color("#00ffff")}
                attenuation={(t) => t * t}
            >
                <mesh>
                    <sphereGeometry args={[0.1]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>
            </Trail>
        </group>
    );
}

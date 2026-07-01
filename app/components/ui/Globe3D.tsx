"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function usePrimaryColor() {
  const [color, setColor] = useState("#8B5CF6");

  useEffect(() => {
    const primary =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-color")
        .trim() || "#8B5CF6";
    setColor(primary);
  }, []);

  return color;
}

const createGlobeDots = (accentColor: string) => {
    const dots = [];
    const samples = 4000;
    const phi = Math.PI * (3 - Math.sqrt(5));
    const radius = 5;

    for (let i = 0; i < samples; i++) {
        const y = 1 - (i / (samples - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        dots.push({
            pos: new THREE.Vector3(x * radius, y * radius, z * radius),
            color: Math.random() > 0.8 ? accentColor : "#475569",
            size: Math.random() > 0.9 ? 0.08 : 0.03
        });
    }
    return dots;
};

function DottedGlobe({ accentColor }: { accentColor: string }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { dots, tempObject } = useMemo(() => {
        const tempObject = new THREE.Object3D();
        const dots = createGlobeDots(accentColor);
        return { dots, tempObject };
    }, [accentColor]);

    useEffect(() => {
        if (meshRef.current) {
            dots.forEach((dot, i) => {
                tempObject.position.copy(dot.pos);
                tempObject.scale.set(1, 1, 1);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [dots, tempObject]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, dots.length]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive={accentColor}
                emissiveIntensity={0.5}
                roughness={0.5}
                metalness={0.8}
            />
        </instancedMesh>
    );
}

function Rings({ accentColor }: { accentColor: string }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.rotation.z += 0.005;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[6, 0.02, 16, 100]} />
                <meshBasicMaterial color={accentColor} opacity={0.2} transparent />
            </mesh>
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[7, 0.02, 16, 100]} />
                <meshBasicMaterial color={accentColor} opacity={0.1} transparent />
            </mesh>
        </group>
    )
}

export function Globe3D() {
    const accentColor = usePrimaryColor();

    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={accentColor} />
                <DottedGlobe accentColor={accentColor} />
                <Rings accentColor={accentColor} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}

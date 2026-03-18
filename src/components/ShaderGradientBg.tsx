"use client";

import dynamic from "next/dynamic";

const ShaderGradientCanvas = dynamic(
  () => import("shadergradient").then((m) => m.ShaderGradientCanvas),
  { ssr: false }
);

const ShaderGradient = dynamic(
  () => import("shadergradient").then((m) => m.ShaderGradient),
  { ssr: false }
);

export default function ShaderGradientBg() {
  return (
    <ShaderGradientCanvas
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ShaderGradient
        animate="on"
        brightness={1.2}
        cAzimuthAngle={180}
        cDistance={3.61}
        cPolarAngle={90}
        cameraZoom={1.31}
        color1="#365aff"
        color2="#5cdbbd"
        color3="#99e1bd"
        envPreset="city"
        grain="on"
        lightType="3d"
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        rangeEnd={40}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        type="sphere"
        uAmplitude={1.9}
        uDensity={1.2}
        uFrequency={5.5}
        uSpeed={0.2}
        uStrength={6.5}
        uTime={0}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  );
}

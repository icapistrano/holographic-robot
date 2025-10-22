import { MathUtils, Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const CameraController = () => {
  const targetX = useRef(0);
  const lookAtTarget = useRef(new Vector3(0, 0.5, 0));

  useFrame(({ camera, pointer }) => {
    // Map mouse x between -0.5 and 0.5
    const mappedX = pointer.x * 0.5;

    // Smooth interpolation (lerp) for easing
    targetX.current = MathUtils.lerp(targetX.current, mappedX, 0.05);
    camera.position.x = targetX.current;

    // Keep camera focused on robot
    const { x, y, z } = lookAtTarget.current;
    camera.lookAt(x, y, z);
  });

  return <PerspectiveCamera makeDefault position={[0, 0.75, 2.2]} />;
};

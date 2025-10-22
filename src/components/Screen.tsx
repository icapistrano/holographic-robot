import { ShaderMaterial, Uniform } from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useMemo } from "react";
import screenVertexShader from "../shaders/screen/vertex.glsl";
import screenFragmentShader from "../shaders/screen/fragment.glsl";

export const Screen: FC<{
  width: number;
  height: number;
  textureSrc: string;
}> = ({ width, height, textureSrc }) => {
  const texture = useTexture(textureSrc);

  const screenMaterial = useMemo(() => {
    return new ShaderMaterial({
      transparent: true,
      vertexShader: screenVertexShader,
      fragmentShader: screenFragmentShader,
      uniforms: {
        uTime: new Uniform(0),
        uAmplitude: new Uniform(0.01),
        uTexture: new Uniform(texture),
        uAspectRatio: new Uniform(height / width),
      },
    });
  }, []);

  useFrame(({ clock }) => {
    screenMaterial.uniforms.uTime.value =
      Math.sin(clock.elapsedTime * 5) * 0.005;
  });

  return (
    <mesh material={screenMaterial}>
      <planeGeometry args={[width, height, 32, 32]} />
    </mesh>
  );
};

import {
  AdditiveBlending,
  Color,
  DoubleSide,
  ShaderMaterial,
  Uniform,
} from "three";
import { useMemo } from "react";
import holographicVertexShader from "../shaders/holographic/vertex.glsl";
import holographicFragmentShader from "../shaders/holographic/fragment.glsl";

export const Platform = () => {
  const height = 1;
  const radiusTop = 0.8;
  const radiusBottom = 0.4;
  const ringThickness = 0.03;

  const platformMaterial = useMemo(() => {
    return new ShaderMaterial({
      side: DoubleSide,
      depthWrite: false,
      transparent: true,
      blending: AdditiveBlending,
      vertexShader: holographicVertexShader,
      fragmentShader: holographicFragmentShader,
      uniforms: {
        uColor: new Uniform(new Color("#12d0ff")),
        uDecay: new Uniform(7.0),
        uFresnelStrength: new Uniform(2.0),
      },
    });
  }, []);

  return (
    <group>
      <mesh material={platformMaterial} position={[0, height / 2, 0]}>
        <cylinderGeometry
          args={[radiusTop, radiusBottom, height, 32, 4, true]}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radiusBottom - ringThickness, radiusBottom, 64]} />
        <meshBasicMaterial color="#12d0ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

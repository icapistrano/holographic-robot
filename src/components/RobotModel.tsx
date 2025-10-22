import {
  AdditiveBlending,
  Color,
  DoubleSide,
  ShaderMaterial,
  Uniform,
} from "three";
import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Screen } from "./Screen";
import platformVertexShader from "../shaders/holographic/vertex.glsl";
import platformFragmentShader from "../shaders/holographic/fragment.glsl";

type GLTFResult = GLTF & {
  nodes: {
    geometry_0: THREE.Mesh;
  };
  materials: {};
};

const robotModelPath = import.meta.env.BASE_URL + "model-draco.glb";
const wavePath = import.meta.env.BASE_URL + "wave.png";

export const RobotModel = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes } = useGLTF(robotModelPath) as GLTFResult;

  const planeWidth = 1;
  const planeHeight = 0.7;

  const holographicMaterial = useMemo(() => {
    return new ShaderMaterial({
      side: DoubleSide,
      depthWrite: false,
      transparent: true,
      blending: AdditiveBlending,
      vertexShader: platformVertexShader,
      fragmentShader: platformFragmentShader,
      uniforms: {
        uColor: new Uniform(new Color("#12d0ff")),
        uDecay: new Uniform(0.5),
        uFresnelStrength: new Uniform(1.5),
      },
    });
  }, []);

  return (
    <group {...props} dispose={null} position={[0, 0.5, 0]}>
      <mesh
        scale={0.5}
        geometry={nodes.geometry_0.geometry}
        material={holographicMaterial}
      >
        <group position={[0, 0.55, 0.2]}>
          <Screen
            width={planeWidth}
            height={planeHeight}
            textureSrc={wavePath}
          />
        </group>
      </mesh>
    </group>
  );
};

useGLTF.preload(robotModelPath);

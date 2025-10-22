import { Grid } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Platform } from "./components/Platform";
import { RobotModel } from "./components/RobotModel";
import { CameraController } from "./components/CameraController";

function App() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <color attach="background" args={["#000000"]} />
        <CameraController />

        <RobotModel />
        <Platform />
        <Grid
          position={[0, -0.01, 0]} // slightly below the robot
          sectionSize={0.2}
          sectionThickness={2}
          sectionColor="#0186d4"
          fadeDistance={5}
          fadeStrength={3}
          infiniteGrid
        />
      </Canvas>
    </div>
  );
}

export default App;


import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";

function Model(props) {
  const { scene } = useGLTF("/static/models2/scene.gltf");

  scene.position.set(0, 0, 0);
  useFrame(() => {
    scene.rotation.y += 0.01;
  });
  return <primitive object={scene} {...props} />;

  //   return <primitive object={scene} {...props} />;
}

function ThreeDScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        //   style={{ position: "absolute" }}
      >
        <color attach="background" args={["#010101"]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={1}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null} intensity={0.03}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

export default ThreeDScene;
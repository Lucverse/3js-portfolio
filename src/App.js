import './App.css';
import data from './data.json';
import Username from './components/username/username';
import BasicDetails from './components/basicDetail/basicDetail';
import Breaker from './components/breaker/breaker';
import Timeline from './components/timeline/timeline';
import BubbleEffect from './components/bubbleEffect/bubbleEffect';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import Earth from './components/earth/Earth';
function App() {
  return (
    <div className='main-div'>
      <div className='first-div'>
        <Username username={data.name} />
        <div className='canvas-div'>
          <Canvas shadows camera={{ position: [0, 3, 3], fov: 30 }}>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate enableRotate={false} />
            <Earth />
            <ambientLight intensity={0.5} />
            <Environment preset='sunset' />
            <ContactShadows opacity={0.4} position={[0, -0.5, 0]} scale={2} blur={10} far={4} resolution={256} color={"#000000"} />
          </Canvas>
        </div>
      </div>
      <Breaker/>
      <Breaker/>

      <BasicDetails BasicDetails={data.basicDetails} />
      <Breaker/>
      <Timeline projects={data.projects}/>
      {/* <BubbleEffect/> */}
    </div>
  );
}

export default App;

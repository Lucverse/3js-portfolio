import './App.css';
import data from './data.json';
import Username from './components/username/username';
import BasicDetails from './components/basicDetail/basicDetail';
import Breaker from './components/breaker/breaker';
import Timeline from './components/timeline/timeline';
import ComputersCanvas from './components/computer/Computer';
function App() {
  return (
    <div className='main-div'>
      <div className='first-div'>
        <Username username={data.name} />
        <div className='canvas-div'>
          <ComputersCanvas />
        </div>
      </div>
      <Breaker />
      <Breaker />      
      <BasicDetails BasicDetails={data.basicDetails} />
      <Breaker />
      <Timeline projects={data.projects} />
    </div>
  );
}

export default App;

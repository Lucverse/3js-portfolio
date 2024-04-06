import './App.css';
import data from './data.json';
import Username from './components/username/username';
import BasicDetails from './components/basicDetail/basicDetail';
import Breaker from './components/breaker/breaker';
import Timeline from './components/timeline/timeline';
import BubbleEffect from './components/bubbleEffect/bubbleEffect';

function App() {
  return (
    <div className='main-div'>
      <Username username={data.name} />
      <Breaker />
      <BasicDetails BasicDetails={data.basicDetails} />
      <Breaker/>
      <Timeline projects={data.projects}/>
      <BubbleEffect/>
    </div>
  );
}

export default App;

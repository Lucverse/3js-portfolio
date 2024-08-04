import './App.css';
import data from './data.json';
import Username from './components/username/username';
import BasicDetails from './components/basicDetail/basicDetail';
import Breaker from './components/breaker/breaker';
import Timeline from './components/timeline/timeline';
import ThreeScene from './components/human/human';
import Footer from './components/footer/footer';
function App() {
  return (
    <div className='main-div'>
      <div className='first-div'>
        <div className='basic-info'>
          <Username username={data.name} />
          <BasicDetails BasicDetails={data.title} />
        </div>
        <div className='canvas-div'>
          <ThreeScene />
        </div>
      </div>
      <Breaker />
      <Breaker />
      <Breaker />
      <Timeline projects={data.projects} />
      <Footer footerInfo={data.footerUrls} />
    </div>
  );
}

export default App;

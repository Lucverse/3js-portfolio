import './App.css';
import data from './data.json';
import Username from './components/username/username';
import BasicDetails from './components/basicDetail/basicDetail';
import Timeline from './components/timeline/timeline';
import Footer from './components/footer/footer';
import Socials from './components/socials/Socials';
import Journey from './components/journey/journey';
import Navbar from './components/navbar/Navbar';
import ConsoleCommands from './components/console/ConsoleCommands';
import EarthCanvas from './components/canvas/Earth';
import StarsCanvas from './components/canvas/Stars';

function App() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div className='stars-canvas' style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh', zIndex: -1 }}>
        <StarsCanvas />
      </div>
      <div className='main-div'>
        <Navbar />
        <ConsoleCommands />
        <div className='first-div' id='home'>
          <div className='basic-info'>
            <Username username={data.name} />
            <BasicDetails BasicDetails={data} />
            <Socials socialLinks={data.socialLinks} />
          </div>
          <div className='canvas-div'>
            <EarthCanvas />
          </div>
        </div>
        <Journey educationData={data.educationData} experienceData={data.experienceData} />
        <Timeline projects={data.projects} />
        <Footer footerInfo={data.socialLinks} />
      </div>

    </div>
  );
}

export default App;

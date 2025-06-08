import './App.css';
import data from './data.json';
import Username from './components/username/username';
import BasicDetails from './components/basicDetail/basicDetail';
import Timeline from './components/timeline/timeline';
import ThreeScene from './components/human/human';
import Footer from './components/footer/footer';
import Socials from './components/socials/Socials';
import Journey from './components/journey/journey';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className='main-div'>
      <Navbar />
      <div className='first-div' id='home'>
        <div className='basic-info'>
          <Username username={data.name} />
          <BasicDetails BasicDetails={data.title} />
          <Socials socialLinks={data.socialLinks} />
        </div>
        <div className='canvas-div'>
          <ThreeScene />
        </div>
      </div>
      <Journey educationData={data.educationData} experienceData={data.experienceData} />
      <Timeline projects={data.projects} />
      <Footer footerInfo={data.socialLinks} />
    </div>
  );
}

export default App;

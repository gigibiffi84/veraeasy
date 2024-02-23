import 'bulma/css/bulma.css'
import AlexaImage from './images/alexa.png';
import SiriImage from './images/siri.png';
import CortanaImage from './images/cortana.png';
import searchImages from './api';

import './App.css';
import AddButton from './Components/AddButton';
import ProfileCard from './Components/ProfileCard';
import { useEffect } from 'react';
import SearchBar from './Components/SearchBar';


console.log(AlexaImage);
console.log(SiriImage);
const imageFake = 'https://picsum.photos/id/237/1280/960';
const imgFake2 = 'https://picsum.photos/id/189/1280/960';
const imgFake3 = 'https://picsum.photos/id/189/196/960';

function App() {

  const pdas = [
    {
      id: 0,
      title: "Alexa",
      handle: "@alex999",
      logo: AlexaImage,
      description: 'Alexa image assistant'
    },
    {
      id: 1,
      title: "Cortana",
      handle: "@cortana32",
      logo: CortanaImage,
      description: 'Cortana image assistant'
    },
    {
      id: 2,
      title: "Siri",
      handle: "@siri",
      logo: SiriImage,
      description: 'Siri image assistant'
    }
  ]

  useEffect(()=>{
    //searchImages();
  }, [])

  const handleSubmit = () => {
    console.log('event submit received');
  }

  return (
    <div>
      <section className='her is-primary'>
        <div className='hero-body'>
          <p className='title'>Personal Digital Assistants</p>
          <SearchBar onSubmit={handleSubmit}></SearchBar>
        </div>

      </section>
      <div className='container'>
        <section key="section" className='section'>
          <div className='columns'>
            {pdas.map((p,i) => {
              return (
                <div key={"cont"+i} className='column is-4'>
                  <ProfileCard
                    id={i}
                    title={p.title}
                    handle={p.handle}
                    logo={p.logo}
                    description={p.description}>
                  </ProfileCard>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

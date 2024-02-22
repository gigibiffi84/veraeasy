import 'bulma/css/bulma.css'
import ProfileCard from './ProfileCard';
import AlexaImage from './images/alexa.png';
import SiriImage from './images/siri.png';
import CortanaImage from './images/cortana.png';


import './App.css';

console.log(AlexaImage);
console.log(SiriImage);
const imageFake = 'https://picsum.photos/id/237/1280/960';
const imgFake2=  'https://picsum.photos/id/189/1280/960';
const imgFake3=  'https://picsum.photos/id/189/196/960';

function App() {
  return (
    <div>
      <section className='her is-primary'>
        <div className='hero-body'>
          <p className='title'>Personal Digital Assistants</p>
        </div>
      </section>
      <div className='container'>
        <section className='section'>
          <div className='columns'>
            <div className='column is-4'>
              <ProfileCard
                title="Alexa"
                handle="@alexa99"
                logo={AlexaImage}
                description="Alexa digital assistant">
              </ProfileCard>
            </div>
            <div className='column is-4'>
              <ProfileCard
                title="Cortana"
                handle="@cortana32"
                logo={CortanaImage}
                description="Cortana digital assistant">
              </ProfileCard>
            </div>
            <div className='column is-4'>
              <ProfileCard
                title="Siri"
                handle="@siri01"
                logo={SiriImage}
                description="Siri digital assistant">
              </ProfileCard>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

import './Home.module.css'
import Button from 'react-bootstrap/Button';
import UncontrolledExample from './Slider/Slider';
import { useStoryContext } from '../../contexts/StoryContext';
import { useAuthContext } from '../../contexts/AuthContext';

export const Home = () => {
    const {stories} =useStoryContext()
    const { isAuthenticated} = useAuthContext();
  
  return (  
    <section id="home">
      <h1>Кратки разкази "У нас и по света с деца"</h1>

      <UncontrolledExample stories={stories}/>

      <p>Здравейте! Това е сайт за идеи за разходки, пътешествия и приключения на семейства с деца сред природата, по забележителности и интерсни места из България и по света.</p>
      <p></p>
      <p> Авторите сме група приятели, разбира се, семейни и с деца</p>
      <p>И тъй като обикновено всички сме доста заети, тук разказваме най-важното и интересно накратко с няколко изречения! <i style={{ fontSize: '40px', color: 'orange' }} className="fa-regular fa-face-laugh-wink"></i></p>
      <p>Надяваме се да се заредите с идеи за нови пътешествия, разходки и приключения!</p>

      <div>      
        {isAuthenticated === true ?
          <>
            <Button className="landing-text" href="/create" variant="outline-success">Добави своя разказ и снимка</Button>{' '}
            <Button className="landing-text" href="/catalog" variant="outline-success">Разгледай разказитe&hellip;</Button>{' '}
          </>
          :
          <Button className="landing-text" href="/catalog" variant="outline-success">Разгледай разказите&hellip;</Button>
        }
        
      </div>
      <br />
    </section>
  )
}

import { useStoryContext } from '../../contexts/StoryContext';
import './dashboard.css';
import { Story } from "./Story/Story";





export const Catalog = () => {
    const { stories} =useStoryContext()
    return (
        <section id="dashboard">
            <h2>Разкази "У нас и по света с деца"</h2>
            <ul className="card-wrapper">
                {stories.map(x => <Story key={x._id} {...x} />)}
                
            </ul>
            {stories.length===0 && <h2>Още няма публикувани разкази...</h2>}


      

        </section>
    )

}


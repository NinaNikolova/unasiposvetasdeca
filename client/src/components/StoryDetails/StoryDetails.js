import './StoryDetails.module.css'
import { useEffect, useReducer } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';

import * as storyService from '../../services/storyService';
import { useAuthContext } from "../../contexts/AuthContext";
import { useStoryContext } from '../../contexts/StoryContext';

import { storyReducer } from '../../reducers/storyReducer';


export const StoryDetails = () => {
    const {storyDelete, stories} = useStoryContext()
    const { userId, isAuthenticated, email } = useAuthContext()
    const { storyId } = useParams();
    const [story, dispatch] = useReducer(storyReducer, {})
    const navigate = useNavigate()

  

    useEffect(() => {
        Promise.all([
            storyService.getOne(storyId),
            
        ])
            .then(([storyData]) => {
                const storyState = {
                    ...storyData
                }
                dispatch({ type: 'STORY_FETCH', payload: storyState })

            })
    }, [storyId]);

   
 

    const onDeleteClick = () => {
        // eslint-disable-next-line no-restricted-globals
        const choice = confirm(`Сигурни ли сте, че искате да изтиете ${story.title}`);
        if (choice) {
            storyService.delStory(storyId);

            storyDelete(storyId);

            navigate('/catalog');
        }

    };

let em = stories.find(x=>x._id===storyId);

    return (
        <section id="details">

            <div className="details-wrapper">

                <h2 className="details-title">{story.title}</h2>
                <Figure>
                    <Figure.Image
                        min-width={'100%'}
                        min-height={'100%'}
                        alt={story.title}
                        src={story.img}
                        object-fit={'cover'}
                    />

                </Figure>


                <div className="info-wrapper">
                    <p><strong>E-mail: </strong><span id="details-singer">{em?.email}</span></p>

                    <p><span><strong>Твоя кратък разказ: </strong></span>{story.description}</p>
                    <p><span><strong>Времетраене: </strong></span>{story.duration}</p>
                    <p><span><strong>Маршрут и как се стига до там: </strong></span>{story.route}</p>
                    <p><span><strong>Места за хранене, ако има: </strong></span>{story.placesToEat}</p>
                </div>

                {/* <!--Edit and Delete are only for creator--> */}


                {story._ownerId === userId &&
                    <div className="action-buttons">
                        <Button href={`/catalog/${storyId}/edit`} variant="warning">Редактирай <i className="fa-solid fa-file-pen"></i></Button>{' '}
                        <Button onClick={onDeleteClick} variant="danger">Изтрий <i className="fa-solid fa-trash-can"></i></Button>{' '}

                    </div>}
                    
               
     
            </div>
        </section>
    )

}
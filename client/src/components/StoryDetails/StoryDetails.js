import './StoryDetails.module.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';

import * as storyService from '../../services/storyService';
import { useAuthContext } from "../../contexts/AuthContext";
import { useStoryContext } from '../../contexts/StoryContext';




export const StoryDetails = () => {
    const { storyDelete } = useStoryContext()
    const { userId } = useAuthContext()
    const { storyId } = useParams();
    const [story, setStory] = useState({})

    const navigate = useNavigate()



    useEffect(() => {
        storyService.getOne(storyId)
            .then(result => {
                setStory(result);
            })
    }, [storyId])

console.log(story)

    async function onDeleteClick() {
        // eslint-disable-next-line no-restricted-globals 
        const choice = confirm(`Сигурни ли сте, че искате да изтриете ${story.title}`);

        if (choice) {
            storyDelete(storyId);
                 await storyService.delStory(storyId);
            navigate('/catalog');
       
        }


    }


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
                    
                    <h6><strong><i className="fa-solid fa-user-pen"></i> Автор: </strong></h6>
                    <p>{story.email}</p>
                    <h6><strong><i className="fa-solid fa-book-open-reader"></i> Твоя кратък разказ: </strong></h6>
                    <p>{story.description}</p>
                    <h6><strong><i className="fa-regular fa-clock"></i> Времетраене и марщрут/как се стига до там: </strong></h6>
                    <p>{story.duration}</p>
                  
                    <h6><strong><i className="fa-solid fa-utensils"></i> Места за хранене, ако има и ви харесват: </strong></h6>
                    <p>{story.placesToEat}</p>
                    <h2><i className="fa-solid fa-person-hiking"></i> <i className="fa-solid fa-person-biking"></i> <i className="fa-solid fa-person-walking-luggage"></i></h2>
                </div>

                {/* <!--Edit and Delete are only for creator--> */}


                {story._ownerId === userId &&
                    <div className="action-buttons">
                        <Button href={`/catalog/${storyId}/edit`} variant="warning">Редактирай <i className="fa-solid fa-file-pen"></i></Button>
                        <Button onClick={onDeleteClick} variant="danger">Изтрий <i className="fa-solid fa-trash-can"></i></Button>

                    </div>}

                <br />

            </div>
        </section>
    )

}
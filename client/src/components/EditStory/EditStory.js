import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';


import * as storyService from '../../services/storyService';
import { useStoryContext } from "../../contexts/StoryContext";
import { CloudinaryContext, Image } from 'cloudinary-react';



export const EditStory = () => {
  const [currentStory, setCurrentStory] = useState({});
  const { storyEdit } = useStoryContext()
  const { storyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    storyService.getOne(storyId)
      .then(storyData => {
        setCurrentStory(storyData);
      })
  }, [storyId])

  const onSubmit = (e) => {
    e.preventDefault();

    const storyData = Object.fromEntries(new FormData(e.target));
    if (Object.values(storyData).some(x => x === '')) {
      return alert("Моля, попълнете всички полета!")
    }
    storyService.edit(storyId, storyData)
      .then(result => {
        storyEdit(storyId, result);
        navigate(`/catalog/${storyId}`)
      });
  };


  return (
    <section id="edit" className="form">
        <h2>Редактирай твоя кратък разказ</h2>
        <div>
        <form className="edit-form" method="post" onSubmit={onSubmit}>

        <label htmlFor="title">Заглавие: <input type="text" name="title" placeholder="Заглавие" defaultValue={currentStory.title} /></label>
          <label>Снимка: <input type="text" name="img" aceholder="Снимка https://..." defaultValue={currentStory.img} /></label>
          <label>Твоя кратък разказ: <textarea name="description" cols="100" rows="40" placeholder="Твоя кратък разказ" defaultValue={currentStory.description} ></textarea></label>
          <label>Времетраене: <input type="text" name="duration" placeholder="Времетраене" defaultValue={currentStory.duration} /></label>
          <label>Маршрут: <input type="text" name="route" placeholder="Маршрут" defaultValue={currentStory.route} /></label>
          <label>Места за хранене: <input type="text" name="placesToEat" placeholder="Места за хранене" defaultValue={currentStory.placesToEat} /></label>
          <button type="submit">Редактирай</button>
        </form>
      </div>
    </section>
  )
}

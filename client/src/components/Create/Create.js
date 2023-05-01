import './Animation.css';
import './Form.css'

import { useStoryContext } from '../../contexts/StoryContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const Create = () => {

	const { onCreateStorySubmit, storyAdd } = useStoryContext()
	const { username } = useAuthContext()
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [img, setImageUrl] = useState("");
	
	const [duration, setDuration] = useState("");
	const [placesToEat, setPlacesToEat] = useState("");
		const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate()
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};
	const handleDurationChange = (e) => {
		setDuration(e.target.value);
	};
	// const handleRouteChange = (e) => {
	// 	setRoute(e.target.value);
	// };
	const handlePlacesToEatChange = (e) => {
		setPlacesToEat(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsCreating(true);
		// Upload image to Cloudinary
		const formData = new FormData();
		formData.append("file", imageFile);
		formData.append("upload_preset", "s5ek3yh0");
		const response = await fetch("https://api.cloudinary.com/v1_1/dc6hhvdow/image/upload", {
			method: "POST",
			body: formData
		}
		);

		// Get image URL from Cloudinary response
		const data = await response.json();
		const img = data.secure_url;
		setImageUrl(img);
		if(title==""|| img==""|| description==""|| duration==""|| placesToEat==""){
			return alert("Моля, попълнете всички полета!")
		}
		
		await onCreateStorySubmit({ title, img, description, duration, placesToEat , username})

		// Reset form fields
		setTitle("");
		setDescription("");
		setImageFile(null);
		setDuration("");

		// setRoute("");
		
		setPlacesToEat("");
	 navigate('/catalog')	
	}

	return (
		<section id="create">
			<br />
			<div className="typewriter">
				<div className="slide"><i></i></div>
				<div className="paper"></div>
				<div className="keyboard"></div>
			</div>


			<div className="form">
				<h2>Създай твоя кратък разказ</h2>


				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="title">Заглавие:</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={handleTitleChange}
						/>
					</div>
					<div>
						<label htmlFor="description">Твоя разказ:</label>
						<textarea rows="16" cols="50"
							id="description"
							value={description}
							onChange={handleDescriptionChange}
						/>
					</div>
					<div>
						<label htmlFor="img">Най-харесвана снимка:</label>
						<input
							type="file"
							id="img"
							accept="image/*"
							onChange={handleImageChange}
						/>
					</div>
					<div>
						<label htmlFor="duration">Времетраене и маршрут:</label>
						<input
							type="text"
							size="100"
							id="duration"
							value={duration}
							onChange={handleDurationChange}
						/>
					</div>
					
					<div>
						<label htmlFor="placesToEat">Препоръчвам места за хранене:</label>
						<input
							type="text"
							size="100"
							id="placesToEat"
							value={placesToEat}
							onChange={handlePlacesToEatChange}
						/>
					</div>
					{isCreating == false ?
						<button type="submit">Създай</button>
						:
						<div style={{ textAlign: 'center' }} class="spinner">'Създава се...'</div>
					}
				</form>

			</div>


		</section>

	)
}

import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';


export const Story = ({
    _id,
    title,
    description,
    img,
    _ownerId,
    email
}) => {


    return (

        <li className="cardLi">
            <Card style={{ width: '18rem' }}>
    
                <Card.Img variant="top" src={img} />
              
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                    <Card.Text>{description.slice(0, description.indexOf('. '))}...</Card.Text>
                    <Link to={`/catalog/${_id}`}>
                    <Button variant="success">Прочети повече...</Button>
                    </Link>
                </Card.Body>
            </Card>

        </li>
    )
}
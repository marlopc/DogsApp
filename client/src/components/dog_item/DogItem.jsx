import './DogItem.css';
import { Link } from 'react-router-dom';

const DogItem = ({ name, image_url, temperament, id }) => {

  return (
    <>
    <Link to={`/home/detail/id=${id}`}className="item-container link">
      <img src={`${image_url}`} alt={name}/>
      <div className="dog-info">
        <h2>{name}</h2>
        <small>{temperament}</small>
      </div>
    </Link>
    </>
  )
}

export default DogItem

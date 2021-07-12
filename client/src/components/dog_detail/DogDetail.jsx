import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetail } from '../../actions';
import Loader from '../loader/Loader';
import NavBar from '../nav_bar/NavBar';
import './DogDetail.css';

const DogDetail = ({ id }) => {

  const dispatch = useDispatch();
  const dogDetail = useSelector(state => state.dogDetail);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    dispatch(getDogDetail(id))
  }, [dispatch, id]);

  return (
    <div>
      <NavBar />
      {
        dogDetail.hasOwnProperty("id") && id.toString() === dogDetail.id.toString() ? (
          <>
            <h1>{dogDetail.name}</h1>
            {dogDetail.hasOwnProperty("image") && <img src={`${dogDetail.image.url}`} alt={dogDetail.image_id} width="180px"/>}
            {dogDetail.hasOwnProperty("bred_for") && <h3>BRED FOR {dogDetail.bred_for}</h3>}
            {dogDetail.hasOwnProperty("breed_group") && <h3>BREED GROUP {dogDetail.breed_group}</h3>}
            <h3>W I {dogDetail.weight.imperial}</h3>
            <h3>W M {dogDetail.weight.metric}</h3>
            <h3>H I {dogDetail.height.imperial}</h3>
            <h3>H M {dogDetail.height.metric}</h3>
            <h3>LIFE SPAN {dogDetail.life_span}</h3>
            <h3>TEMPERAMENT {dogDetail.temperament}</h3>
            {dogDetail.hasOwnProperty('description') && <p>{dogDetail.description}</p>}
          </>
        ) : (
          <div className="loader-position">
            <Loader />
          </div>
        )
      }
    </div>
  )
}

export default DogDetail

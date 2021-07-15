import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetail } from '../../actions';
import Loader from '../loader/Loader';
import NavBar from '../nav_bar/NavBar';
import Footer from '../footer/Footer';
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
      <div className="detail-background">
      {
        dogDetail.id && id.toString() === dogDetail.id.toString() ? (
          <>
            <h1 id="dog-name-responsive">"{dogDetail.name}"</h1>
            <div className="detail-container">
              <div className="image-n-name">
              <div className="picture">
              {
                dogDetail.image && 
                <img src={`${dogDetail.image.url}`} alt={dogDetail.image_id} width="300px"/>
              }
              </div>
              <div className="info">
                <h1 id="dog-name">"{dogDetail.name}"</h1>
                <ul>
                  {dogDetail.breed_group && <li>Breed type: {dogDetail.breed_group}</li>}
                  <li>Weight: {dogDetail.weight.metric} kg / {dogDetail.weight.imperial} pounds</li>
                  <li>Height: {dogDetail.height.metric} centimeters / {dogDetail.height.imperial} inches</li>
                  <li>Life span: {dogDetail.life_span}</li>
                  {dogDetail.bred_for && <li>Bred for: {dogDetail.bred_for}</li>}
                  {
                    dogDetail.temperament && 
                    <li>Temperament{dogDetail.temperament.split(", ").length > 1 ? "s" : ""}: {dogDetail.temperament}.</li>
                  }
                </ul>
              </div>
              </div>
              {
                dogDetail.description && 
                <div className="dog-description">
                  <p>{dogDetail.description}</p>
                </div>
              }
            </div>
          </>
        ) : (
          <div className="loader-position">
            <Loader />
          </div>
        )
      }
      </div>
      <Footer />
    </div>
  )
}

export default DogDetail

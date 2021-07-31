import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DogDetail.css";
import axios from "axios";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";
import NavBar from "../nav_bar/NavBar";
import { useHistory } from "react-router-dom";
import { getDogDetail } from "../../actions";

const DB_HOST = process.env.REACT_APP_DB_HOST;

const DogDetail = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dogDetail = useSelector((state) => state.dogDetail);

  useEffect(() => {
    document.title = "Dog details - Dogs App"
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    const doubleCheck = window.confirm(
      "Are you sure you want to permanently remove this dog?"
    );
    if (doubleCheck) {
      const body = {id};
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      axios
        .delete(`${DB_HOST}/dog`, { data: body, headers })
        .then(() => {
          alert("Dog successfully removed");
          history.push("/home");
        })
        .catch((err) => alert("Error occurred: " + err));
    }
  };

  let attempt = 0;
  const addDefaultSrc = (e) => {
    attempt++;
    if (attempt < 2) {
      e.target.src =
        dogDetail.image.url && `${dogDetail.image.url.slice(0, -4)}.png`;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="detail-background">
        {dogDetail.id && id.toString() === dogDetail.id.toString() ? (
          <>
            <h1 id="dog-name-responsive">"{dogDetail.name}"</h1>
            <div className="detail-container">
              <div className="image-n-name">
                <div className="picture">
                  {dogDetail.image && (
                    <a href={dogDetail.image.url}>
                      <img
                        src={dogDetail.image.url}
                        onError={addDefaultSrc}
                        alt={dogDetail.image_id}
                        width="300px"
                      />
                    </a>
                  )}
                </div>
                <div className="info">
                  <h1 id="dog-name">"{dogDetail.name}"</h1>
                  <ul>
                    {dogDetail.breed_group && (
                      <li>Breed type: {dogDetail.breed_group}</li>
                    )}
                    <li>
                      Weight: {dogDetail.weight.metric} kg /{" "}
                      {dogDetail.weight.imperial} pounds
                    </li>
                    <li>
                      Height: {dogDetail.height.metric} centimeters /{" "}
                      {dogDetail.height.imperial} inches
                    </li>
                    {dogDetail.life_span.trim().includes(" ") && (
                    <li>Life span: {dogDetail.life_span}</li>)}
                    {dogDetail.bred_for && (
                      <li>Bred for: {dogDetail.bred_for}.</li>
                    )}
                    {dogDetail.temperament && (
                      <li>
                        Temperament
                        {dogDetail.temperament.split(", ").length > 1
                          ? "s"
                          : ""}
                        : {dogDetail.temperament}.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {dogDetail.description && (
                <div className="dog-description">
                  <p>{dogDetail.description}</p>
                </div>
              )}
              {isNaN(dogDetail.id) && (
                <span className="delete-btn" onClick={handleDelete}>
                  Delete
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="loader-position">
            <Loader />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DogDetail;

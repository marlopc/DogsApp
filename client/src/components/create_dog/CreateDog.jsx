import React, { useState, useEffect } from "react";
import "./CreateDog.css";
import axios from "axios";
import NavBar from "../nav_bar/NavBar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../actions";
import { converter } from "../../helpers/converter";
import { validate } from "../../helpers/formValidate";

const DB_HOST = process.env.REACT_APP_DB_HOST;

const initialForm = {
  name: "",
  imperial: false,
  metric: true,
  weight_min: "",
  weight_max: "",
  height_min: "",
  height_max: "",
  life_span: "",
  image_url: "",
  description: "",
  temperament: [],
};

const CreateDog = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [temperamentSelect, setTemperamentSelect] = useState("Select");
  const [imageUrlPreview, setImageUrlPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const { name, life_span, description, image_url, temperament } = form;
      const body = {
        weight: converter(
          form.imperial ? "imperial" : "metric",
          "weight",
          form.weight_min,
          form.weight_max
        ),
        height: converter(
          form.imperial ? "imperial" : "metric",
          "height",
          form.height_min,
          form.height_max
        ),
        name,
        description,
        life_span: `${life_span} years`,
        temperament: temperament.map((el) => el.id),
        image_url,
      };
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      axios
        .post(`${DB_HOST}/dog`, body, { headers })
        .then(() => {
          setForm(initialForm);
          setImageUrlPreview(null);
          alert("The dog has been successfully created");
        })
        .catch(() => alert("An error occurred while submitting the form"));
    }
  };

  const stateTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setErrors(
      validate(
        {
          ...form,
          [e.target.name]: e.target.value,
        },
        e.target.name,
        errors
      )
    );
  };

  const handleRadioChange = (e) => {
    if (e.target.value === "imperial") {
      return setForm({
        ...form,
        imperial: true,
        metric: false,
      });
    }

    setForm({
      ...form,
      imperial: false,
      metric: true,
    });
  };

  const handleTemperament = (e) => {
    setTemperamentSelect(e.target.value);
    const [id, name] = e.target.value.split("&");

    if (form.temperament.some((el) => el.id === id)) {
      return;
    }

    setForm({
      ...form,
      temperament: [
        ...form.temperament,
        {
          id,
          name,
        },
      ],
    });

    setErrors(validate({
        ...form,
        temperament: [
          ...form.temperament, {
            id,
            name,
          },
        ],
      },
      e.target.name,
      errors
    ));
  };

  const handleImageChange = (e) => {
    handleChange(e);

    setTimeout(() => {
      setImageUrlPreview(e.target.value);
    }, 1000);
  };

  const handleRemove = (e) => {
    const temperamentId = e.target.attributes.data.nodeValue;
    setForm({
      ...form,
      temperament: form.temperament.filter((el) => el.id !== temperamentId),
    });
    setErrors(
      validate(
        {
          ...form,
          temperament: form.temperament.filter((el) => el.id !== temperamentId),
        },
        "temperament",
        errors
      )
    );
  };

  return (
    <div className="page-form">
      <NavBar />
      <h1>CREATE A DOG</h1>
      <div className="form-dog-container">
        <form onSubmit={handleSubmit} className="form-dog">
          <div className="input-form input-name">
            <label htmlFor="name">Dog name*</label>
            <input
              type="text"
              name="name"
              placeholder="Choose a name..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.name}
              data-testid="create-name"
              required
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="input-form input-radio">
            <label>
              <input
                type="radio"
                value="metric"
                checked={form.metric}
                onChange={handleRadioChange}
                data-testid="create-radio-metric"
              />
              cm / kg
            </label>
            <label>
              <input
                type="radio"
                value="imperial"
                checked={form.imperial}
                onChange={handleRadioChange}
                data-testid="create-radio-imperial"
              />
              inch / pound
            </label>
          </div>
          <div className="input-form input-we-he">
            <label>Weight*</label>
            <input
              type="text"
              placeholder="Min"
              name="weight_min"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.weight_min}
              data-testid="create-min-w"
              required
            />
            <small>-</small>
            <input
              type="text"
              placeholder="Max"
              name="weight_max"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.weight_max}
              data-testid="create-max-w"
              required
            />
            {errors.weight_min && <p>{errors.weight_min}</p>}
            {errors.weight_max && <p>{errors.weight_max}</p>}
          </div>
          <div className="input-form input-we-he">
            <label>Height* </label>
            <input
              type="text"
              placeholder="Min"
              name="height_min"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.height_min}
              data-testid="create-min-h"
              required
            />
            <small>-</small>
            <input
              type="text"
              placeholder="Max"
              name="height_max"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.height_max}
              data-testid="create-max-h"
              required
            />
            {errors.height_min && <p>{errors.height_min}</p>}
            {errors.height_max && <p>{errors.height_max}</p>}
          </div>
          <div className="input-form input-lifespan">
            <label>Life span</label>
            <input
              type="text"
              placeholder="Life span"
              name="life_span"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.life_span}
              data-testid="create-life-span"
            />
            {errors.life_span && <p>{errors.life_span}</p>}
          </div>
          <div className="input-form input-temperament">
            <label>Temperament</label>
            <select
              name="temperament"
              value={temperamentSelect}
              onChange={handleTemperament}
            >
              <option value="Select" hidden={true}>
                Select
              </option>
              {[...stateTemperaments]
                .sort((a, b) => {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  }
                  return 0;
                })
                .map((temperament) => {
                  return (
                    <option
                      value={`${temperament.id}&${temperament.name}`}
                      key={temperament.id}
                    >
                      {temperament.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-form input-imageurl">
            <label>Image url </label>
            <input
              type="text"
              placeholder="Set a image..."
              name="image_url"
              onBlur={handleBlur}
              onChange={handleImageChange}
              value={form.image_url}
              data-testid="create-image-url"
            />
            {errors.image_url && <p>{errors.image_url}</p>}
          </div>
          <div className="input-description">
            <textarea
              placeholder="Write a description..."
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.description}
              data-testid="create-description"
            />
            {errors.description && <p>{errors.description}</p>}
          </div>
          <input className="input-submit" type="submit" value="Create" />
          <hr></hr>
          <small>* required</small>
        </form>
        <div className="preview-temp-container">
          <div className="picture-preview">
            <img
              src={!errors.image_url ? imageUrlPreview : null}
              alt="Preview"
              className="img-preview"
            ></img>
          </div>
          <div className="horizontal-div-preview" />
          <div className="temp">
            {form.temperament
              .map((el) => (
                <div key={`${el.id + el.name}`} className="li-temperament">
                  <div className="position-button">
                    <small>{el.name}</small>
                    <span data={el.id} onClick={handleRemove}>
                      x
                    </span>
                  </div>
                </div>
              ))
              .slice(0, 15)}
            {form.temperament.length > 15 && <div className="more">...</div>}
          </div>
          {errors.temperament && (
            <p className="error-temperament">{errors.temperament}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateDog;

import './CreateDog.css';
import NavBar from '../nav_bar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTemperaments } from '../../actions';
import axios from 'axios';

const validate = (input) => {
  let errors = {};

  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  if(!input.name.trim()) {
    errors.name = `field "name" is required`;
  } else if(!regexName.test(input.name.trim())) {
    errors.name = `field "name" only allows letters and whitespaces`;
  } else if(errors.name) {
    delete errors.name;
  }

  if(!input.weight_min.trim()) {
    errors.weight_min = `field "weight" is required`;
  } else if(isNaN(input.weight_min.trim())) {
    errors.weight_min = `field "min weight" only allows numbers`;
  } else if(input.weight_min.trim().length > 3) {
    errors.weight_min = `field "min weight" only allows max 3 digits`;
  } else if(errors.weight_min) {
    delete errors.weight_min;
  }

  if(!input.weight_max.trim()) {
    errors.weight_max = `field "weight" is required`;
  } else if(isNaN(input.weight_max.trim())) {
    errors.weight_max = `field "max weight" only allows numbers`;
  } else if(input.weight_max.trim().length > 3) {
    errors.weight_max = `field "max weight" only allows max 3 digits`;
  } else if(errors.weight_max) {
    delete errors.weight_max;
  }

  if(!input.height_min.trim()) {
    errors.height_min = `field "height" is required`;
  } else if(isNaN(input.height_min.trim())) {
    errors.height_min = `field "min height" only allows numbers`;
  } else if(input.weight_min.trim().length > 3) {
    errors.height_min = `field "min height" only allows max 3 digits`;
  } else if(errors.height_min) {
    delete errors.height_min;
  }

  if(!input.height_max.trim()) {
    errors.height_max = `field "height" is required`;
  } else if(isNaN(input.height_max.trim())) {
    errors.height_max = `field "max height" only allows numbers`;
  } else if(input.height_max.trim().length > 3) {
    errors.height_max = `field "max height" only allows max 3 digits`;
  } else if(errors.height_max) {
    delete errors.height_max;
  }

  if(!input.life_span) {
    delete errors.life_span;
  } else if(isNaN(input.life_span.trim())) {
    errors.life_span = `field "life span" only allows numbers`;
  } else if(input.life_span.length > 2) {
    errors.life_span = `field "life span" only allows max 2 digits`;
  } else if(errors.life_span) {
    delete errors.life_span;
  }

  if(input.temperament.length === 0) {
    delete errors.temperament;
  } else if(input.temperament.length > 12) {
    errors.temperament = `a breed can not have more than 12 "temperaments"`;
  } else if(errors.temperament){
    delete errors.temperament;
  }

  if(!input.description) {
    delete errors.description;
  } else if(input.description.length > 5000) {
    errors.description = `description field can not have more than 5000 characters`;
  } else if(errors.description) {
    delete errors.description;
  }

  if(!input.image_url) {
    delete errors.image_url;
  } else if(!regexUrl.test(input.image_url)) {
    errors.image_url = `invalid image url`;
  } else if(errors.image_url) {
    delete errors.image_url;
  }

  return errors;
};

const converter = (from, type, min, max) => {
  if(from === "imperial") {
    const minMetric = Math.round(type === "height" ? min * 2.54 : min / 2.2);
    const maxMetric = Math.round(type === "height" ? max * 2.54 : max / 2.2);
    return `${min}-${max}-${minMetric}-${maxMetric}`
  }

  if(from === "metric") {
    const minImperial = Math.round(type === "height" ? min / 2.54 : min * 2.2);
    const maxImperial = Math.round(type === "height" ? max / 2.54 : max * 2.2);
    return `${minImperial}-${maxImperial}-${min}-${max}`
  }
}

const CreateDog = () => {

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
    temperament: []
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [temperamentSelect, setTemperamentSelect] = useState("");
  const [imageUrlPreview, setImageUrlPreview] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(errors).length === 0) {
      const { name, life_span, description, image_url, temperament } = form;
      const body = {
        weight: converter(form.imperial ? "imperial" : "metric", "weight", form.weight_min, form.weight_max),
        height: converter(form.imperial ? "imperial" : "metric", "height", form.height_min, form.height_max),
        name,
        description,
        life_span: `${life_span} years`,
        temperament,
        image_url
      }
      axios.post("http://localhost:3001/dog", body);
      setForm(initialForm);
      alert("se envio el form");
    }
  }

  const stateTemperaments = useSelector(state => state.temperaments);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value
    }))
  }

  const handleRadioChange = (e) => {
    if(e.target.value === "imperial") {
      return setForm({
        ...form,
        imperial: true,
        metric: false
      });
    }

    setForm({
        ...form,
        imperial: false,
        metric: true
      });
  }

  const handleTemperament = (e) => {
    setTemperamentSelect(e.target.value);
    if(form.temperament.includes(e.target.value)) {
      return;
    }
    setForm({
      ...form,
      temperament: [...form.temperament, e.target.value]
    })
    setErrors(validate({
      ...form,
      temperament: [...form.temperament, e.target.value]
    }))
  }

  const handleImageChange = (e) => {
    handleChange(e);
    setTimeout(() => {
      setImageUrlPreview(e.target.value)
    }, 2500);
  }

  return (
    <div>
      <NavBar/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} value={form.name}></input>
        <div>
          <label>
            <input type="radio" value="metric" checked={form.metric} onChange={handleRadioChange}/>
            Metrical
          </label>
          <label>
            <input type="radio" value="imperial" checked={form.imperial} onChange={handleRadioChange}/>
            Imperial
          </label>
        </div>
        <input type="text" placeholder="Min weight" name="weight_min" onChange={handleChange} value={form.weight_min}></input>
        <input type="text" placeholder="Max weight" name="weight_max" onChange={handleChange} value={form.weight_max}></input>
        <input type="text" placeholder="Min height" name="height_min" onChange={handleChange} value={form.height_min}></input>
        <input type="text" placeholder="Max height" name="height_max" onChange={handleChange} value={form.height_max}></input>
        <input type="text" placeholder="Life span" name="life_span" onChange={handleChange} value={form.life_span}></input>
        <select value={temperamentSelect} onChange={handleTemperament}>
          {
            [...stateTemperaments]
              .sort((a, b) => {
                if(a.name > b.name) {
                  return 1;
                }
                if(b.name > a.name) {
                  return -1;
                }
                return 0;
              })
              .map(temperament => <option value={temperament.id} key={temperament.id}>{temperament.name}</option>)
          }
        </select>
        <img src={imageUrlPreview} alt="preview" width="200px"></img>
        <input type="text" placeholder="Image url" name="image_url" onChange={handleImageChange} value={form.image_url}></input>
        <textarea name="description" onChange={handleChange} value={form.description}/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default CreateDog

import './CreateDog.css';
import NavBar from '../nav_bar/NavBar';
import Footer from '../footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTemperaments } from '../../actions';
import axios from 'axios';

const validate = (input, source, errors) => {
  let updatedErrors = { ...errors };

  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  if(source === 'name' || source === 'submit'){
    if(!input.name.trim()) {
      updatedErrors.name = `field "name" is required`;
    } else if(!regexName.test(input.name.trim())) {
      updatedErrors.name = `field "name" only allows letters and whitespaces`;
    } else if(updatedErrors.name) {
      delete updatedErrors.name;
    }
  }

  if(source === 'weight_min' || source === 'submit'){
    if(!input.weight_min.trim()) {
      updatedErrors.weight_min = `field "min weight" is required`;
    } else if(isNaN(input.weight_min.trim())) {
      updatedErrors.weight_min = `field "min weight" only allows numbers`;
    } else if(input.weight_min.trim().length > 3) {
      updatedErrors.weight_min = `field "min weight" only allows max 3 digits`;
    } else if(updatedErrors.weight_min) {
      delete updatedErrors.weight_min;
    }
  }

  if(source === 'weight_max' || source === 'submit'){
    if(!input.weight_max.trim()) {
      updatedErrors.weight_max = `field "max weight" is required`;
    } else if(isNaN(input.weight_max.trim())) {
      updatedErrors.weight_max = `field "max weight" only allows numbers`;
    } else if(input.weight_max.trim().length > 3) {
      updatedErrors.weight_max = `field "max weight" only allows max 3 digits`;
    } else if(updatedErrors.weight_max) {
      delete updatedErrors.weight_max;
    }
  }

  if(source === 'height_min' || source === 'submit'){
    if(!input.height_min.trim()) {
      updatedErrors.height_min = `field "min height" is required`;
    } else if(isNaN(input.height_min.trim())) {
      updatedErrors.height_min = `field "min height" only allows numbers`;
    } else if(input.weight_min.trim().length > 3) {
      updatedErrors.height_min = `field "min height" only allows max 3 digits`;
    } else if(updatedErrors.height_min) {
      delete updatedErrors.height_min;
    }
  }

  if(source === 'height_max' || source === 'submit'){
    if(!input.height_max.trim()) {
      updatedErrors.height_max = `field "max height" is required`;
    } else if(isNaN(input.height_max.trim())) {
      updatedErrors.height_max = `field "max height" only allows numbers`;
    } else if(input.height_max.trim().length > 3) {
      updatedErrors.height_max = `field "max height" only allows max 3 digits`;
    } else if(updatedErrors.height_max) {
      delete updatedErrors.height_max;
    }
  }

  if(source === 'life_span' || source === 'submit'){
    if(!input.life_span) {
      delete updatedErrors.life_span;
    } else if(isNaN(input.life_span.trim())) {
      updatedErrors.life_span = `field "life span" only allows numbers`;
    } else if(input.life_span.length > 2) {
      updatedErrors.life_span = `field "life span" only allows max 2 digits`;
    } else if(updatedErrors.life_span) {
      delete updatedErrors.life_span;
    }
  }

  if(source === 'temperament' || source === 'submit'){
    if(input.temperament.length === 0) {
      delete updatedErrors.temperament;
    } else if(input.temperament.length > 12) {
      updatedErrors.temperament = `a breed can not have more than 12 "temperaments", remove any to continue`;
    } else if(updatedErrors.temperament){
      delete updatedErrors.temperament;
    }
  }

  if(source === 'description' || source === 'submit'){
    if(!input.description) {
      delete updatedErrors.description;
    } else if(input.description.length > 2500) {
      updatedErrors.description = `description field can not have more than 2500 characters`;
    } else if(updatedErrors.description) {
      delete updatedErrors.description;
    }
  }

  if(source === 'image_url' || source === 'submit'){
    if(!input.image_url) {
      delete updatedErrors.image_url;
    } else if(!regexUrl.test(input.image_url)) {
      updatedErrors.image_url = `invalid image url`;
    } else if(updatedErrors.image_url) {
      delete updatedErrors.image_url;
    }
  }

  return updatedErrors;
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
};

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
  const [temperamentSelect, setTemperamentSelect] = useState("Select");
  const [imageUrlPreview, setImageUrlPreview] = useState(null);

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
        temperament: temperament.map(el => el.id),
        image_url
      };
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json"
      };
      axios.post("http://localhost:3001/dog", body, {headers})
        .then(() => {
          setForm(initialForm)
          setImageUrlPreview(null);
          alert("The dog has been successfully created");
        })
        .catch(() => alert("An error occurred while submitting the form"));
    }
  }

  const stateTemperaments = useSelector(state => state.temperaments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e) => {
    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value
    }, e.target.name, errors));
  };

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
  };

  const handleTemperament = (e) => {
    setTemperamentSelect(e.target.value);
    const [ id, name ] = e.target.value.split("&"); 

    if(form.temperament.some(el => el.id === id)) {
      return;
    }

    setForm({
      ...form,
      temperament: [...form.temperament, {
        id,
        name
      }]
    });

    setErrors(validate({
      ...form,
      temperament: [...form.temperament, {
        id,
        name
      }]
    }, e.target.name, errors));
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
      temperament: form.temperament.filter(el => el.id !== temperamentId)
    })
    setErrors(validate({
      ...form,
      temperament: form.temperament.filter(el => el.id !== temperamentId)
    }, "temperament", errors))
  };

  return (
    <div className="page-form">
      <NavBar/>
      <h1>CREATE A DOG</h1>
      <div className="form-dog-container">
        <form onSubmit={handleSubmit} className="form-dog">
          <div className="input-form input-name">
            <label htmlFor="name">Dog name*</label>
            <input type="text" 
              name="name" 
              placeholder="Choose a name..." 
              onChange={handleChange} 
              onBlur={handleBlur} 
              value={form.name} 
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
              />
              cm / kg 
            </label>
            <label>
              <input 
                type="radio" 
                value="imperial" 
                checked={form.imperial} 
                onChange={handleRadioChange}
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
              required
            />
            {
              errors.weight_min && 
              <p>{errors.weight_min}</p>
            }
            {
              errors.weight_max && 
              <p>{errors.weight_max}</p>
            }
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
              required
            />
            {
              errors.height_min && 
              <p>{errors.height_min}</p>
            }
            {
              errors.height_max && 
              <p>{errors.height_max}</p>
            }
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
            />
            {
              errors.life_span && 
              <p>{errors.life_span}</p>
            }
          </div>
          <div className="input-form input-temperament">
            <label>Temperament</label>
            <select name="temperament" value={temperamentSelect} onChange={handleTemperament}>
            <option value="Select" hidden={true}>Select</option>
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
                  .map(temperament => {
                  return (<option 
                    value={`${temperament.id}&${temperament.name}`} 
                    key={temperament.id}>{temperament.name}
                  </option>)
                  })
              }
            </select>
          </div>
          <div className="input-form input-imageurl">
            <label>Image url </label>
            <input type="text" placeholder="Set a image..." name="image_url" onBlur={handleBlur} onChange={handleImageChange} value={form.image_url}></input>
            {
              errors.image_url && 
              <p>{errors.image_url}</p>
            }
          </div>
          <div className="input-description">
            <textarea placeholder="Write a description..." name="description" onBlur={handleBlur} onChange={handleChange} value={form.description}/>
            {
              errors.description && 
              <p>{errors.description}</p>
            }
          </div>
          <input className="input-submit" type="submit" value="Create"/>
          <hr></hr>
          <small>* required</small>
        </form>
        <div className="preview-temp-container">
          <div className="picture-preview">
            <img src={!errors.image_url ? imageUrlPreview : null} alt="Preview" className="img-preview"></img>
          </div>
          <div className="horizontal-div-preview"/>
          <div className="temp">
            {
              form.temperament.map(el => (
                <div key={`${el.id + el.name}`} className="li-temperament">
                  <div className="position-button">
                    <small>{el.name}</small>
                    <span data={el.id} onClick={handleRemove}>x</span>
                  </div>
                </div>
              )).slice(0, 15)
            }
            {
              form.temperament.length > 15 &&
              <div className="more">...</div>
            }
          </div>
          {
            errors.temperament && 
            <p className="error-temperament">{errors.temperament}</p>
          }
        </div>
      </div>
    <Footer />
  </div>
  )
}

export default CreateDog

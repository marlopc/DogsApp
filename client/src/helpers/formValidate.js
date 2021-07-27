export const validate = (input, source, errors) => {
  let updatedErrors = { ...errors };

  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexUrl =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  if (source === "name" || source === "submit") {
    if (!input.name.trim()) {
      updatedErrors.name = `field "name" is required`;
    } else if (!regexName.test(input.name.trim())) {
      updatedErrors.name = `field "name" only allows letters and whitespaces`;
    } else if (updatedErrors.name) {
      delete updatedErrors.name;
    }
  }

  if (source === "weight_min" || source === "submit") {
    if (!input.weight_min.trim()) {
      updatedErrors.weight_min = `field "min weight" is required`;
    } else if (isNaN(input.weight_min.trim())) {
      updatedErrors.weight_min = `field "min weight" only allows numbers`;
    } else if (input.weight_min.trim().length > 3) {
      updatedErrors.weight_min = `field "min weight" only allows max 3 digits`;
    } else if (updatedErrors.weight_min) {
      delete updatedErrors.weight_min;
    }
  }

  if (source === "weight_max" || source === "submit") {
    if (!input.weight_max.trim()) {
      updatedErrors.weight_max = `field "max weight" is required`;
    } else if (isNaN(input.weight_max.trim())) {
      updatedErrors.weight_max = `field "max weight" only allows numbers`;
    } else if (input.weight_max.trim().length > 3) {
      updatedErrors.weight_max = `field "max weight" only allows max 3 digits`;
    } else if (updatedErrors.weight_max) {
      delete updatedErrors.weight_max;
    }
  }

  if (source === "height_min" || source === "submit") {
    if (!input.height_min.trim()) {
      updatedErrors.height_min = `field "min height" is required`;
    } else if (isNaN(input.height_min.trim())) {
      updatedErrors.height_min = `field "min height" only allows numbers`;
    } else if (input.weight_min.trim().length > 3) {
      updatedErrors.height_min = `field "min height" only allows max 3 digits`;
    } else if (updatedErrors.height_min) {
      delete updatedErrors.height_min;
    }
  }

  if (source === "height_max" || source === "submit") {
    if (!input.height_max.trim()) {
      updatedErrors.height_max = `field "max height" is required`;
    } else if (isNaN(input.height_max.trim())) {
      updatedErrors.height_max = `field "max height" only allows numbers`;
    } else if (input.height_max.trim().length > 3) {
      updatedErrors.height_max = `field "max height" only allows max 3 digits`;
    } else if (updatedErrors.height_max) {
      delete updatedErrors.height_max;
    }
  }

  if (source === "life_span" || source === "submit") {
    if (!input.life_span) {
      delete updatedErrors.life_span;
    } else if (isNaN(input.life_span.trim())) {
      updatedErrors.life_span = `field "life span" only allows numbers`;
    } else if (input.life_span.length > 2) {
      updatedErrors.life_span = `field "life span" only allows max 2 digits`;
    } else if (updatedErrors.life_span) {
      delete updatedErrors.life_span;
    }
  }

  if (source === "temperament" || source === "submit") {
    if (input.temperament.length === 0) {
      delete updatedErrors.temperament;
    } else if (input.temperament.length > 12) {
      updatedErrors.temperament = `a breed can not have more than 12 "temperaments", remove any to continue`;
    } else if (updatedErrors.temperament) {
      delete updatedErrors.temperament;
    }
  }

  if (source === "description" || source === "submit") {
    if (!input.description) {
      delete updatedErrors.description;
    } else if (input.description.length > 2500) {
      updatedErrors.description = `description field can not have more than 2500 characters`;
    } else if (updatedErrors.description) {
      delete updatedErrors.description;
    }
  }

  if (source === "image_url" || source === "submit") {
    if (!input.image_url) {
      delete updatedErrors.image_url;
    } else if (!regexUrl.test(input.image_url)) {
      updatedErrors.image_url = `invalid image url`;
    } else if (updatedErrors.image_url) {
      delete updatedErrors.image_url;
    }
  }

  return updatedErrors;
};
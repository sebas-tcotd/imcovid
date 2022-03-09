// Se agarra el DOM
const appIntro = document.getElementById("intro");
const form = document.getElementById("measurements-form");
const resultsIntro = document.getElementById("results-intro");
const resultsDetails = document.getElementById("results-details");
const riskLevel = document.getElementById("risk-level");
const riskDescription = document.getElementById("risk-text");
const imc = document.getElementById("imc");
const imcClassification = document.getElementById("imc-classification");
const cards = document.querySelectorAll(".c-card");

const state = {
  imc: NaN,
  classification: "",
  riskLevel: "",
  riskDescription: "",
};

const doTheCalc = (event) => {
  // Previene la recarga automática del browser
  event.preventDefault();

  const height = document.getElementsByName("height")[0].value;
  const weight = document.getElementsByName("weight")[0].value;

  state.imc = calculateIMC(height, weight);
  determineClassification(state.imc);
  determineRisk(state.classification);

  // Oculta la sección del formulario
  toggleSections();

  assignValues();
};

const assignValues = () => {
  // Asigna el estado en el DOM
  riskLevel.innerHTML = state.riskLevel;
  imc.innerHTML = state.imc;
  imcClassification.innerHTML = state.classification;

  switch (state.riskLevel) {
    case "Alto":
      riskLevel.classList.add("u-danger");
      cards.forEach((card) => card.classList.add("c-card--is-danger"));
      riskDescription.innerHTML = state.riskDescription;
      break;
    case "Moderado":
      riskLevel.classList.add("u-warning");
      cards.forEach((card) => card.classList.add("c-card--is-warning"));
      riskDescription.innerHTML = state.riskDescription;
      break;
    case "Bajo":
      riskLevel.classList.add("u-ok");
      cards.forEach((card) => card.classList.add("c-card--is-ok"));
      riskDescription.innerHTML = state.riskDescription;
      break;
  }
};

const determineClassification = (imc) => {
  if (imc <= 18.5) {
    state.classification = "Bajo peso";
  } else if (imc <= 25) {
    state.classification = "Normal";
  } else if (imc <= 30) {
    state.classification = "Sobrepeso";
  } else if (imc <= 35) {
    state.classification = "Obesidad I";
  } else if (imc <= 40) {
    state.classification = "Obesidad II";
  } else {
    state.classification = "Obesidad III";
  }
};

const determineRisk = (classification) => {
  if (
    classification === "Bajo peso" ||
    classification === "Obesidad I" ||
    classification === "Obesidad II" ||
    classification === "Obesidad III"
  ) {
    state.riskLevel = "Alto";
    state.riskDescription =
      "¡Alerta! Estás con grandes probabilidades de contraer COVID y -posiblemente- no vivir para contarlo. Te recomendamos encarecidamente mejorar tu salud.";
  } else if (classification === "Sobrepeso") {
    state.riskLevel = "Moderado";
    state.riskDescription =
      "¡Cuidado! Estás con riesgo incipiente de contraer COVID, pero tienes la oportunidad de mejorar tus hábitos y conseguir un riego más bajo de contagio.";
  } else {
    state.riskLevel = "Bajo";
    state.riskDescription =
      "¡Enhorabuena!, usted no tiene riesgo de padecer COVID. De todas formas, una alimentación sana respetando las disposiciones del gobierno hará que tenga una vida más saludable.";
  }
};

const calculateIMC = (height, weight) => {
  if (!(height && weight)) return;
  if (height < 0 || weight < 0) return;

  return (weight / Math.pow(height / 100, 2)).toFixed(2);
};

const toggleVisibility = (HTMLElement) => {
  HTMLElement.toggleAttribute("hidden");
};

const toggleSections = () => {
  toggleVisibility(resultsIntro);
  toggleVisibility(resultsDetails);

  window.scrollTo({ top: 0 });

  toggleVisibility(appIntro);
  toggleVisibility(form);
};

const resetPages = () => {
  riskLevel.classList.remove("u-danger", "u-warning", "u-ok");
  cards.forEach((card) =>
    card.classList.remove(
      "c-card--is-ok",
      "c-card--is-danger",
      "c-card--is-warning"
    )
  );
};

const resetPage = () => {
  toggleSections();
  // debugger;
  resetPages();
};

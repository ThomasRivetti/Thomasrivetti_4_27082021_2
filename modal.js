function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// REGEX
const regexFirstName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexLastName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexEmail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
const regexBirthdate = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
const regexGamesQuantity = /^[0-9][0-9]?$/;

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeButton = document.getElementById("modal-close"); //croix
const firstNameInput = document.getElementById("first"); //input prénom
const lastNameInput = document.getElementById("last"); //input nom
const emailInput = document.getElementById("email"); //input mail
const birthdateInput = document.getElementById("birthdate"); //input date de naissance
const quantityInput = document.getElementById("quantity"); //input participations
const cguCheckbox = document.getElementById("checkbox1"); //checkbox cgu
const submitButton = document.querySelector(".btn-submit"); //btn submit
const confirmationModal = document.getElementById('confirmation-modal'); //modale de confirmation
const closeConfirmation = document.getElementById("confirmation-close"); // croix modale confirmation
const btnCloseConfirmation = document.getElementById("btn-close"); //btn moalde confirmation

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeButton.addEventListener("click", closeModal);//principale croix
closeConfirmation.addEventListener("click", closeConfirmationModal);//validation croix
btnCloseConfirmation.addEventListener("click", closeConfirmationModal);//validation btn

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal principale
function closeModal() {
  modalbg.style.display = "none";
}
//close modal validation de formulaire
function closeConfirmationModal(){
  confirmationModal.style.display = "none";
}

// checking Input FirstName
firstNameInput.addEventListener("keyup", function(){
  const firstNameError = document.getElementById("firstNameError");
  if(regexFirstName.test(firstNameInput.value) == false) {
    firstNameError.innerText = "Le Prénom doit faire 2 lettres minimum";
    firstNameError.style.color = "#e54858";
    firstNameError.style.fontSize = "0.7em";
    firstNameInput.parentElement.dataset.errorVisible = "true";

  } else {
      firstNameError.innerText = "";
      firstNameInput.parentElement.dataset.errorVisible = "false";
  } 
})

// checking Input LastName
lastNameInput.addEventListener("keyup", function(){
  const lastNameError = document.getElementById("lastNameError");
  if(regexLastName.test(lastNameInput.value) == false) {
    lastNameError.innerText = "Le nom doit faire 2 lettres minimum";
    lastNameError.style.color = "#e54858";
    lastNameError.style.fontSize = "0.7em";
    lastNameInput.parentElement.dataset.errorVisible = "true";
  } else {
      lastNameError.innerText = "";
      lastNameInput.parentElement.dataset.errorVisible = "false";
  } 
})

// checking Input Email
emailInput.addEventListener("keyup", function(){
  const emailError = document.getElementById("emailError");
  if(regexEmail.test(emailInput.value) == false) {
    emailError.innerText = "L'adresse mail n'est pas valide";
    emailError.style.color = "#e54858";
    emailError.style.fontSize = "0.7em";
    emailInput.parentElement.dataset.errorVisible = "true";
  } else {
      emailError.innerText = "";
      emailInput.parentElement.dataset.errorVisible = "false";
  } 
})

// checking Input Birthdate
birthdateInput.addEventListener("blur", function(){
  const birthdateError = document.getElementById("birthdateError");
  if(regexBirthdate.test(birthdateInput.value) == false) {
    birthdateError.innerText = "Renseignez une date de naissance valide";
    birthdateError.style.color = "#e54858";
    birthdateError.style.fontSize = "0.7em";
    birthdateInput.parentElement.dataset.errorVisible = "true";
  } else {
    const age =getAge(birthdateInput.value);
    if (age <= 18) {//validation de l'age limite 
      birthdateError.innerText = "Vous devez avoir plus de 18 ans";
      birthdateError.style.color = "#e54858";
      birthdateError.style.fontSize = "0.7em";
      birthdateInput.parentElement.dataset.errorVisible = "true";
    } else {
      birthdateError.innerText = "";
      birthdateInput.parentElement.dataset.errorVisible = "false";
    }
  } 
})

//fonction obtention de l'age dans birthdate
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

// checking input Quantity
quantityInput.addEventListener("blur", function(){
  const quantityError = document.getElementById("quantityError");
  if(regexGamesQuantity.test(quantityInput.value) == false) {
    quantityError.innerText = "La valeur doit être comprise entre 0 et 99";
    quantityError.style.color = "#e54858";
    quantityError.style.fontSize = "0.7em";
    quantityInput.parentElement.dataset.errorVisible = "true";
  } else {
      quantityError.innerText = "";
      quantityInput.parentElement.dataset.errorVisible = "false";
  } 
})

// checking btn radio City
let locationChecked = false;
let checkboxValues = [];

function checkRadio() {
    const cityForm = document.getElementById("cityForm");
    const cityRadios = cityForm.querySelectorAll(".ville-checkbox");
    const locationError = document.getElementById("locationError");
    cityRadios.forEach((radio) => checkboxValues.push(radio.checked));
    if (checkboxValues.includes(true)) {
        locationChecked = true;
        locationError.innerText = "";
    } else {
        locationError.innerText = "Vous devez sélectionner une ville";
        locationError.style.color = "#e54858";
        locationError.style.fontSize = "0.7em";
        locationChecked = false;
    }
}
//validation du formulaire 
function validate(event) {
    event.preventDefault()
    checkRadio();
    if (regexFirstName.test(firstNameInput.value) == true &&
        regexLastName.test(lastNameInput.value) == true &&
        regexEmail.test(emailInput.value) == true &&
        regexBirthdate.test(birthdateInput.value) == true &&
        regexGamesQuantity.test(quantityInput.value) == true &&
        document.querySelectorAll("[name=location]:checked").length > 0 &&
        cguCheckbox.checked == true &&
        locationChecked == true) {
        closeModal();
        confirmationModal.style.display = "block";
    } else {//retour d'erreur si la validation échoue au clic
          firstNameError.innerText = regexFirstName.test(firstNameInput.value) == true ? "" : "Le Prénom doit faire 2 lettres minimum", firstNameError.style.color = "#e54858", firstNameError.style.fontSize = "0.7em";
          lastNameError.innerText = regexLastName.test(lastNameInput.value) == true ? "" : "Le nom doit faire 2 lettres minimum", lastNameError.style.color = "#e54858", lastNameError.style.fontSize = "0.7em";
          emailError.innerText = regexEmail.test(emailInput.value) == true ? "" : "L'adresse mail n'est pas valide", emailError.style.color = "#e54858", emailError.style.fontSize = "0.7em";
          birthdateError.innerText = regexBirthdate.test(birthdateInput.value) == true ? "" : "Renseignez une date de naissance valide", birthdateError.style.color = "#e54858", birthdateError.style.fontSize = "0.7em";
          quantityError.innerText = regexGamesQuantity.test(quantityInput.value) == true  ? "" : "La valeur doit être comprise entre 0 et 99", quantityError.style.color = "#e54858", quantityError.style.fontSize = "0.7em";
          locationError.innerText = locationChecked == true ? "" : "Vous devez sélectionner une ville", locationError.style.color = "#e54858", locationError.style.fontSize = "0.7em";
          cguCheckedError.innerText = cguCheckbox.checked == true ? "" : "Veuillez accepter les conditions d'utilisations", cguCheckedError.style.color = "#e54858", cguCheckedError.style.fontSize = "0.7em";           
      }
}
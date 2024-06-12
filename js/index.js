const greetingForm = document.querySelector('.input-form');

const nameInput = document.getElementById('name');
const nameError = document.querySelector('name-error');
const greetBtn = document.getElementById('greetBtn');
const dataBox = document.querySelector('.data');
const responseBox = document.getElementById('response');
const greetText = document.querySelector('.greet-text');
const motQuote = document.querySelector('.mot-quote');
const backIcon = document.querySelector('.back');

backIcon.addEventListener('click', () => {
  dataBox.classList.remove('hidden');
  responseBox.classList.remove('visible');
  responseBox.classList.add('hidden');
});

greetingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getGreeting();
});

function validateOnSubmit() {}

function setErrorStatus(input, message) {
  console.log(input, message, 'the input');
  const errorMessage = input.parentElement.querySelector('.error-message');
  console.log(errorMessage, 'errorMessage here');
  errorMessage.innerText = message;
  input.classList.add('input-error');
}

function setSuccessStatus(input) {
  const errorMessage = input.parentElement.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.innerText = '';
  }
  input.classList.remove('input-error');
}

const getGreeting = () => {
  const name = nameInput.value.trim();
  if (name == '') {
    setErrorStatus(nameInput, 'Name cannot be blank!');

    return;
  } else {
    setSuccessStatus(nameInput);
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        dataBox.classList.add('hidden');
        responseBox.classList.remove('hidden');
        responseBox.classList.add('visible');
        greetText.innerHTML = `Greetings ${nameInput.value.trim()}!`;
        motQuote.innerHTML = `${data[Math.floor(Math.random() * 16) + 1].text}`;
        greetingForm.reset();
      });
  }
};

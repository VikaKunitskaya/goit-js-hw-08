import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  const message = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, message);
}

function populateForm() {
  const savedForm = localStorage.getItem(STORAGE_KEY);
  const parsedForm = JSON.parse(savedForm);

  if (parsedForm) {
    formEl.email.value = parsedForm.email;
    formEl.message.value = parsedForm.message;
  }
}

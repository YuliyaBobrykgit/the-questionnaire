const form = document.querySelector(".form");
form.addEventListener("submit", async (event) => {
  // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
  // https://learn.javascript.ru/default-browser-action
  event.preventDefault();

  const name = document.querySelector('#name').value
  const secondName = document.querySelector('#secondName').value
  const email = document.querySelector('#email').value
  const phone = parseInt((document.querySelector('#phone').value))
  const agree = document.querySelector('#agree').checked

  try { 
    const response = await fetch('https://polinashneider.space/user', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: YuliyaBobrykgit'
    },
    body: JSON.stringify({
      name,
      secondName,
      email,
      phone,
      agree
     }),
  });
  if (response.status < 200 || response.status > 299) {
    showErrorToast ('Упс! Произошла ошибка. Попробуйте снова через минуту.')
    return;
  }
  startFireworks()
  showSuccessToast('Регистрация прошла успешно!')
  resetAllFields() 
} catch (error) {
  console.log(error);
  showErrorToast ('Упс! Произошла ошибка. Попробуйте снова через минуту.')
}
});


function resetAllFields() {
  form.reset();
}

function startFireworks() {
  const container = document.querySelector('.fireworks')
  const fireworks = new Fireworks.default(container, {
    particles: 200,
    delay: { min: 15, max: 20 }
  })
  fireworks.start()
  setTimeout(() => fireworks.waitStop(), 5000);
}

function showToast(text, color1, color2) {
  Toastify({
  text: text,
  style: {
    background: `linear-gradient(to right, ${color1},  ${color2})`,
  },
  duration: 5000
  }).showToast();
}

function showSuccessToast(msg) {
  showToast(msg, '#00b09b', '#96c93d')
}

function showErrorToast(msg) {
  showToast(msg, '#7C1D05', '#FA7F60')
}
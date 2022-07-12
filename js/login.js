let elEmail = document.querySelector('.email-input');
let elPassword = document.querySelector('.password-input');
let elForm = document.querySelector('.form');
let elError = document.querySelector('.error-message');

elForm.addEventListener('submit', e => {
    e.preventDefault();
    let email = elEmail.value;
    let password = elPassword.value;
    fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token && password === 'Mirsidiq') {
                window.localStorage.setItem('token', data.token);
                elError.classList.remove('active')
                window.location.replace('home.html')
            } else {
                elError.classList.add('active');
            }
        });
})
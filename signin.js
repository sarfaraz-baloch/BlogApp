import {
    auth,
    signInWithEmailAndPassword
} from './firebase.js'


// const sumbit_btn = document.getElementById("sumbit_btn");
const form = document.getElementById("form_signin");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = 'profile.html'
        console.log('sign in')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  `${errorMessage}`,
          });
    });
})
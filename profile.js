import {
  auth,
  signOut,
  doc,
  getDoc,
  db,
  setDoc,
  getDocs,
  addDoc,
  getFirestore,
  collection,
  ref,
  uploadBytes,
  getDownloadURL,
  storage,
  serverTimestamp 
} from "./firebase.js";

const Logout_btn = document.querySelector("#Logout_btn");

Logout_btn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

// profile page



const form = document.querySelector("#form");


const dashbored = document.querySelector("#dashbored");
const home = document.querySelector("#home");
const public_blog = document.querySelector("#public");
const container = document.getElementById('container')
const container_public = document.getElementById('container-public')
dashbored.addEventListener("click", () => {
  // alert('working')
  form.style.display = 'none'
  container.style.display = 'flex'
  container_public.style.display = 'none'
})
home.addEventListener("click", () => {
  // alert('working')
  form.style.display = 'flex'
  container.style.display = 'none'
  container_public.style.display = 'none'
  // public_blog.style.display = 'none'
})

public_blog.addEventListener("click", () => {
  form.style.display = 'none'
  container.style.display = 'none'
  container_public.style.display = 'flex'
  // public_blog.style.display = 'flex'
})

const add = document.querySelector("#add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e);


  // add.disabled = true
  //  add.innerText = 'loading...'

   // store in storage
  const userInfo = {
    img: e.target[0].files[0],
    tittle: e.target[1].value,
    descraption: e.target[2].value,
    timestamp: serverTimestamp(),
    // currentUser: auth.currentUser.name,
    // date: e.target[3].value,
    // time: e.target[4].value,
    // createdby: e.target[5].value,
    createdUid: auth.currentUser.uid,
    createdByEmail: auth.currentUser.email,
  };
console.log(userInfo)
console.log(auth.currentUser)
  add.disabled = true
  add.innerText = 'Loading...'
  const imgRef = ref(storage, userInfo.img.name);
  uploadBytes(imgRef, userInfo.img)
  .then(() => {
    console.log("image uploaded");
    getDownloadURL(imgRef).then((url) => {
      console.log(url);
      userInfo.img = url;

      // store in firestore
      const blogscollection = collection(db, "blogs");
      // console.log(blogscollection);

      addDoc(blogscollection, userInfo)
      .then(() => {



        add.disabled = false
        add.innerText = 'Add'
        let timerInterval;
Swal.fire({
  title: "Auto close alert!",
  html: "I will close in <b></b> milliseconds.",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});

        ;})
        .catch((err) => {
          console.log(err);
          add.disabled = false
         add.innerText = 'Add'
        })
    })
  }).catch((err) => {
    console.log(err); 
    add.disabled = false
   add.innerText = 'Add'
  })
});

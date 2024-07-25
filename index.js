import {
  auth,
  createUserWithEmailAndPassword,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  doc,
  db,
  setDoc,
} from "./firebase.js";

// 1: create account with email and password we use createUserWithEmailAndPassword and auth
// 2: upload image to firebase storage and get url we use ref, uploadBytes and getDownloadURL 
// 3: set document in firestore we use doc, setDoc


const sumbit_btn = document.getElementById("sumbit_btn");
const form = document.getElementById("form");
const lable = document.getElementById("lable");
const descraption = document.getElementById("descraption");
const tittle = document.getElementById("tittle");


document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("#phone");
const iti =    window.intlTelInput(input,  { 
      // Options
      
      initialCountry: "auto",
      
      
      geoIpLookup: function(success, failure) {
          
      
          fetch("https://ipinfo.io?token=<YOUR_TOKEN>")
              .then(response => response.json())
              .then(data => success(data.country))
              .catch(() => success("us"));
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e)

      // let getnumber = iti.getnumber()
      const nationalNumber = iti.getNumber(intlTelInputUtils.NATIONAL); // Phone number without country code
  
    lable.innerText = "image Uploading...."
    lable.disable = true
    const img = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const name = e.target[4].value;
    const lastName = e.target[5].value;
    const phoneNumber = nationalNumber;
    // const company = e.target[7].value;

    
    const userInfo = {
      img,
      email,
      password,
      confirmPassword,
      name,
      lastName,
      phoneNumber,
      // company,
     
    }

    // 1 : creating account with email and password

    sumbit_btn.disable = true;
    sumbit_btn.innerText = "Loading..."
    createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.uid, "sign in");

      // 2 : upload image to firebase storage and get url

      const storageRef = ref(storage, `users/${user.uid}`);
      //uploading img file to user
      uploadBytes(storageRef, img)
      .then(()=>{
        console.log("image uploaded");

        // getting url of img

        getDownloadURL(storageRef)

        .then((url)=>{
          console.log(url ,'url is here');

          userInfo.img = url;
          // // 3 : set document in firestore

          const docRef = doc(db, "users", user.uid);
          // setting document

          setDoc(docRef, userInfo)
          .then(()=>{
            console.log("document set");
            window.location.href = "profile.html";
            sumbit_btn.disable = false;
            sumbit_btn.innerText = "Submit"
            lable.innerText = "Upload img"
            lable.disable = false
            
            
          }).catch((error)=>{
            console.log(error);
           
          })
        }).catch((error)=>{
          console.log( "url not found");
        })

      }).catch((error)=>{
        console.log("image not uploaded");
        sumbit_btn.disable = false;
        sumbit_btn.innerText = "Submit"
        lable.innerText = "Upload img"
         lable.disable = false
      })
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });

        sumbit_btn.disable = false;
        sumbit_btn.innerText = "Submit"

        lable.innerText = "Upload img"
        lable.disable = false
    });
  })
});

  

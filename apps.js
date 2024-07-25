import {
  auth,
  storage,
  db,
  onAuthStateChanged,
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  deleteDoc,
  
} from "./firebase.js";

// console.log('firestore ==> ',db)
// console.log('storage ===>',storage)
// console.log('auth ==>',auth)

const profile_img = document.getElementById("profile_img");
const profile_name = document.getElementById("profile_name");
const profile_email = document.getElementById("profile_email");
const profile_phone = document.getElementById("profile_phone");
const profile_company = document.getElementById("profile_company");
const profile2_tittle = document.getElementById("profile2_tittle");
const profile2_descraption = document.getElementById("profile2_descraption");
const container = document.getElementById("container");
const container_public = document.getElementById("container-public");

// getProfile();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    const uid = user.uid;
    // ...
    console.log("user Sign in");
    blogEvents(user.uid);

    const docRef = doc(db, "users", user.uid);
    const getdoc = getDoc(docRef)
      .then((doc) => {
        profile_img.src = doc.data().img;
        profile_name.innerText = doc.data().name + " " + doc.data().lastName;
        profile_email.innerText = doc.data().email;

      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("User is signed out");
    // if (window.location.pathname == '/signup.html' && window.location.pathname == '/index.html') {
    window.location.href = "index.html";

    // }
    // ...
  }
});


// getting private blogs from firestore
async function blogEvents(uid) {
  const q = query(collection(db, "blogs" ,), where("createdUid", "==", uid));

  // const docRef = doc(db, "users", uid);
  // const getdoc = getDoc(docRef)
  //   .then((doc) => {
  //     console.log();

      
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });


  const snapshot = await getDocs(q).then((snapshot) => {
   
    const docRef = doc(db, "users", uid);
    const getdoc = getDoc(docRef)
    .then((ele) => {
      // console.log(ele.data().lastName);

      snapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const date = new Date().toLocaleDateString();
        // const time = new Date().toLocaleTimeString()
        
        const card = `
  
        <a id="blog" href="#" class="relative mt-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${doc.data().img}" alt="">
  <div class="flex flex-col justify-between p-4 leading-normal">
    <h5  id="tittle_data" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${doc.data().tittle}</h5>
    <p id="descraption_data" class="mb-10 font-normal  text-gray-700 dark:text-gray-400">${doc.data().descraption}</p>
    
    <div class="flex justify-between items-center">
    <p class=" mb-3  font-normal text-gray-700 dark:text-gray-400">${date}</p>
    <p class=" px-4 mb-3 font-normal text-gray-700 dark:text-gray-400">${ele.data().name + " " + ele.data().lastName}</p>
    </div>
  
    <div class="flex justify-between items-center">
    <button
            id="sumbit_btn"
            type="submit"
            onclick="updateBlog('${doc.id}')"
            class="text-white mt-2  bg-green-300 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </button>
  
          <button
            id="sumbit_btn"
            type="submit"
            onclick="deleteBlog('${doc.id}')"
            class="text-white mt-2  bg-red-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete
          </button>
    </div>
  </div>
  
  </a>
  
        `;
  
  container.innerHTML += card;
      });
    })
   
  }).catch((error) => {
    console.log(error);
  })



  // user blog update
  window.updateBlog = updateBlog
  async function updateBlog(id) {

    const blogRef = doc(db, "blogs", id); 
    const tittle_data = document.getElementById("tittle_data")
    const descraption_data = document.getElementById("descraption_data")
    
    let edit_tittle = document.getElementById("edit-tittle")
    let edit_Description = document.getElementById("edit-descraption")
    const edit_container = document.getElementById("edit-container");

    edit_tittle.value = tittle_data.innerText
    edit_Description.value = descraption_data.innerText

    edit_container.style.display = "block"
    container.style.display = "none"
    container_public.style.display = "none"



  document.getElementById("save").addEventListener("click", async () => {

  await updateDoc(blogRef, {
    tittle: edit_tittle.value,
    descraption: edit_Description.value,
  }).then(() => {
    edit_container.style.display = "none"
    container.style.display = "flex"
    window.location.reload()
    console.log("Document successfully updated!");
    
  }).catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
  });
})
  }

  // user blog delete
  window.deleteBlog = deleteBlog
  async function deleteBlog(id) {
    const blogRef = doc(db, "blogs", id);
    await deleteDoc(blogRef).then(() => {
      console.log("Document successfully deleted!");
      window.location.reload()
    })
  }


  // public blog


  const querySnapshot = await getDocs(collection(db, "blogs"));

  querySnapshot.forEach((doc) => {
  
  // const docs = collection(db, "blogs", doc.id, "users");

  

    const card = `

          <a id="blog" href="#" class="relative mt-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${doc.data().img}" alt="">
  <div class="flex flex-col justify-between p-4 leading-normal">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${doc.data().tittle}</h5>
      <p class="mb-10 font-normal text-gray-700 dark:text-gray-400">${doc.data().descraption}</p>
       <p class="absolute bottom-0 mb-3  font-normal text-gray-700 dark:text-gray-400">${doc.data().date} / ${doc.data().time}</p>
      <p class="absolute bottom-0 right-0 px-4 mb-3 font-normal text-gray-700 dark:text-gray-400">${doc.data().createdby}</p>
  </div>
</a>
          `;

    container_public.innerHTML += card;
  });
}


//  const docRef = doc(db, "users", uid);
//     const getdoc = getDoc(docRef)
//     .then((ele) => {
//       // console.log(ele.data().lastName);

//       snapshot.forEach((doc) => {
//         // console.log(doc.id, " => ", doc.data());
//         const date = new Date().toLocaleDateString();
//         // const time = new Date().toLocaleTimeString()
        
//         const card = `
  
//         <a id="blog" href="#" class="relative mt-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//   <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${doc.data().img}" alt="">
//   <div class="flex flex-col justify-between p-4 leading-normal">
//     <h5  id="tittle_data" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${doc.data().tittle}</h5>
//     <p id="descraption_data" class="mb-10 font-normal  text-gray-700 dark:text-gray-400">${doc.data().descraption}</p>
    
//     <div class="flex justify-between items-center">
//     <p class=" mb-3  font-normal text-gray-700 dark:text-gray-400">${date}</p>
//     <p class=" px-4 mb-3 font-normal text-gray-700 dark:text-gray-400">${ele.data().name + " " + ele.data().lastName}</p>
//     </div>
  
//     <div class="flex justify-between items-center">
//     <button
//             id="sumbit_btn"
//             type="submit"
//             onclick="updateBlog('${doc.id}')"
//             class="text-white mt-2  bg-green-300 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Edit
//           </button>
  
//           <button
//             id="sumbit_btn"
//             type="submit"
//             onclick="deleteBlog('${doc.id}')"
//             class="text-white mt-2  bg-red-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Delete
//           </button>
//     </div>
//   </div>
  
//   </a>
  
//         `;
  
//   container.innerHTML += card;
//       });
//     })
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firestore = getFirestore();

document.getElementById("myForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const birthday = document.getElementById("birthday").value;
  const email = document.getElementById("mail").value;
  const password = document.getElementById("password").value;

  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      firstName,
      lastName,
      birthday,
      email,
      password
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", error);
  }
});

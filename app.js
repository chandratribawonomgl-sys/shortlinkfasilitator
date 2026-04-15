import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, email, password);
  alert("Login sukses!");
};

// CREATE LINK
window.createLink = async () => {
  const url = document.getElementById("url").value;
  const slug = document.getElementById("slug").value;

  await addDoc(collection(db, "links"), {
    url,
    slug,
    clicks: 0
  });

  alert("Link dibuat!");
  loadLinks();
};

// LOAD DATA
async function loadLinks() {
  const querySnapshot = await getDocs(collection(db, "links"));
  let html = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `
      <p>
        ${data.slug} → ${data.url} (${data.clicks} klik)
      </p>
    `;
  });

  document.getElementById("list").innerHTML = html;
}

loadLinks();

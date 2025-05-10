import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhEI-87Pb-PE7MJBUvjJybxBvkZ6fSLdM",
  authDomain: "turkay-utt.firebaseapp.com",
  projectId: "turkay-utt",
  storageBucket: "turkay-utt.firebasestorage.app",
  messagingSenderId: "164971626850",
  appId: "1:164971626850:web:0afd556140f5d88a8a2c3b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("registerBtn").addEventListener("click", async () => {
  const userData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    university: document.getElementById("university").value,
    faculty: document.getElementById("faculty").value,
    department: document.getElementById("department").value,
    classLevel: document.getElementById("classLevel").value,
    studentNumber: document.getElementById("studentNumber").value,
    interests: document.getElementById("interests").value,
    createdAt: serverTimestamp()
  };

  try {
    const uniqueId = Date.now().toString(); // örnek benzersiz ID
    await setDoc(doc(db, "uyelikBasvurulari", uniqueId), userData);
    alert("Üyelik başvurunuz başarıyla alındı!");
  } catch (error) {
    alert("Hata: " + error.message);
  }
});

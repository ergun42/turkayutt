// admin.js
const firebaseConfig = {
    apiKey: "AIzaSyDhEI-87Pb-PE7MJBUvjJybxBvkZ6fSLdM",
    authDomain: "turkay-utt.firebaseapp.com",
    projectId: "turkay-utt",
    storageBucket: "turkay-utt.firebasestorage.app",
    messagingSenderId: "164971626850",
    appId: "1:164971626850:web:0afd556140f5d88a8a2c3b"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Yalnizca admin maili erisebilir
  auth.onAuthStateChanged(user => {
    if (user && user.email === "osmane722@gmail.com") {
      document.getElementById("adminEmail").textContent = `Yönetici: ${user.email}`;
    } else {
      alert("Bu sayfaya sadece yönetici erişebilir.");
      window.location.href = "anasayfa.html";
    }
  });
  
  // Çıkış butonu
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      window.location.href = "login.html";
    });
  });
  
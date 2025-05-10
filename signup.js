const firebaseConfig = {
    apiKey: "AIzaSyDhEI-87Pb-PE7MJBUvjJybxBvkZ6fSLdM",
    authDomain: "turkay-utt.firebaseapp.com",
    projectId: "turkay-utt",
    storageBucket: "turkay-utt.firebasestorage.app",
    messagingSenderId: "164971626850",
    appId: "1:164971626850:web:0afd556140f5d88a8a2c3b"
  };
  
  // Firebase başlat
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  document.getElementById("signupBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Kayıt başarılı!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Hata: " + error.message);
      });
  });
  

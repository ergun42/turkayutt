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
  
  document.getElementById("loginBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Giriş başarılı → anasayfa yönlendirme
        alert("Giriş başarılı!");
        window.location.href = "anasayfa.html";
      })
      .catch((error) => {
        alert("Giriş başarısız: " + error.message);
      });
  });
  
// Firebase yapılandırması
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
  const db = firebase.firestore();
  
  document.getElementById("registerBtn").addEventListener("click", async () => {
    const uniqueId = Date.now().toString();
  
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
      createdAt: new Date()
    };
  
    try {
      await db.collection("uyelikBasvurulari").doc(uniqueId).set(userData);
      alert("Üyelik başvurunuz başarıyla alındı!");
    } catch (error) {
      alert("Hata: " + error.message);
    }
  });
  
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
  const db = firebase.firestore();
  
  let currentUser = null;
  let userScore = 0;
  
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user;
      document.getElementById("welcomeUser").textContent = `Hoş geldiniz, ${user.email}!`;
      if (user.email === "osmane722@gmail.com") {
        document.getElementById("adminBtn").style.display = "block";
      }
  
      const puanDoc = await db.collection("puanlar").doc(user.email).get();
      userScore = puanDoc.exists ? puanDoc.data().puan : 0;
      document.getElementById("userScore").textContent = `Puanınız: ${userScore}`;
    } else {
      window.location.href = "login.html";
    }
  });
  
  document.getElementById("adminBtn").addEventListener("click", () => {
    window.location.href = "admin.html";
  });
  
  document.getElementById("toggleDarkMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  
  document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.signOut().then(() => window.location.href = "login.html");
  });
  
  db.collection("gununBilgisi").limit(1).get().then(snapshot => {
    if (!snapshot.empty) {
      document.getElementById("gununBilgisi").innerText = snapshot.docs[0].data().bilgi;
    }
  });
  
  // NASA APOD ve Görsel Tahmin Oyunu
  const nasaKey = "e1aGFAATXPdCyvZ4dK1fAdQaYBHxWkakMNwBGwIf";
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`)
    .then(res => res.json())
    .then(data => {
      const aiDiv = document.getElementById("aiHaberleri");
      aiDiv.innerHTML = `
        <img src="${data.url}" class="nasa-image" alt="${data.title}">
        <p style="margin: 20px;">${data.explanation}</p>
      `;
  
      const gameDiv = document.getElementById("apodGame");
      const correctTitle = data.title;
      const fakeTitles = [
        "Galaksiler Arası Toz Bulutu",
        "Plüton’un Yörüngesi",
        "Uzaydaki İlk Radyo Yayını"
      ];
  
      const allOptions = [...fakeTitles];
      allOptions.splice(Math.floor(Math.random() * 4), 0, correctTitle);
  
      gameDiv.innerHTML = `<p>Yukarıdaki açıklamaya göre bu görselin başlığı hangisidir?</p>`;
      allOptions.forEach(title => {
        const btn = document.createElement("button");
        btn.textContent = title;
        btn.onclick = async () => {
          if (title === correctTitle) {
            alert("🎉 Doğru bildiniz! +1 puan");
            userScore++;
            document.getElementById("userScore").textContent = `Puanınız: ${userScore}`;
            if (currentUser) {
              await db.collection("puanlar").doc(currentUser.email).set({ puan: userScore });
            }
          } else {
            alert(`❌ Yanlış. Doğru cevap: ${correctTitle}`);
          }
          gameDiv.querySelectorAll("button").forEach(b => b.disabled = true);
        };
        gameDiv.appendChild(btn);
      });
    })
    .catch(err => {
      console.error("NASA API Hatası:", err);
      document.getElementById("aiHaberleri").innerText = "Veri alınamadı.";
    });
    // Harita başlat
const map = L.map('satelliteMap').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Uydu simgesi
const satelliteIcon = L.icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Satellite_icon_1.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// Sürüklenebilir uydu işaretçisi
const satelliteMarker = L.marker([0, 0], {
  icon: satelliteIcon,
  draggable: true
}).addTo(map).bindPopup("Uydunu Yerleştir!").openPopup();

// Sürükleme sonrası konum bildirimi
satelliteMarker.on("dragend", () => {
  const { lat, lng } = satelliteMarker.getLatLng();
  alert(`📍 Uydu başarıyla yerleştirildi.\nKonum: ${lat.toFixed(3)}, ${lng.toFixed(3)}`);
});

  
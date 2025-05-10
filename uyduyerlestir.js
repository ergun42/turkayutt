// Değişken adı artık 'satelliteMapInstance' oldu
const satelliteMapInstance = L.map('satelliteMap').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(satelliteMapInstance);

const satelliteIcon = L.icon({
  iconUrl: 'th.jpg',
  iconSize: [50, 50],
  iconAnchor: [25, 25]
});

const satelliteMarker = L.marker([0, 0], {
  icon: satelliteIcon,
  draggable: true
}).addTo(satelliteMapInstance).bindPopup("Uydunu Yerleştir!").openPopup();

satelliteMarker.on("dragend", () => {
  const { lat, lng } = satelliteMarker.getLatLng();
  alert(`📍 Uydu başarıyla yerleştirildi.\nKonum: ${lat.toFixed(3)}, ${lng.toFixed(3)}`);
});

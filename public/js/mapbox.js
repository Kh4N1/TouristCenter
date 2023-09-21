const locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log(locations);

// // Initialize a map centered at (53, 12) at zoom level 5
// var map = L.map("map").setView([53, 12], 5);
//
// // Style URL format in XYZ PNG format; see our documentation for more options
// L.tileLayer(
//   "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
//   {
//     maxZoom: 20,
//     attribution:
//       '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
//   },
// ).addTo(map);


var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
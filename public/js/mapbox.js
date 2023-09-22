

export const displayMap = (locations) => {
  let averageLatitude = 0;
  let averageLongitude = 0;

  locations.forEach((location) => {
    averageLatitude += location.coordinates[0];
    averageLongitude += location.coordinates[1];
  });

  averageLatitude /= locations.length;
  averageLongitude /= locations.length;

  var map = L.map("map").setView([averageLongitude, averageLatitude], 6);

  var Jawg_Light = L.tileLayer(
    "https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}",
    {
      attribution:
        '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 4,
      maxZoom: 22,
      subdomains: "abcd",
      accessToken:
        "IyWP5GvISCYl4AHX7MhGkEaDYdExDRx9O2JCc5QXulgdXdBxP4AR5JCsdHgP9oro",
    },
  );

  Jawg_Light.addTo(map);
  // var marker = L.marker([39.7644863,-105.0199181]).addTo(map);
  var myIcon = L.icon({
    iconUrl: "/img/pin.png",
    iconSize: [38, 45],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  locations.forEach((loc) => {
    // add marker
    let lat = loc.coordinates[0];
    let lng = loc.coordinates[1];
    var marker = L.marker([lng, lat], { icon: myIcon }).addTo(map);
    var popup = marker
      .bindPopup(`<h1>Day ${loc.day}: ${loc.description}</h1>`)
      .openPopup();

    // L.marker([loc.coordinates]).addTo(map)
  });
};

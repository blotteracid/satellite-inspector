import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('satellite');
  var myMap = L.map('mapid').setView([51.505, -0.09], 2);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(myMap);

  L.terminator().addTo(myMap)

  // My GEO
  navigator.geolocation.getCurrentPosition(function(position) {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(myMap);
    myMap.setView([position.coords.latitude, position.coords.longitude]);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    axios({
      method: 'post',
      url: '/getSatelliteData',
      data: obj
    })
    .then(res => {
      L.marker([res.data.lat, res.data.lng]).addTo(myMap);
      myMap.setView([res.data.lat, res.data.lng]);
    })
    .catch(res => {
        console.log(res);
    });
  });


});

// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map. Satellite view: satellite-streets-v11; Dark view: dark-v10; Streets: streets-v11; Light: light-v10; navigation-night: navigation-night-v1; outdoors: outdoors-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });

let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Add GeoJSON data
let airportData = "https://raw.githubusercontent.com/fadlnabbouh/Mapping_Earthquakes/main/majorAirports.json";

//Grabbing GeoJSON Data
d3.json(airportData).then(function(data) {
    console.log(data);
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng).bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2><hr><h3>Airport Name: " + feature.properties.name + "</h3>");
            }
    }).addTo(map);
});

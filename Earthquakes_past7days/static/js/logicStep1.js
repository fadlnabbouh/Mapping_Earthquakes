// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map. Satellite view: satellite-streets-v11; Dark view: dark-v10; Streets: streets-v11; Light: light-v10; navigation-night: navigation-night-v1; outdoors: outdoors-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });

let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Create a style for the lines.
// let myStyle = {
//     color: "#0000FF",
//     weight: 1,
//     fillColor: "ffff00"
// };

//Grabbing GeoJSON Data
d3.json(earthquakeData).then(function(data) {
    console.log(data);
    L.geoJson(data 
        // {
        // style: myStyle,
        // onEachFeature: function(feature, layer) {
        //     layer.bindPopup("<h2>Neighbourhood: " + feature.properties.AREA_NAME + "</h2>");
        // }
    //}
    ).addTo(map);
});

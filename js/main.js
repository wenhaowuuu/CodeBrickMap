/* =====================
   You should NOT need to change this file (though you are not forbidden from doing so)
===================== */

/* =====================
  Call getAndParseData to grab our dataset through a jQuery.ajax call ($.ajax)
===================== */
//prepare the transformed data from csv



//claim the global variables:
var zipcodes_url = "https://raw.githubusercontent.com/wenhaowuuu/CodeBrickMap/master/data/bay_zipcode.geojson";
var api = "AIzaSyAKXibsZkP6jRJVOSHesto-5aVs4ZQR3uk";
var dist_url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=94010,CA&destinations=250 Executive Park Blvd, San Francisco, CA 94134&key=" + api;

console.log(dist_url);

var mydistance = [
  {
   "destination_addresses" : [ "250 Executive Park Blvd, San Francisco, CA 94134, USA" ],
   "origin_addresses" : [ "Hillsborough, CA 94010, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "12.2 mi",
                  "value" : 19666
               },
               "duration" : {
                  "text" : "20 mins",
                  "value" : 1217
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
},

{
   "destination_addresses" : [ "250 Executive Park Blvd, San Francisco, CA 94134, USA" ],
   "origin_addresses" : [ "San Francisco, CA 94115, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "8.0 mi",
                  "value" : 12841
               },
               "duration" : {
                  "text" : "19 mins",
                  "value" : 1136
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
},

{
   "destination_addresses" : [ "250 Executive Park Blvd, San Francisco, CA 94134, USA" ],
   "origin_addresses" : [ "Colma, CA 94014, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "6.6 mi",
                  "value" : 10681
               },
               "duration" : {
                  "text" : "15 mins",
                  "value" : 904
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
},

{
   "destination_addresses" : [ "250 Executive Park Blvd, San Francisco, CA 94134, USA" ],
   "origin_addresses" : [ "Daly City, CA 94015, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "10.8 mi",
                  "value" : 17386
               },
               "duration" : {
                  "text" : "15 mins",
                  "value" : 905
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
},

{
   "destination_addresses" : [ "250 Executive Park Blvd, San Francisco, CA 94134, USA" ],
   "origin_addresses" : [ "Millbrae, CA 94030, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "9.7 mi",
                  "value" : 15636
               },
               "duration" : {
                  "text" : "11 mins",
                  "value" : 633
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}



]

var coordsMiddleSchools = [];
var heat_middleschools;
var CompanyMarkers = [];
var HomeMarkers = [];
// 1. setting up the base map
//1.SETTING UP THE BASEMAP
var southWest = L.latLng(37.015900, -123.355811),
    northEast = L.latLng(38.270170, -121.379737),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
 maxBounds: bounds,
 center: [37.790043, -122.208451],
 zoom: 11,
 minZoom: 7,
 maxZoom: 17
});



var lightmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
 maxZoom: 18,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
 subdomains: 'abcd'
});

var darkmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
 maxZoom: 18,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
 subdomains: 'abcd'
});

// var hybridmap = L.map('map-mappage').setView([-25.288145, -57.485214], 11);
var hybridmap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

var nightlightmap = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});


//var satellite map
var mapLink =
   '<a href="http://www.esri.com/">Esri</a>';
var wholink =
   'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

var satellitemap = L.tileLayer(
   'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
   attribution: '&copy; '+mapLink+', '+wholink,
   minzoom: 5,
   maxZoom: 19,
});

$('#map-mappage').show(10000);
map.addLayer(lightmap);


//SWITCH THE BASEMAPS
$('#lightmap').click(function(){
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.addLayer(lightmap);
})
$('#darkmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(hybridmap);
  map.addLayer(darkmap);
})

$('#hybridmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.addLayer(hybridmap);
})

$('#satellitemap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.addLayer(satellitemap);
});

$('#nighlightmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.removeLayer(satellitemap);
  // map.addLayer(nightlightmap);
});


//url distance parsing
$(document).ready(function(){
  // $.ajax(dist_url).done(function(data) {
  //   var parsedistdata = JSON.parse(data);
  //   console.log("distance url parsed");
  //   console.log(parsedistdata);
  //   //
  //   // var layerMappedPolygons = L.geoJson(parsedzipdata,
  //   //   {
  //   //     style: {opacity:0.4,width:0.5,color:'#E0903F'},
  //   //     pointToLayer: function (feature, latlngs) {
  //   //       return new L.Polygon(latlngs, {
  //   //         });
  //   //       }
  //   // }).addTo(map);
  //   });


    $.ajax({
        type: "POST",
        url: dist_url,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            // first_name: $("#namec").val(),
            // last_name: $("#surnamec").val(),
            // email: $("#emailc").val(),
            // mobile: $("#numberc").val(),
            // password: $("#passwordc").val()
        }),
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
            console.log(response);
        }
});


});


//from google maps api documentation, parsing result in javascript

for (i = 0; i < mydistance.length; i++) {
  var myAddress = mydistance[i].rows[0].elements[0].distance.text;
  console.log(myAddress);
};

// console.log(myAddress);


//map zipcodes in the Bay Area
$(document).ready(function(){
  $.ajax(zipcodes_url).done(function(data) {
    var parsedzipdata = JSON.parse(data);
    console.log("zipcodes parsed");
    var layerMappedPolygons = L.geoJson(parsedzipdata,
      {
        style: {opacity:0.4,width:0.5,color:'#E0903F'},
        // filter: myFilter2,
        pointToLayer: function (feature, latlngs) {
          return new L.Polygon(latlngs, {
            });
          }
      // }).addTo(map).bindPopup(feature.properties.zip);
    }).addTo(map).bindPopup("我们住同一个社区耶!");
    });
});



//add the point data from the shared google sheet
// var code = "2PACX-1vS7PmW1BbpRdjWqeTQJM7SjHKsuVMJAFf9-b5-BzTEtz15xcQ7Rz4a6VKGV09dArOFG8hb6C66Ydnww";
var sheeturl = 'https://docs.google.com/spreadsheets/d/1GW94JUDnyQYB3qzIK9sPuLUgwnDyEy4w3eWBASjdFPE/edit?usp=sharing';

//SHOW THE MAP DIV GRADUALLY
$('#map-mappage').show(10000);
// map.addLayer(hybridmap);
document.addEventListener('DOMContentLoaded',function(){
 Tabletop.init({
     key: sheeturl, //google spreadsheet id
     callback: function(sheet, tabletop){
       for (var i in sheet){
         var place = sheet[i]; //getting e row from table
         var coord = [place.Hlat, place.Hlon];
         coordsMiddleSchools.push(coord);

         var CompanyLayerMappedMarker = L.marker([place.Clat, place.Clon]).addTo(map)
           .bindTooltip(
             // "<img src=" + "/> " +
             "<img src=https://ibb.co/WzbnY1P>" +
             "</br>" +

             // "<b>Name: </b>" +
             // place.FirstName + ' ' + place.LastName +
             // "</br>" +

             "<b>Title: </b>" +
             place.Title +
             "</br>" +

             "<b>Company: </b>" +
             place.Company +
             "</br>" +

             // "<b>Relationship: </b>" +
             // place.Relationship +
             // "</br>" +

             "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;'>Connect!</button>"
           );

        CompanyMarkers.push(CompanyLayerMappedMarker);
        // console.log(CompanyMarkers);
        console.log("company marker generated.");


         var HomeLayerMappedMarker = L.marker([place.Hlat, place.Hlon])
           .addTo(map)
           .bindTooltip(
             // "<img src=" + "/> " +
             "<img src=https://simplemaps.com/static/img/frog.png>" +
             "</br>" +

             "<b>Name: </b>" +
             place.FirstName + ' ' + place.LastName +
             "</br>" +

             "<b>Title: </b>" +
             place.Title +
             "</br>" +

             "<b>Company: </b>" +
             place.Company +
             "</br>" +

             "<b>Relationship: </b>" +
             place.Relationship +
             "</br>" +

             "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;'>Connect!</button>"
           );

        HomeMarkers.push(HomeLayerMappedMarker);

           }

     },
     simpleSheet: true
   });

   //GENERATE HEATMAP FOR THE MIDDLE SCHOOL DATA

   //Reference
   // http://jsfiddle.net/jpeter06/yugh7t5m/

   coordsMiddleSchools = coordsMiddleSchools.map(function (p) { return [p[0], p[1], 6]; });
   console.log(coordsMiddleSchools);
   // console.log(middleschools);

    heat_middleschools = L.heatLayer(coordsMiddleSchools,{

           radius: 36,
           blur: 24,
           maxZoom: 12,

           // onEachFeature: function(feature,layer){
           //   console.log(layer.feature.geometry);
           //   // var coord = layer.feature.geometry.coordinates;
           //   // coordsMiddleSchools.push(coord);
           // },

       });

   console.log("middleschools heatmap generated.");



}

// function showInfo(data, tabletop) {
//   alert('Successfully processed!')
//   console.log(data);
// }
);


//control heatmap generation
var heatmapcount = 0;
$('#heatmapcontrol').click(function(){
  heatmapcount++;
  if(heatmapcount%2 === 0){
    map.removeLayer(heat_middleschools);
    console.log("heatmap removed.");
  }
  else{
    map.addLayer(heat_middleschools);
  }
});


//switch on the company markers
//still need to bring the effect in!!!
var ShowCompany = function(){
  map.removeLayer(HomeMarkers);
  map.addLayer(CompanyMarkers);
  console.log("company markers added.");
  // reference:
  // https://jsfiddle.net/a99dkxp1/4/
};

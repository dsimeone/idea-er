// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require_tree .

//////////////////////////////////////////////////////////////
window.onload = initialize;

//////////////////////////////////////////////////////////////
var geosmap;
var map;


/////////////////////////////////////////////////////////////////////
function initialize() {

// setup drawingManager();//////////////////////////////////
    drawingManager.setMap(map);
/////////////////////////////////////////////////////////////
//    
       displayGeoPanel();
       
       
} // end initialize

//////////////////////////////////////////////////////////////////////
function displayGeoPanel() {
  var address="'indexmarkers'";
  geoForm.id = "geopanel";
  geoForm.setAttribute("action","");
  geoForm.onsubmit = function() {  
  	                    document.getElementById("sidebar").removeChild(geoForm);
  	                    return false;};
  geoForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="map">Map: </label>' +  geosmap.name +   
    '<input type="button" id="savemap" value="Save Map" style="width:90%;" onclick="saveMap()"/>' +
    '<br>' +
    '<label for="latitude">Lat </label>' +
    '<input type="text" id="geolat" name="geo[lat]" maxlength="10"' + 
     'value="'+ centerLatitude.toFixed(4) + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' +
    '<input type="text" id="geolng" name="geo[lng]" maxlength="10" ' + 
     'value="'+ centerLongitude.toFixed(4) + '"/>' +
    '<br>' +
    '<input type="button" id="geo1" value="Find Address from Lat/Long" style="width:90%;" onclick="displayReverseGeocode()"/>' +
    '<br>' +
    '<input type="text" id="geocodetxt" name="geo[geocodetxt]" style="width:90%;" ' + 
    '<br>' +
    '<input type="button" id="geocode" value="Geocode an Address" style="width:90%;" onclick="displayGeocode()"/>' +
    '<input type="button" id="myposition" value="My Position" style="width:30%;" onclick="displayMyPosition()"/>' +
    '<input type="button" id="newtrackbuttonid" value="New Track" style="width:30%;" onclick="newTrackOnOff()"/>' +
    '<input type="button" id="althookbuttonid" value="Alt Hook" style="width:30%;" onclick="altHookOnOff()"/>' +
    '<input type="button" id="panoramiobuttonid" value="Panoramio" style="width:30%;" onclick="showPanoramio()"/>' +
    '<input type="button" id="weatherbuttonid" value="Weather" style="width:30%;" onclick="showWeather()"/>' +
    '<input type="button" id="markerlistbuttonid" value="Marker List" style="width:30%;" onclick="document.location.href='+address+';"/>' +
    '<label for="tag">Tag </label>' +
    '<input type="text" id="tag" name="geo[tag]" style="width:60%;" />' + 
     '<input type="button" id="filter-button" value="Apply Panoramio filter" style="width:90%;" onclick=""/>' +
     '<input type="button" id="frombuttonid" value="From" style="width:30%;" onclick="fromOnOff()"/>' +
    '<input type="button" id="tobuttonid" value="To" style="width:30%;" onclick="toOnOff()"/>' +
    '<input type="button" id="directionbuttonid" value="Direction" style="width:30%;" onclick="calculateDirection()"/>' +
    '</fieldset>';

    document.getElementById("sidebar").appendChild(geoForm);
 }
/////////////////////////////////////////////////////////////
function loadCurrentMap() {

  $.ajax({
  	async: false,
  	type: "GET",
	url: "currentmap",
	dataType: "json",
    success: function(data, status){
    	geosmap = data;
    	myOptions = {
           zoom: geosmap.zoom,
           scaleControl: true,
           disableDoubleClickZoom: false,
           center: new google.maps.LatLng(geosmap.centerlat,geosmap.centerlng),
           mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
                        myOptions); 


        switch (geosmap.maptype) {
          case 'ROADMAP':
                  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          break;
          case 'HYBRID':
                  map.setMapTypeId(google.maps.MapTypeId.HYBRID);
          break;
          case 'TERRAIN':
                  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
          break;
          case 'SATELLITE':
                  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
          case 'roadmap':
                  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          break;
          case 'hybrid':
                  map.setMapTypeId(google.maps.MapTypeId.HYBRID);
          break;
          case 'terrain':
                  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
          break;
          case 'satellite':
                  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;        };        
    }        
  }); //end of .ajax request

}

//////////////////////////////////////////////////////////////
window.onload = initialize;

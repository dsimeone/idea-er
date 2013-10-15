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

// loadCurrentMap();


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

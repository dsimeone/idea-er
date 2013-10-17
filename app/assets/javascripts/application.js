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
var centerLatitude = 33.0;
var centerLongitude = 36.0;
var initlatlng; 

var geosmap;
var map;
var drawingManager;

var altHookFlag = false;
var hookedOverlay = null;
var hookedAltOverlay = null;
var hookedMarker;
var hookedGeosmarker;
var hookMarker; 
var hookImage;
var hookAltImage;
var hookMarkerForm = document.createElement("form");

var trackHookVisibility = false;
var markerHookVisibility = false;
var circleHookVisibility = false;
var rectangleHookVisibility = false;
var polylineHookVisibility = false;
var polygonHookVisibility = false;
var trackAltHookVisibility = false;
var markerAltHookVisibility = false;
var circleAltHookVisibility = false;
var rectangleAltHookVisibility = false;
var polylineAltHookVisibility = false;
var polygonAltHookVisibility = false;

var nGeosmarkers;
var geosmarkerArray=new Array();
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
   
          google.maps.event.addListener(map,'mousemove',function(event){
                displayLatLong(event.latLng);}); 
           initDrawingManager(); 
           initHook();
           listMarkers();
       
    }        
  }); //end of .ajax request

}
//////////////////////////////////////////////////////////
// mouse mouvement on the map 
//////////////////////////////////////////////////////////
function displayLatLong(location) {
   var displayLat;
   var deisplayLng;

  //retrieve lat and long of the click point
  displayLat = location.lat().toFixed(4);
  displayLong = location.lng().toFixed(4);
  document.getElementById("geolat").setAttribute("value",displayLat);
  document.getElementById("geolng").setAttribute("value",displayLong);  
}
///////////////////////////////////
// initialize drawing manager
///////////////////////////////////
function initDrawingManager () {

drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.CIRCLE,
                                           google.maps.drawing.OverlayType.RECTANGLE,
                                           google.maps.drawing.OverlayType.POLYLINE,
                                           google.maps.drawing.OverlayType.POLYGON]
      },
      circleOptions: {
        fillColor: '#000000',
        fillOpacity: 0.05,
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      },
      rectangleOptions: {
        fillColor: '#000000',
        fillOpacity: 0.05,
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      },
      polylineOptions: {
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      },
      polygonOptions: {
        fillColor: '#000000',
        fillOpacity: 0.05,
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      }
    });


    drawingManager.setMap(map);
      
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
       switch(event.type) {
          case google.maps.drawing.OverlayType.CIRCLE :
            var geoscircle;
  	        displayCircleHook(event.overlay,null);
  	        var formValues=$("form#hookcirclepanel").serialize();
            $.ajax({
    	      async: false,
    	      type: "POST",
	          url: "createcircle",
	          data: formValues,
              dataType: "json",
              success: function(data, status){
              	geoscircle = data.geoscircle;
              	displayCircleHook(event.overlay,geoscircle); 
  	          	setEventsOnCircle(event.overlay,geoscircle);  	
                	    } // end on success
	         }); // end of the new Ajax.Request() call
            break;
          case google.maps.drawing.OverlayType.MARKER :
            var geosmarker;

  	        displayMarkerHook(event.overlay,"",null);
  	        var formValues=$("form#hookmarkerpanel").serialize();
            $.ajax({
    	      async: false,
    	      type: "POST",
	          url: "createmarker",
	          data: formValues,
              dataType: "json",
              success: function(data, status){ 
              	geosmarker = data.geosmarker;
              	displayMarkerHook(event.overlay,"",geosmarker); 
  	          	setEventsOnMarker(event.overlay,geosmarker);  	
                	    } // end on success
	         }); // end of the new Ajax.Request() call
  	        break;
          case google.maps.drawing.OverlayType.RECTANGLE :
            var geosrectangle;
  	        displayRectangleHook(event.overlay,null);
  	        var formValues=$("form#hookrectanglepanel").serialize();
                $.ajax({
         	      async: false,
        	      type: "POST",
	              url: "createrectangle",
	              data: formValues,
                      dataType: "json",
                      success: function(data, status){
              	                  geosrectangle = data.geosrectangle;
              	                  displayRectangleHook(event.overlay,geosrectangle); 
  	          	          setEventsOnRectangle(event.overlay,geosrectangle);  	
                      } // end on success
	            }); // end of the new Ajax.Request() call
  	        break;
          case google.maps.drawing.OverlayType.POLYLINE :
            var geospolyline;
  	        displayPolylineHook(event.overlay,null);
  	        var formValues=$("form#hookpolylinepanel").serialize();
                $.ajax({
         	      async: false,
        	      type: "POST",
	              url: "createpolyline",
	              data: formValues,
                      dataType: "json",
                      success: function(data, status){
              	                  geospolyline = data.geospolyline;
              	                  displayPolylineHook(event.overlay,geospolyline); 
  	          	          setEventsOnPolyline(event.overlay,geospolyline);  	
                      } // end on success
	            }); // end of the new Ajax.Request() call

  	        break;  	      
          case google.maps.drawing.OverlayType.POLYGON :
            var geospolygon;
  	        displayPolygonHook(event.overlay,null);
  	        var formValues=$("form#hookpolygonpanel").serialize();
                $.ajax({
         	      async: false,
        	      type: "POST",
	              url: "createpolygon",
	              data: formValues,
                      dataType: "json",
                      success: function(data, status){
              	                  geospolygon = data.geospolygon;
              	                  displayPolygonHook(event.overlay,geospolygon); 
  	          	          setEventsOnPolygon(event.overlay,geospolygon);  	
                      } // end on success
	            }); // end of the new Ajax.Request() call
  	        break;  	      
  	      default:
       } //switch
    });
      
}
////////////////////////////
function initHook() {
    initlatlng = new google.maps.LatLng(centerLatitude,centerLongitude);
    hookImage = new google.maps.MarkerImage("/assets/hook.png",new google.maps.Size(90,90),new google.maps.Point(0,0),new google.maps.Point(45,45));
    hookAltImage = new google.maps.MarkerImage("/assets/hookalt.png",new google.maps.Size(90,90),new google.maps.Point(0,0),new google.maps.Point(45,45));

	hookMarker = new google.maps.Marker({
                        position: initlatlng,
                        map: map,
                        icon: hookImage});
}
////////////////////////////
window.onload = initialize;

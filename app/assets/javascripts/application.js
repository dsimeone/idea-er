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
/////////////////////////////////////////////////////
////////////////////////////////////////////////////
//           MARKER MOD
/////////////////////////////////////////////
//click on marker 
/////////////////////////////////////////////
function displayMarkerHook(marker,address,geosmarker)
{

	if (altHookFlag== false) {
		displayMarkerNormalHook(marker,address,geosmarker);
	}
	else{
		displayMarkerAltHook(marker, address,geosmarker);
	}
}
////////////////////////////////////////////////////////////////////////////
function displayMarkerNormalHook(marker, address,geosmarker)
{
//   directionsDisplay.setPanel(document.getElementById(null));
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   } 	
   if (hookedAltOverlay != null) {	
   	hookedAltOverlay.setOptions({strokeColor: '#F0F000'});
   	hookedAltOverlay.setMap(map);
   }
   hookedOverlay = null; 	
   hookedMarker = marker;
   hookedGeosmarker = geosmarker;
   var geosmarkername;
   var geosmarkeraddress;
   if (geosmarker == null) {
   	geosmarkername="";
   	geosmarkeraddress="";
   	imagehtml="";
   	uploadref="";
   	
   }
   else {
   	geosmarkername=geosmarker.name;
   	geosmarkeraddress=geosmarker.address;

   }
   hookMarker.setPosition(marker.getPosition());
   hookMarker.setMap(map);
  //Hook HTML DOM form element
  hookMarkerForm.id = "hookmarkerpanel";
  hookMarkerForm.setAttribute("action","");
 hookMarkerForm.onsubmit = function() {
  	                    deleteMarker(geosmarker,marker); 
  	                    hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookMarkerForm);
  	                    marker.setMap(null);
  	                    markerHookVisibility = false;
  	                    return false;};
  hookMarkerForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="namemarkertxt">Name   </label>'  +
    '<input type="text" id="namemarkertxt" name="geosmarker[name]" value="' + geosmarkername + '"/>' +
    '<br>' +

    '<label for="latitude">Lat: </label>' + marker.getPosition().lat().toFixed(4) +
    '<input type="hidden" id="markerlatid" name="geosmarker[lat]" value="' +
     marker.getPosition().lat().toFixed(4) + '"/>' +
    '<label for="longitude">Lng: </label>' + marker.getPosition().lng().toFixed(4) +
    '<input type="hidden" id="markerlngid" name="geosmarker[lng]" value="' +
     marker.getPosition().lng().toFixed(4) + '"/>' +
    '<br>' +
    
    '<label for="addresstxt">Address </label>' +   
    '<input type="text" id="addresstxt" name="geosmarker[address]" ' +
    'value="'+  geosmarkeraddress + '"/>'+   
    '<input type="submit" class="button black" id="cancelMarker" value="Delete Marker" />' +
    '<input type="button" class="button black" id="centerMarker" value="Center Marker" onclick="centerMapOnMarkerHook();" />' +
    '<input type="button" class="button black" id="addressMarker" value="Find Address" onclick="displayReverseGeocodeOnHook();" />' +
    '<input type="button" class="button black" id="saveMarker" value="Update Marker" onclick="saveMarkerOnDB();" />' +
   '</fieldset>';

    if (trackHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookForm);
    	trackHookVisibility = false;
    }
    if (circleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookCircleForm);
    	circleHookVisibility = false;
    }
    if (rectangleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookRectangleForm);
    	rectangleHookVisibility = false;
    }    
    if (polylineHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolylineForm);
    	polylineHookVisibility = false;
    }
    if (polygonHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolygonForm);
    	polygonHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookMarkerForm);
    markerHookVisibility = true;
}

///////////////////////////////////////////////////////////////////////
function displayMarkerAltHook(marker,address,geosmarker)
{
   directionsDisplay.setPanel(document.getElementById(null));
   if (hookedAltOverlay != null) {	
   	hookedAltOverlay.setOptions({strokeColor: '#000000'});
   	hookedAltOverlay.setMap(map);
   } 	
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#0000FF'});
   	hookedOverlay.setMap(map);
   } 	
   hookedAltOverlay = null; 	
   hookedAltMarker = marker;
   hookedAltGeosmarker = geosmarker;
   var geosmarkername;
   var geosmarkeraddress;
   if (geosmarker == null) {
   	geosmarkername="";
   	geosmarkeraddress="";
   }
   else {
   	geosmarkername=geosmarker.name;
   	geosmarkeraddress=geosmarker.address;
   }
   hookAltMarker.setPosition(marker.getPosition());
   hookAltMarker.setMap(map);
  //Hook HTML DOM form element
  hookAltMarkerForm.id = "hookaltmarkerpanel";
  hookAltMarkerForm.setAttribute("action","");
  hookAltMarkerForm.onsubmit = function() {
  	                    deleteMarker(geosmarker,marker); 
  	                    hookAltMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookAltMarkerForm);
  	                    marker.setMap(null);
  	                    markerAltHookVisibility = false;
  	                    return false;};
  hookAltMarkerForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="name">Name </label>'  +
    '<input type="text" id="namemarkertxt" name="geosmarker[name]" value="' + geosmarkername + '"/>' +
    '<br>' +

    '<label for="latitude">Lat </label>' + marker.getPosition().lat().toFixed(4) +
    '<input type="hidden" id="markerlatid" name="geosmarker[lat]" value="' +
     marker.getPosition().lat().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' + marker.getPosition().lng().toFixed(4) +
    '<input type="hidden" id="markerlngid" name="geosmarker[lng]" value="' +
     marker.getPosition().lng().toFixed(4) + '"/>' +
    '<br>' +
    
    '<label for="address">Address </label>' +   
    '<input type="text" id="addresstxt" name="geosmarker[address]" ' +
    'value="'+  geosmarkeraddress + '"/>'+   
    '<br>' +
    '<input type="button" id="centerMarker" value="Center" onclick="centerMapOnMarkerAltHook();" />' +
    '<input type="button" id="addressMarker" value="Find Address" onclick="displayReverseGeocodeOnAltHook();" />' +
    '<input type="button" id="saveMarker" value="Update Marker" onclick="saveALtMarkerOnDB();" />' +
    '</fieldset>';

    if (trackAltHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookAltForm);
    	trackAltHookVisibility = false;
    }
    if (circleAltHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookAltCircleForm);
    	circleAltHookVisibility = false;
    }
    if (rectangleAltHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookAltRectangleForm);
    	rectangleAltHookVisibility = false;
    }    
    if (polylineAltHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookAltPolylineForm);
    	polylineAltHookVisibility = false;
    }
    if (polygonAltHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookAltPolygonForm);
    	polygonAltHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookAltMarkerForm);
    markerAltHookVisibility = true;
}
////////////////////////////////////////////////////////////////
function centerMapOnMarkerHook() {
	map.setCenter(hookedMarker.getPosition());
}
//////////////////////////////////////////////////////////////////
function centerMapOnMarkerAltHook() {
	map.setCenter(hookedAltMarker.getPosition());
}
///////////////////////////////////////////////////////////////////////////////
function saveMarkerOnDB(){
    var formValues=$("form#hookmarkerpanel").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "updatemapmarker/"+hookedGeosmarker.id,
       data: formValues,
 //      contentType: false,
 //      processDara: false,
 //      cache: false,
        dataType: "json",
        success: function(data, status){
        	 hookedGeosmarker=data.content;
        	 google.maps.event.clearListeners(hookedMarker,'click');
        	 setEventsOnMarker(hookedMarker,hookedGeosmarker);          	    	
	    } // end on success
	}); // end of the new Ajax.Request() call
}
//////////////////////////////////////////////////////////////////////
function saveAltMarkerOnDB(){
    var formValues=$("form#hookaltmarkerpanel").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "updatemapmarker/"+hookedAltGeosmarker.id,
	    data: formValues,
        dataType: "json",
        success: function(data, status){
        	 hookedAltGeosmarker=data.content.geosmarker;
        	 google.maps.event.clearListeners(hookedAltGeosmarker,'click');
        	 setEventsOnMarker(hookedAltMarker,hookedAltGeosmarker);          	    	
	    } // end on success
	}); // end of the new Ajax.Request() call
//	updateListTracks();	
}

////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
function deleteMarker(geosmarker,marker) {
    $.ajax({
    	async: false,
    	type: "PUT",
    	url: "destroymarker/"+geosmarker.id,
    	success: function(data,status){

    	}
    })
}
/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
function setEventsOnMarker(marker,geosmarker) {
	
  google.maps.event.addListener(marker,'click',function(){
                 displayMarkerHook(marker,"",geosmarker);
                  });
}
///////////////////////////////////////////////////////////////////////////////
function listMarkers() {
  $.ajax({
  	async: false,
  	type: "GET",
	url: "listmarkers",
	dataType: "json",
    success: function(data, status){
        var geosmarker;
		var marker;
		geosmarkers = data;
		nGeosmarkers = geosmarkers.length;
        for (var i = 0 ; i < geosmarkers.length ; i++) {
          geosmarker = geosmarkers[i];  
          marker=createGeosmarker(geosmarker);

        }; // end of for loop
	} // end of function
  }); //end of .ajax request

}
///////////////////////////////////////////////////////////////////////////

function createGeosmarker(geosmarkerpar) {
//    buildImage(marker);// set image with the correct symbol

    var lat=geosmarkerpar.lat;
    var lng=geosmarkerpar.lng;
    var latlng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        title:geosmarkerpar.name,
                        draggable: true});
//                        icon: image});
    geosmarkerArray.push(marker);
    setEventsOnMarker(marker,geosmarkerpar);

//    image = '';

    return marker;  
}
//////////////////////////////////////////////////////////////


////////////////////////////
window.onload = initialize;

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
var geoForm = document.createElement("form");
var geocoder;
var newIncidentFlag = false;
var infoCreateWindow;
var altHookFlag = false;
var hookedOverlay = null;
var hookedAltOverlay = null;
var hookedMarker;
var hookedGeosmarker;
var hookMarker; 
var hookImage;
var hookAltImage;
var hookMarkerForm = document.createElement("form");
var incidentInfoBoxCreate;

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
           geocoder = new google.maps.Geocoder();
            infoCreateWindow = new google.maps.InfoWindow({
                                                                  disableAutoPan: false
                                                           });
           initHook();
           listMarkers();
           incidentInfoBoxCreate = new InfoBox();

//           displayGeoPanel();
       
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
  document.getElementById("geolatid").setAttribute("value",displayLat);
  document.getElementById("geolngid").setAttribute("value",displayLong);  
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
    hookImage = new google.maps.MarkerImage("/assets/hookred.png",new google.maps.Size(90,90),new google.maps.Point(0,0),new google.maps.Point(45,45));
    hookAltImage = new google.maps.MarkerImage("/assets/hookalt.png",new google.maps.Size(90,90),new google.maps.Point(0,0),new google.maps.Point(45,45));

	hookMarker = new google.maps.Marker({
                        position: initlatlng,
                        map: map,
                        icon: hookImage});
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//
//  GEOPANEL MOD
//
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function displayGeoPanel() {
	  //Hook HTML DOM form element

	  var address="'indexmarkers'";
  geoForm.id = "geopanel";
  geoForm.setAttribute("action","");
  geoForm.onsubmit = function() {  
  	                    document.getElementById("sidebar").removeChild(geoForm);
  	                    return false;};
  geoForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="geolatid">Lat/Lng  </label>' +'<br>'+  
    '<input type="text" id="geolatid" name="geo[lat]" maxlength="10"' + 
     'value="'+ centerLatitude.toFixed(4) + '"/>' +
    '<input type="text" id="geolngid" name="geo[lng]" maxlength="10" ' + 
     'value="'+ centerLongitude.toFixed(4) + '"/>' +
    '<br>' +
    '<input type="button" id="newincidentbuttonid" value="Insert New Incident" class="button red bigrounded;" onclick="newIncidentOnOff()"/>' +
    '<br><br>' +
    '<input type="button" id="althookbuttonid" value="Alt Hook" class="button black medium" onclick="altHookOnOff()"/>' +
    '</fieldset>';
    document.getElementById("sidebar").appendChild(geoForm);
 }
//////////////////////////////////////////////////////////////////////
//
//       INCIDENT MOD
//
//
//////////////////////////////////////////////////////////////////////
function newIncidentOnOff(){
	if (newIncidentFlag == false) {
		newIncidentFlag = true;
		$("#newincidentbuttonid").prop('value','ClickOnMap');
		$("#newincidentbuttonid").prop("class","button white");
	    google.maps.event.addListener(map,'click',function(event){
        createIncidentInfoWindow(event.latLng);});  
		drawingManager.setOptions({
              drawingMode: null
        });
	}
	else {
	    newIncidentFlag = false;
	    google.maps.event.clearListeners(map,'click');
//        document.getElementById("geo1").value = "Places";
		$("#newincidentbuttonid").prop("value","Insert New Incident");
		$("#newincidentbuttonid").prop("class","button red");
		drawingManager.setOptions({
           drawingControlOptions: {
           	        drawingControl: true,
           	        map: map,
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.MARKER,
                                           google.maps.drawing.OverlayType.CIRCLE,
                                           google.maps.drawing.OverlayType.RECTANGLE,
                                           google.maps.drawing.OverlayType.POLYLINE,
                                           google.maps.drawing.OverlayType.POLYGON] 
           }
        });
	};

}
//////////////////////////////////////////////////////////
// on click on the map in empty position
//////////////////////////////////////////////////////////
function createIncidentInfoWindow(location) {
  //retrieve lat and long of the click point
  var lat = location.lat();
  var lng = location.lng();
  //create an HTML DOM form element
  var inputForm = document.createElement("form");
  inputForm.id = "createFormId";
  inputForm.setAttribute("action","");
  inputForm.onsubmit = function() {createIncident(location); return false;};
  var innertemp =  
    '<fieldset >' +
    '<label for="ititle">Title </label>' +
    '<input type="text" id="ititle" name="incident[title]" style="width:100%;"/>'+
    '<br>' +
    '<label for="latitude">Lat/Lng </label>' + lat.toFixed(4) + 
    '<input type="hidden" id="latitude" name="incident[lat]" maxlength="10" value="' +
      lat + '"/>' +" / " +
       lng.toFixed(4) +
    '<input type="hidden" id="longitude" name="incident[long]" maxlength="10" value="' +
      lng + '"/>' +
    '<br>' +
    '<label>Description </label>' +
    '<textarea class="idescription" rows="4"  cols= "25" name="incident[description]" > </textarea>'+
    '<br>' +
    '<label for="itype">Type </label>' +
    '<select class="iselect" name="incident[type]">' +
    '<option value="fire">Fire</option> ' +
    '<option value="flooding">Flooding</option> ' +
    '<option value="roadcrash">Road Crash</option>' +
    '</select>' +
    '<br>' +
    '<label for="istatus">Status  </label>'+
    '<select class="iselect" name="incident[status]">' +
    '<option value="noted">Noted</option> ' +
    '<option value="mobilization">Mobilization</option> ' +
    '<option value="resolving">Resolving</option>' +
    '<option value="postresolution">Post Resolution</option>' +
    '<option value="closed">Closed</option>' +
    '</select>' +
    '<br>' +
    '<input type="submit" class= "button red" value="Create" />' +
    '</fieldset>';
     inputForm.innerHTML = innertemp;

        inputForm.style.cssText = "border: 1px solid black; margin-top: 8px; background: black; padding: 5px; color: white;";
 
      var myOptions = {
                 content: inputForm
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-140,0)
                ,position: new google.maps.LatLng(lat, lng)
                ,zIndex: null
                ,boxStyle: { 
                  background: "url('/assets/tipbox.gif') no-repeat"
                  ,opacity: 0.75
                  ,width: "280px"
                 }
                ,closeBoxMargin: "10px 2px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        };

        incidentInfoBoxCreate.setOptions(myOptions);
        incidentInfoBoxCreate.open(map);
        newIncidentOnOff();
  return;

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
    ' <img src="/assets/map-pin-red.png"  height="34" width="28"> ' +
    '<label for="latitude">Lat/Lng: </label>' + marker.getPosition().lat().toFixed(4) +
    '<input type="hidden" id="markerlatid" name="geosmarker[lat]" value="' +
     marker.getPosition().lat().toFixed(4) + '"/>' +  ' /  ' +
      marker.getPosition().lng().toFixed(4) +
    '<input type="hidden" id="markerlngid" name="geosmarker[lng]" value="' +
     marker.getPosition().lng().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="namemarkertxt">Name   </label>'  +
    '<input type="text" id="namemarkertxt"  name="geosmarker[name]" value="' + geosmarkername + '"/>' +
    '<br>' +


    '<label for="addresstxt">Address </label>' +   
    '<input type="text" id="addresstxt" name="geosmarker[address]" ' +
    'value="'+  geosmarkeraddress + '"/>'+   
    '<input type="button" class="button black" id="addressMarker" value="Find Address" onclick="displayReverseGeocodeOnHook();" />' +
    '<input type="button" class="button black" id="centerMarker" value="Center Marker" onclick="centerMapOnMarkerHook();" />' +
    '<input type="button" class="button black" id="saveMarker" value="Update Marker" onclick="saveMarkerOnDB();" />' +
    '<input type="submit" class="button red" id="cancelMarker" value="Delete Marker" />' +
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
//////////////////////////////////////////////////////////////////////
function displayReverseGeocodeOnHook() {

var latlng = hookedMarker.getPosition();
geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
           if (results[0]) {
           	  hookedGeosmarker.address = results[0].formatted_address;
           	  hookedGeosmarker.name = document.getElementById("hookmarkerpanel").namemarkertxt.value;
              displayMarkerHook(hookedMarker, results[0].formatted_address,hookedGeosmarker)
           } else {
               alert("No results found");
             }
         } else {
             alert("Geocoder failed due to: " + status);
           }
        });
} 
///////////////////////////////////////////////////////////

////////////////////////////
window.onload = initialize;

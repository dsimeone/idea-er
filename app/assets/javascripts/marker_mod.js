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

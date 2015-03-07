var marker;

$.fn.simpleMap = function() {
    return this.each(function() {
        console.log(this);
    });
};

function initialize() {

	var centerPosition = new google.maps.LatLng(defaultLat,defaultLong);
	// var centerPosition = new google.maps.LatLng({{ settings.latitude }},{{ settings.longitude }});
	var myOptions = {
		zoom: defaultZoom,
		center: centerPosition,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		draggable:true
	};

	map = new google.maps.Map(document.getElementById('fields-map_canvas-'+mapContainer), myOptions);

	if(latitude && longitude)
	{
		var location = new google.maps.LatLng(latitude,longitude);
		placeMarker(location);
	}

	google.maps.event.addListener(map, 'click', function(event) {
	   placeMarker(event.latLng);
	});

}

function placeMarker(location) {

	 updateInputs( location.lat().toFixed(6), location.lng().toFixed(6) );

    if (marker) {
        //if marker already was created change positon
        marker.setPosition(location);
        
    } else {
        //create a marker
        marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
        // add drag listener
        google.maps.event.addListener(marker, 'dragend', function(evt){
		    updateInputs( evt.latLng.lat().toFixed(6), evt.latLng.lng().toFixed(6) );
		});
    }
   // map.setCenter(marker.getPosition());
    map.panTo(marker.getPosition());
}

function updateInputs(lat, lng){
	$('#fields-location-latitude').val( lat );
    $('#fields-location-longitude').val( lng );
}

google.maps.event.addDomListener(window, 'load', initialize);

var autocomplete = new google.maps.places.Autocomplete($("#fields-address-search-string")[0]);

google.maps.event.addListener(autocomplete, 'place_changed', function () {

   var place = autocomplete.getPlace();

   if (typeof place.geometry.location != 'undefined') {
   		placeMarker(place.geometry.location);
   }

});
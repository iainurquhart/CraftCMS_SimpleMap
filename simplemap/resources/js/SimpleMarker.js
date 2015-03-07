

$.fn.simpleMap = function() {

	var markers = [];
	var maps = [];

	return this.each(function() {
		google.maps.event.addDomListener(window, 'load', initialize( this.id ));
	});

	function initialize(id) {

		var field = $('#'+id);
		var searchField = field.find('.map-address-search input');
		var defaultLat  = field.data('defaultlat');
		var defaultLong = field.data('defaultlong');
		var defaultZoom = parseInt(field.data('defaultzoom'));
		var latitude    = field.data('latitude');
		var longitude   = field.data('longitude');
		var mapElement  = field.find('.map_canvas_inner');
		var centerPosition = new google.maps.LatLng(defaultLat,defaultLong);

		console.log(defaultZoom);

		var myOptions = {
			zoom: defaultZoom,
			center: centerPosition,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable:true
		};

		maps[id] = new google.maps.Map( mapElement[0], myOptions);

		if(latitude && longitude)
		{
			var location = new google.maps.LatLng(latitude,longitude);
			placeMarker(location, id);
		}

		google.maps.event.addListener(maps[id], 'click', function(event) {
			placeMarker(event.latLng, id);
		});

		google.maps.event.addListener(markers[id],'dragend',function(event){
			placeMarker(event.latLng, id);
		});

		google.maps.event.addListener(maps[id],'zoom_changed',function(event){
			$('#' + id + ' .location-zoom').val( maps[id].getZoom() );
		});

		var autocomplete = new google.maps.places.Autocomplete( searchField[0] );

		google.maps.event.addListener(autocomplete, 'place_changed', function () {

			var place = autocomplete.getPlace();

			if (typeof place.geometry.location != 'undefined') {
				placeMarker(place.geometry.location, id);
			}

		});

		$('#' + id + ' .location-latitude, #' + id + ' .location-longitude').change( function(e) {
			var latitude = $('#' + id + ' .location-latitude').val();
			var longitude = $('#' + id + ' .location-longitude').val();
			var location = new google.maps.LatLng(latitude,longitude);
			placeMarker(location, id);
		});

		// @todo workaround for map not rendering correctly
		// when selecting this fieldtype in the fieldtype settings.
		$('select.fieldtoggle').change( function(e) {
			google.maps.event.trigger(maps[id], 'resize');
			maps[id].panTo(markers[id].getPosition());
		})

		$('#' + id + ' .location-zoom').change( function(e) {
			var zoom = $(this).val();
			if(zoom) maps[id].setZoom( +zoom ); 
		});
		
		
		

	}


	function placeMarker(location, id) {

		updateInputs( location.lat().toFixed(6), location.lng().toFixed(6), id );

		if (markers[id]){
			markers[id].setPosition(location);
		} else{
			markers[id] = new google.maps.Marker({
				position: location,
				map: maps[id],
				draggable: true
			});
			google.maps.event.addListener(markers[id], 'dragend', function(evt){});
		}
		maps[id].panTo(markers[id].getPosition());
	}

	function updateInputs(lat, lng, id){
		$('#' + id + ' .location-latitude').val( lat );
		$('#' + id + ' .location-longitude').val( lng );
		$('#' + id + ' .location-zoom').val( maps[id].getZoom() );
	}

};








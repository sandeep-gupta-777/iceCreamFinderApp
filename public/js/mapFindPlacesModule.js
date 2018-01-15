
const MapFindPlacesModule = (function () {
    /*using let or const above wont work, so using var*/

    let googleMapApi, searchBox,currentPlace,autocomplete,map,autocompleteOptions;

    const $input = document.getElementById('searchT');

    let init = function (googleMapApiArg, mapArg) {
        googleMapApi =  googleMapApiArg;
        map = mapArg;
        autocompleteOptions =  {
            types: ['(cities)'],
        };
        initAutoComplete();
    };
    function findIceCreamPlacesAtUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(centerMap);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function centerMap(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        map.setCenter(new google.maps.LatLng(lat, lng));
        MapMarkModule.addMarkers({lat: lat, lng: lng});
        findIceCreamPlaces(lat,lng);
    }

    let initAutoComplete = function () {

        autocomplete = new google.maps.places.Autocomplete($input,autocompleteOptions);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', function() {
            /*this handler will be triggered when user will click on any autosuggestion in city search box*/
            let place = autocomplete.getPlace();//place is the place which is clicked
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(15);
            }
            //mark the place which has been clicked in autocomplete
            MapMarkModule.addMarkers(place.geometry.location);

            /*find ice creams stores and show */
            findIceCreamPlaces(place.geometry.location.lat(),place.geometry.location.lng());
            console.log('find places not called');
        });
    };

    let findIceCreamPlaces = function(lat,lng) {
        let request = {
            location: new google.maps.LatLng(lat,lng),
            query: 'ice cream'
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, MapMarkModule.createMarkersInit);

    };

    return {
        findIceCreamPlacesAtUserLocation,
        initAutoComplete,
        init
    }
})();


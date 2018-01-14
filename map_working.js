
var MapWorkingModule = (function () {
/*using let or const above wont work, so using var*/

//module variables
    let googleMapApi,searchBox,currentPlace;
    let map,autocomplete,iceCreamStores = [];
    let coords = {lat: -34.397, lng: 150.644};
    let options = {
        center: coords,
        zoom: 8,
        mapTypeControl:false,
        streetViewControl:false
    };

//DOM cache
    const $map   = document.getElementById('map');
    const $input = document.getElementById('searchT');
    const $inputWrapper = document.getElementById('searchT-wrapper');



//bind events
    let bindMapEvents = function () {
       googleMapApi.event.addListener(map, 'click',getClickedCoord);
        // searchBox.addListener('places_changed',placesChanged);
    };
    let initMap =  function() {
        console.log('init');
        googleMapApi = google.maps;
        map = new googleMapApi.Map($map, options);
        getLocation();//get current user location
        addMarkers();
        initAutocomplete();
        bindMapEvents();
        initMap1();
    };
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        map.setCenter(new google.maps.LatLng(lat, lng));
        addMarkers({lat: lat, lng: lng});
    }
    let addMarkers = function (coords) {
        let icon = {
            // url: "./images/ice-cream-map@1x.png", // url
            scaledSize: new googleMapApi.Size(40, 49), // scaled size
            origin: new googleMapApi.Point(0,0), // origin
            anchor: new googleMapApi.Point(0, 0) // anchor
        };
        let marker = new googleMapApi.Marker({
            position:coords,
            map:map,
            animation: googleMapApi.Animation.DROP,
            icon:icon
        });
    };
    let getClickedCoord = function ($event) {
      console.log($event);
    };
    let initAutocomplete = function () {
        // searchBox = new googleMapApi.places.SearchBox($input);
        // initMap1();
        autocomplete.bindTo('bounds', map);
        let marker = new google.maps.Marker({
            map: map
        });
        marker.addListener('click', function() {
            // infowindow.open(map, marker);
        });

        autocomplete.addListener('place_changed', function() {
            // /*this will be triggered when */
            //
            // /*1. center the map to the changed place
            // * 2. center show ice creams around this place*/
            let place = autocomplete.getPlace();//place is the place which is clicked
            if (!place.geometry) {
                return;
            }
            currentPlace = place;
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(15);
            }
            // Set the position of the marker using the place ID and location.
            marker.setPlace({
                placeId: place.place_id,
                location: place.geometry.location
            });
            marker.setVisible(true);

        /*find ice creams stores and show */
        findIceCreamPlaces();
        });
    };

    let findIceCreamPlaces = function() {

        // let pyrmont = new google.maps.LatLng(28.644800,77.216721);

        // map = new google.maps.Map(document.getElementById('map'), {
        //     center: currentPlace,
        //     zoom: 15
        // });

        let request = {
            // location: currentPlace,
            location: new google.maps.LatLng(currentPlace.geometry.location.lat(),currentPlace.geometry.location.lng()),
            query: 'ice cream'
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, createMarkersInit);

    };

    let createMarkersInit = function(results, status, pagination) {

        iceCreamStores.push(results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            /*     for (var i = 0; i < results.length; i++) {
             var place = results[i];
             createMarker(results[i]);
             } */
            // createMarkers(results);
        }
        if (pagination.hasNextPage) {

            setTimeout(function () {
                pagination.nextPage();
                console.log(pagination.hasNextPage);
            },0);
        }
        else {
            createMarkers(iceCreamStores);
        }
    };
    let createMarkers = function (places) {
        let bounds = new google.maps.LatLngBounds();
        // let placesList = document.getElementById('places');

        for (let i = 0, place; place = places[i]; i++) {
            let image = {
                url: "./images/ice-cream-map@1x.png",
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(40, 49)
            };

            let marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            bounds.extend(place.geometry.location);
            map.fitBounds(bounds);
        }
    };

    let initMap1  = function() {
        /*https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder*/

    };

    let placesChanged = function () {
        // let places = searchBox.getPlaces();
        let autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        console.log(places);


        // markers = [];
        // // For each place, get the icon, name and location.
        // let bounds = new google.maps.LatLngBounds();
        // places.forEach(function(place) {
        //     if (!place.geometry) {
        //         console.log("Returned place contains no geometry");
        //         return;
        //     }
        //     let icon = {
        //         url: place.icon,
        //         size: new google.maps.Size(71, 71),
        //         origin: new google.maps.Point(0, 0),
        //         anchor: new google.maps.Point(17, 34),
        //         scaledSize: new google.maps.Size(25, 25)
        //     };
        //
        //     // Create a marker for each place.
        //     markers.push(new google.maps.Marker({
        //         map: map,
        //         icon: icon,
        //         title: place.name,
        //         position: place.geometry.location
        //     }));
        //
        //     if (place.geometry.viewport) {
        //         // Only geocodes have viewport.
        //         bounds.union(place.geometry.viewport);
        //     } else {
        //         bounds.extend(place.geometry.location);
        //     }
        // });
        // map.fitBounds(bounds);




    };
//render in view

//module exports
    return {
        initMap,
    }
})();


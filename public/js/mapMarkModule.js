/*This module will recieve places from mapFindPlaces Module and will mark those places*/
const MapMarkModule = (function () {

    let map, googleMapApi, iceCreamStores=[],markersArray =[];

    let init = function (googleMapApiArg,mapArg) {
        googleMapApi =  googleMapApiArg;
        map = mapArg;
        iceCreamStores = [];
        markerImagePath = "images/ice-cream-map@1x.png";
    };

    let createMarkersInit = function(results, status, pagination) {
        DomModule.startSpinner();

        if(results) iceCreamStores = [...iceCreamStores,...results];

        if (pagination.hasNextPage) {
            pagination.nextPage();
            console.log(pagination.hasNextPage);
        }
        else {createMarkers(iceCreamStores);}
    };

    let createMarkers = function (places) {

        //first, clear all previous markers from the map
        clearAllMarkers();
        iceCreamStores=[];//empty it for fresh search
        let bounds = new google.maps.LatLngBounds();

        for (let i = 0, place; place = places[i]; i++) {

            let tempCoord = place.geometry.location;

            addMarkers(tempCoord,markerImagePath);
            bounds.extend(place.geometry.location);
            map.fitBounds(bounds);
            DomModule.stopSpinner();
        }
    };

    let addMarkers = function (coords,imageURL) {
        let icon = {
            url: imageURL, // url
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
        markersArray.push(marker);
    };

    function clearOverlays() {
        for (let i = 0; i < markersArray.length; i++ ) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }

    let clearAllMarkers = function () {
        clearOverlays();
    };

//module exports
    return {
        createMarkersInit,
        addMarkers,
        init
    }
})();


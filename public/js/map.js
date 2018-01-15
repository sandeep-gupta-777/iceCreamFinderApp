
var MapModule = (function () {
/*using let or const above wont work, so using var*/

    let googleMapApi,searchBox,currentPlace;
    let map,autocomplete,iceCreamStores = [];

    const $map   = document.getElementById('map');

    let initMap =  function() {
        console.log('Initializing the whole app');
        let options = {
            zoom: 15,
            mapTypeControl:false,
            streetViewControl:false
        };
        googleMapApi = google.maps;
        map = new googleMapApi.Map($map, options);

        /*initialize other modules*/
        MapMarkModule.init(googleMapApi,map);
        MapFindPlacesModule.init(googleMapApi,map);

        MapFindPlacesModule.findIceCreamPlacesAtUserLocation();//get current user location and add markers
    };

    return {
        initMap
    }
})();


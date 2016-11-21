var MapUtil = {
    initJson: {},
    map:{},
    infowindow:{},
    initMap: function(){
        var initCenter = {
            lat: 24.760587,
            lng: 121.205056
        };
        // 地圖初始設定
        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            center: initCenter,
            zoom: 16
        };

        var mapElement = document.getElementById("world-map");
        // Google 地圖初始化
        MapUtil.map = new google.maps.Map(mapElement, mapOptions);
        infowindow = new google.maps.InfoWindow();

        var listener = google.maps.event.addListener(MapUtil.map, "idle", function() {
            if (MapUtil.map.getZoom() > 12) MapUtil.map.setZoom(15);
            google.maps.event.removeListener(listener);
        });

        MapUtil.drawMapByGeojson(MapUtil.initJson);
    },
    drawMapByGeojson: function(json){

        var features = json.features;
        var type = json.features[0].geometry.type;
        var polygonCoordis;
        bounds = new google.maps.LatLngBounds();

        if (type == 'Point') { //很多點

            $.each(features, function(i) {

                polygonCoordis = features[i].geometry.coordinates;

                if (features[i].properties.circle) {

                    var cityCircle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: MapUtil.map,
                        center: new google.maps.LatLng(polygonCoordis[1], polygonCoordis[0]),
                        radius: features[i].properties.circle * 500
                    });
                }

                bounds.extend(new google.maps.LatLng(features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]));
            });
        } else if (type == 'Polygon') { //折線

            var features = json.features;

            $.each(features, function(index){
                polygonCoordis = json.features[index].geometry.coordinates[0];

                var bound = new google.maps.LatLngBounds();

                for (var i = 0; i < polygonCoordis.length; i++) {
                    bound.extend(new google.maps.LatLng(polygonCoordis[i][1], polygonCoordis[i][0]));
                }

                /**有密集恐懼症 先拿掉marker**/
                   var marker = new google.maps.Marker({
                       position: bound.getCenter(),
                       map: MapUtil.map
                   });

                var infowindow = new google.maps.InfoWindow({
                    content: "<span style='color: #0c0c0c'>我的農場</span>"
                });

                marker.addListener('click', function() {
                    infowindow.open(MapUtil.map, marker);
                });

                bounds.extend(bound.getCenter());
            });


            MapUtil.map.fitBounds(bounds);
            var listener = google.maps.event.addListener(MapUtil.map, "idle", function() {
                //if (MapUtil.map.getZoom() > 12) MapUtil.map.setZoom(15);
                MapUtil.map.setZoom(18);
                google.maps.event.removeListener(listener);
            });
            MapUtil.map.setCenter(bounds.getCenter());
        }

        var features = MapUtil.map.data.addGeoJson(json);
    }
}

$(function() {

    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyChfI1-oqMofLkx25FHvywmpKUpSgRs9hk&sensor=false&callback=MapUtil.initMap";
    document.body.appendChild(script);

    //MapUtil.initMenu();

    $('a[href="#tab_2"]').click(function(e) {
        setTimeout(initialise, 500);
    });

    function initialise() {
        google.maps.event.trigger(MapUtil.map, 'resize');
        MapUtil.drawMapByGeojson(MapUtil.initJson);
    };


});
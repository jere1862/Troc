var marker;

function initMap() {

var map, infoWindow;
var mtl = new google.maps.LatLng(45.5017, -73.5673);

map = new google.maps.Map(document.getElementById('map'), {
  center: mtl,
  zoom: 12
});
infoWindow = new google.maps.InfoWindow;



/*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Current Location');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        */

marker = new google.maps.Marker({
  position: mtl,
  title:"Aaron Liang",
  animation: google.maps.Animation.DROP,
  visible:true
});

marker.setMap(map);
marker.addListener('click', toggleBounce);

//ON-CLICK INFOWINDOW
var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Aaron Liang</h1>'+
            '<div id="bodyContent">'+
            '<p>Items to trade: <br>' +
            '<ul>'+
            '<li><b>Drill</b></li>'+
            '<li><b>Book</b></li>'+
            '</ul>'+
            '<b>Email:</b> aaronliang96@gmail.com<br>'+
            '<b>Phone:</b> +1(514)-573-9773'+
            '</div>'+
            '</div>';
var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}

//MARKER BOUNCE ANIMATION 
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}



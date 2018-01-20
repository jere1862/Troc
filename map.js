var map;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 45.5017, lng: -73.5673},
  zoom: 8
});
}

var marker = new google.maps.Marker({
  position: {lat: 40.741895, lng: -73.989308},
  map: map
});
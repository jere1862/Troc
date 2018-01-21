var marker;

function initMap() {

var map, infoWindow;
var key = "AIzaSyAp89M4-auUW8dWIoYAKDNjrA0dlKXUc_k";
var mtl = new google.maps.LatLng(45.5017, -73.5673);

map = new google.maps.Map(document.getElementById('map'), {
  center: mtl,
  zoom: 12
});
infoWindow = new google.maps.InfoWindow;

var user;

$.get('/map', function(data){
 user = data.forEach(user =>{
    getLatLongFromAddress("410 Avenue Édouard-Charles, Outremont, QC H2V 2N4, Canada", function(location){
      var location = new google.maps.LatLng(location.lat, location.long);
      var contentString = 
      `<div class="content">
      <div class="siteNotice">
      <h1 id="firstHeading" class="firstHeading">${user.name}</h1>
      <div class="bodyContent">
      <p>Items to trade: <br>
      ${convertListToHtml([])}
      <b>Email:</b> ${user.email}<br>
      <b>Phone:</b> ${user.phone}
      </div>
      <button type="button" class="btn btn-success" onclick="makeOffer()";"style="text-align:center; margin: 3px">Offer</button>
      </div>
      `;
      
      function convertListToHtml(list){
        return list.map(toList).slice(0,4).join('');
      }
      
      function toList(item){
        return `<li>${item}</li>`;
      }
      
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    
    
    marker = new google.maps.Marker({
      position: location,
      title: "test",
      animation: google.maps.Animation.DROP,
      visible:true
    });
    
    marker.setMap(map);
    marker.addListener('click', toggleBounce);
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
    }) //end foreach

});

window.makeOffer = function(){
  BootstrapDialog.alert("a");
  console.log(context);
}

function getLatLongFromAddress(address, callback){
  $.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`, function(response){
    var lat=response.results[0].geometry.location.lat;
    var long=response.results[0].geometry.location.lng;
    callback({lat:lat, long:long})
  });
}

if (navigator.geolocation) {
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

/*marker = new google.maps.Marker({
  position: mtl,
  title: "test",
  animation: google.maps.Animation.DROP,
  visible:true
});

marker.setMap(map);
marker.addListener('click', toggleBounce);
*/
//ON-CLICK INFOWINDOW
/*var contentString =` <div id="content">
            <div id="siteNotice">
            </div>
            <h1 id="firstHeading" class="firstHeading">${user.name}</h1>
            <div id="bodyContent">
            <p>Items to trade: <br> 
            <ul>
            <li><b>Drill</b></li>
            <li><b>Book</b></li>
            </ul>
            <b>Email:</b>${user.email}<br>
            <b>Phone:</b>${user.phone}
            </div>
            </div>`;*/
/*var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
marker.addListener('click', function() {
          infowindow.open(map, marker);
        });*/

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



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

$.get('/matches', function(res){
  res.matches.forEach(match => {
      getLatLongFromAddress(match.toUserAddress, function(location){
        var location = new google.maps.LatLng(location.lat, location.long);
        var contentString =
        `<div class="content">
        <div class="siteNotice">
        <h1 id="firstHeading" class="firstHeading">${match.toUserName}</h1>
        <div class="bodyContent">
        <h4>Offers:</h4>
        ${convertListToHtml(match.fromOfferedItemsMatches)}
        <h4>Wants:</h4>
        ${convertListToHtml(match.fromWantedItemsMatches)}
        <b>Email:</b> ${match.toUserEmail} <br>
        <b>Phone:</b> ${match.toUserPhone}
        </div>
        <button type="button" class="btn btn-success" onclick="makeOffer('` + encodeURI(JSON.stringify(match)) + `')"style="text-align:center; margin: 3px">Offer</button>
        </div>
        `;

          {/*<button type="button" class="btn btn-success" onclick="makeOffer(\"`+JSON.stringify(match)+`\")";"style="text-align:center; margin: 3px">Offer</button>*/}
        function convertListToHtml(list){
          list = list.map(item => item.from_item_name);
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

window.makeOffer = function(matchJsonStr){
  match = JSON.parse(decodeURI(matchJsonStr));
  offeredItemList = convertListToHtml(match.fromOfferedItemsMatches, "offered");
  wantedItemList = convertListToHtml(match.fromWantedItemsMatches, "wanted");
    BootstrapDialog.show({
        message: function(dialogRef){
            var $form = $('<form></form>');
            var $titleDrop = $(` 
            <div class="form-group container">
                <div class="row">
                    <div class="col-xs-3">
                        <h3>Offered items</h3>
                        ${offeredItemList}
                    </div>
                    <div class="col-xs-3">
                        <h3>Wanted items</h3>
                        ${wantedItemList}
                    </div>
                </div>
                
            </div>
            `);
            dialogRef.setData('fieldTitleDrop', $form);
            $form.append($titleDrop);
            return $form;
        }        ,
        buttons: [
            {
                label: 'Confirm',
                action: function(dialogRef){
                    var unindexed_array = dialogRef.getData('fieldTitleDrop').serializeArray();
                    console.log(unindexed_array);
                    $('input[name=offered]:checked');
                    $('input[name=wanted]:checked');
                    from_user_id = 1;
                    to_user_id = 2;
                    from_user_offered_item_id = 2;
                    from_user_wanted_item_id = 2;
                    to_user_offered_item_id = 2;
                    to_user_wanted_item_id = 2;

                    dialogRef.close();
                }
            },
            {
                label: 'Cancel',
                action: function(dialogRef) {
                    dialogRef.close();
                }
            }]
    });

};

function convertListToHtml(list, name){
    truc = "";
    for (var i = 0; i < list.length; i++) {
        truc += `<p><input type="radio" name="${name}" fromId="${list[i].from_item_id}" toId="${list[i].to_item_id}">${list[i].from_item_name}</input></p>`;
    }
    return truc;
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



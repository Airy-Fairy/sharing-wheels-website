var content =
            "<h3>In development!</h3>" +
            "<p>Right here we're trying to make google maps support come true!</p>";
var title = "Development point";

function initMap() {
    var pos = { lat: 59.857597, lng: 30.212425};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: pos
    });

    var infowindow = new google.maps.InfoWindow({
        content: content
    });

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: title
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

var inited = false;
var map_btn_text = {
    'open': $('#open-map').text(),
    'hide': 'Hide the map'
};

$('#open-map').on('click', function() {
    $map = $('#map');
    if ($map.css('display') == 'none') {
        $map.fadeIn('fast', function() {
            if (!inited) {
                initMap();
                inited = true;
            }
        });
        this.text = map_btn_text.hide;
    } else {
        $map.fadeOut('fast');
        this.text = map_btn_text.open;
    }
});

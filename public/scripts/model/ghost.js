/* global google */
'use strict';

var app = app || {};

(function(module){
  function GhostSighting(data){
    this.index=data.row_index;
    this.type='spirit';
    this.name=data.location;
    this.lng=data.longitude;
    this.lat=data.latitude;
    this.description=data.description;
    this.iconImage='../icons/ghostpin.png';
  }

  GhostSighting.prototype.addMarker = function(map) {
    var props = this;
    var marker = new google.maps.Marker({
      position:{lng: props.lng, lat: props.lat},
      map:map,
      //icon:props.iconImage
    });
    //check for custom icon
    if (props.iconImage){
      //set icon image
      marker.setIcon(props.iconImage);
    }

    //check for content
    if(props.name){
      console.log(props.name);
      var infoWindow = new google.maps.InfoWindow({
        content:'<h1>'+props.name+'</h1>' +
        '<button id = detailButton>Details</button>'
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  };
  GhostSighting.prototype.toHtml= function() {
    let ghostTemplate = Handlebars.compile(document.getElementById('#ghost-details').innerText);
    return ghostTemplate(this);    
  };

// Book.prototype.toHtml = function(){return app.render('#detail-template', this);}

  module.GhostSighting = GhostSighting;
})(app);  
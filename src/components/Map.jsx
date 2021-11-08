import React, { useEffect, useRef } from "react";
import { google, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import yellowCandle from "../candle_icon_bluebg.png"

const exampleMapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#183594"
      },
      {
        "lightness": -25
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f1d81"
      },
      {
        "lightness": 50
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#12276f"
      },
      {
        "saturation": -30
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#fbc602"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "lightness": 100
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#211d82"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#12276f"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#334a9a"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1f1d80"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];


// icon images from freesvg.org
const shop = new window.google.maps.MarkerImage(
  yellowCandle,
  null /* size is determined at runtime */,
  null /* origin is 0,0 */,
  null /* anchor is bottom center of the scaled image */,
  new window.google.maps.Size(32, 32)
);

const favoriteShop = new window.google.maps.MarkerImage(
  "https://freesvg.org/img/squat-marker-red.png",
  null /* size is determined at runtime */,
  null /* origin is 0,0 */,
  null /* anchor is bottom center of the scaled image */,
  new window.google.maps.Size(32, 32)
);

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => (
  <GoogleMap
options={{
      styles: exampleMapStyles,
    }}
    ref={props.onMapLoad}
    defaultZoom={16.5}
    defaultCenter={{ lat: 35.66053397938023, lng: 139.66747550291967 }}
    // onClick={props.onMapClick}
  >
    {props.markers.map((marker) => (
      <Marker
        key={marker.key}
        {...marker}
        // onRightClick={() => props.onMarkerRightClick(marker)}
        onClick={() =>
          marker.icon ===
          props.setSelectedLocation({
            key: marker.key,
            position: marker.position,
            title: marker.title,
            type: marker.type,
            link: marker.link,
            icon: favoriteShop,
          })
        }
      />
    ))}
  </GoogleMap>
));

// We use object destructuring here to shorten our code
export default function Map(props) {
  useEffect(() => {
    props.getLocation();
  }, []);

  const markers = [];
  if (props.userLocation) {
    const userMarker = {
      key: 0,
      position: {
        lat: props.userLocation.latitude,

        lng: props.userLocation.longitude,
      },
      title: "User Location",
    };
    markers[0] = userMarker;
  }

  for (const location of props.locations) {
    const marker = {
      key: location.key,
      position: location.position,
      title: location.name,
      type: location.type,
      link: location.link,
      icon: shop,
    };
    markers.push(marker);
  }

  return (
    <MyMap
      className="test"
      containerElement={<div style={{ height: `85vh` }} />}
      mapElement={<div style={{ height: `85vh` }} />}
      onMapLoad={() => {}}
      onMapClick={() => {}}
      markers={markers}
      onMarkerRightClick={() => {}}
      setSelectedLocation={props.setSelectedLocation}
      // setCurrentView={props.setCurrentView}
    />
  );
}

import React, { useEffect, useRef } from "react";
import { google, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { isPropertySignature } from "typescript";

const exampleMapStyles = [
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
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
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
  }
];

// icon images from freesvg.org
const shop = new window.google.maps.MarkerImage(
  "https://freesvg.org/img/squat-marker-green.png",
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

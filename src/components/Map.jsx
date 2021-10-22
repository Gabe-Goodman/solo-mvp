import React, { useEffect } from "react";
import { google, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import axios from "axios";

// icon images from freesvg.org
const shop = new window.google.maps.MarkerImage(
  "https://freesvg.org/img/squat-marker-green.png",
  null /* size is determined at runtime */,
  null /* origin is 0,0 */,
  null /* anchor is bottom center of the scaled image */,
  new window.google.maps.Size(32, 32)
);

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={16.5}
    defaultCenter={{ lat: 35.66053397938023, lng: 139.66747550291967 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker) => (
      <Marker
        key={marker.key}
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
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
  for (const location of props.locations) {
    const marker = {
      key: location.key,
      position: location.position,
      title: location.name,
      icon: shop,
    };
    markers.push(marker);

    if (props.userLocation) {
      const userMarker = {
        key: 0,
        position: {
          lat: props.userLocation.latitude,

          lng: props.userLocation.longitude,
        },
        title: "User Location",
      };
      markers.unshift(userMarker);
    }
  }

  return (
    <MyMap
      className="test"
      containerElement={<div style={{ height: `60vh` }} />}
      mapElement={<div style={{ height: `60vh` }} />}
      onMapLoad={() => {}}
      onMapClick={() => {}}
      markers={markers}
      onMarkerRightClick={() => {}}
    />
  );
}

import React, { useEffect } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  GoogleApiWrapper,
} from "react-google-maps";
import axios from "axios";

// // icon images from freesvg.org
// const countryStore = new window.google.maps.MarkerImage(
//   "https://freesvg.org/img/squat-marker-red.png",
//   null /* size is determined at runtime */,
//   null /* origin is 0,0 */,
//   null /* anchor is bottom center of the scaled image */,
//   new window.google.maps.Size(32, 32)
// );

// const travelStop = new window.google.maps.MarkerImage(
//   "https://freesvg.org/img/squat-marker-green.png",
//   null /* size is determined at runtime */,
//   null /* origin is 0,0 */,
//   null /* anchor is bottom center of the scaled image */,
//   new window.google.maps.Size(32, 32)
// );

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={4}
    defaultCenter={{ lat: 25.7392, lng: -104.9903 }}
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
  //console.log(props.locations);
  const markers = [];
  let iconImage;
  for (const location of props.locations) {
    // if (location.type === "Travel Stop") {
    //   iconImage = travelStop;
    // } else iconImage = countryStore;
    const marker = {
      key: location.id,
      position: {
        lat: location.latitude,

        lng: location.longitude,
      },
      title: location.name,
      // icon: iconImage,
    };
    markers.push(marker);
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

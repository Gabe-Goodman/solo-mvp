import React, { useEffect, useRef } from "react";
import { google, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import yellowCandle from "../candle_icon_bluebg.png";
import litCandle from "../candle_icon.png";
import mapStyle from "./mapStyle.json";

// icon images from freesvg.org
const shop = new window.google.maps.MarkerImage(
	yellowCandle,
	null /* size is determined at runtime */,
	null /* origin is 0,0 */,
	null /* anchor is bottom center of the scaled image */,
	new window.google.maps.Size(32, 32)
);

const visitedShop = new window.google.maps.MarkerImage(
	litCandle,
	null /* size is determined at runtime */,
	null /* origin is 0,0 */,
	null /* anchor is bottom center of the scaled image */,
	new window.google.maps.Size(32, 32)
);

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => (
	<GoogleMap
		options={{
			styles: mapStyle,
		}}
		ref={props.onMapLoad}
		defaultZoom={16.35}
		defaultCenter={{ lat: 35.66125607391368, lng: 139.6682804608054 }}
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
						icon: shop,
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

	useEffect(async () => {
		console.log("----GET FAVORITES-------");
		await props.getFavorites();
		console.log("Favorites", props.favorites);
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
		// if (props.favorites[location.name]) {
		// 	marker.icon = visitedShop;
		// }
		// else marker.icon = shop;
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

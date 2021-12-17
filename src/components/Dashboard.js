import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import "firebase/firestore";
import Map from "./Map";

function Dashboard(props) {
	// const [currentView, setCurrentView] = useState("Dashboard");
	const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState("");
	const [uid, setUid] = useState("");
	const [favorites, setFavorites] = useState();
	const history = useHistory();
	const fetchUserName = async () => {
		try {
			const query = await db
				.collection("users")
				.where("uid", "==", user?.uid)
				.get();
			const data = await query.docs[0].data();
			setName(data.name);
			setUid(data.uid);
		} catch (err) {
			console.error(err);
			alert("An error occured while fetching user data");
		}
	};

	async function addToFavorites() {
		const newFavorite = db.collection("favorites").doc(uid);
		const newLocation = props.selectedLocation.title;
		const locationKey = props.selectedLocation.key;
		const setWithMerge = newFavorite.set(
			{ [newLocation]: newLocation },
			{ merge: true }
		);
	}

	async function getFavorites() {
		await fetch(
			`https://firestore.googleapis.com/v1/projects/festival-finder-ae96d/databases/(default)/documents/favorites/${uid}?key=${process.env.GOOGLE_API}`
		)
			// await fetch(
			// 	"https://firestore.googleapis.com/v1/projects/festival-finder-ae96d/databases/(default)/documents/favorites/l8wQjWMV3uRDPmQeGoqxXtgAI3l2?key=$AIzaSyDhYqjthsZ_I75BCbKrytwq67_uqfRQ-wU"
			// )
			.then((response) => response.json())
			.then((data) => setFavorites(data.fields));
	}

	function updateFavorites() {
		console.log("Favorites!!!", favorites);
		let favoritesList = [];
		for (const favorite of favorites) {
			favoritesList.push(favorite.name);
		}
		console.log(favoritesList);
		setFavorites(favoritesList);
	}

	useEffect(() => {
		if (loading) return;
		if (!user) return history.replace("/");
		fetchUserName();
	}, [user, loading]);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				getCoordinates
				// handleLocationError
			);
		}
		// else alert("Geolocation is not supported by this browser.");
	};

	const getCoordinates = (position) => {
		props.setUserLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
		console.log(props.userLocation);
	};

	// function onMarkerClick(marker) {
	//   props.setSelectedLocation(marker);
	// }

	return (
		<div>
			<Map
				id="map"
				getLocation={getLocation}
				locations={props.locations}
				favorites={favorites}
				getFavorites={getFavorites}
				updateFavorites={updateFavorites}
				userLocation={props.userLocation}
				selectedLocation={props.selectedLocation}
				setSelectedLocation={props.setSelectedLocation}
				// setCurrentView={setCurrentView}
			/>
			{props.selectedLocation ? (
				<div className="dashboard__container">
					<div className="venue__name">{props.selectedLocation.title}</div>
					<div>({props.selectedLocation.type})</div>
					<button
						className="dashboard__btn"
						onClick={(e) => {
							e.preventDefault();
							window.open(`${props.selectedLocation.link}`, "_blank");
							addToFavorites();
							getFavorites();
						}}
					>
						Take me there!
					</button>
				</div>
			) : (
				<div className="dashboard__container">
					<div
						style={{
							fontWeight: "bold",
							marginBottom: ".5%",
							fontSize: "1.5rem",
						}}
					>
						Welcome, {name}:
					</div>
					<div>{"Click a candle"}</div>
					<div>{"to learn more!"}</div>
					<button className="dashboard__btn" onClick={logout}>
						Sign out
					</button>
				</div>
			)}
		</div>
	);
}
export default Dashboard;

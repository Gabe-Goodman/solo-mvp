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
		const setWithMerge = newFavorite.push({
			newLocation,
		});
		// const docRef = await setDoc(doc(db, "favorites"), {
		//   name: "Los Angeles",
		//   state: "CA",
		//   country: "USA",
		// });

		// const userRef = db.collection("users").doc(doc);
		// await updateDoc(userRef, {
		//   doctest: "doc",
		// });

		// try {
		//   const docRef = await addDoc(collection(db, "users"), {
		//     haha: "haha",
		//   });
		// } catch (err) {
		//   console.error(err);
		//   alert("An error occured while SETTING user data");
		// }
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

	// function handleLocationError(error) {
	//   switch (error.code) {
	//     case error.PERMISSION_DENIED:
	//       alert("User denied the request for Geolocation.");
	//       break;
	//     case error.POSITION_UNAVAILABLE:
	//       alert("Location information is unavailable.");
	//       break;
	//     case error.TIMEOUT:
	//       alert("The request to get user location timed out.");
	//       break;
	//     case error.UNKNOWN_ERROR:
	//       alert("An unknown error occurred.");
	//       break;
	//   }
	// }

	console.log("selectedLocation", props.selectedLocation);
	console.log("uid", uid);
	// function onMarkerClick(marker) {
	//   props.setSelectedLocation(marker);
	// }

	return (
		<div>
			<Map
				id="map"
				getLocation={getLocation}
				locations={props.locations}
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
							window.location.href = `${props.selectedLocation.link}`;
						}}
					>
						Take me there!
					</button>
				</div>
			) : (
				<div className="dashboard__container">
					<div>{"Click a candle"}</div>
					<div>{"to learn more!"}</div>
					<button className="dashboard__btn" onClick={logout}>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
export default Dashboard;

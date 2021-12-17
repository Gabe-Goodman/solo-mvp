import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Register, Reset } from "./auth";
import { Dashboard, Map } from "./components";
import data from "./data.json";

function App() {
	//state
	const [locations, setLocations] = useState(data);
	const [userLocation, setUserLocation] = useState();
	const [selectedLocation, setSelectedLocation] = useState();

	return (
		<div className="app">
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/reset" component={Reset} />
					<Route
						exact
						path="/dashboard"
						render={(props) => (
							<Dashboard
								locations={locations}
								setLocations={setLocations}
								userLocation={userLocation}
								setUserLocation={setUserLocation}
								selectedLocation={selectedLocation}
								setSelectedLocation={setSelectedLocation}
							/>
						)}
					/>
				</Switch>
			</Router>
		</div>
	);
}
export default App;

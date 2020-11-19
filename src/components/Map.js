import React, { Component } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class GoogleMap extends Component {
	state = {
		map: {
			mapboxApiAccessToken: process.env.NETLIFY_MAP_KEY || "",
			mapStyle: "mapbox://styles/mapbox/outdoors-v10",
			viewport: {
				width: "100%",
				height: "35vh",
				latitude: 47.6798,
				longitude: -122.3258,
				zoom: 11
			}
		}
	};

	_onViewportChange = (viewport) => this.setState({ viewport });

	render() {
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: "35vh", width: "100%" }}>
				<ReactMapGL
					mapboxApiAccessToken={this.state.map.mapboxApiAccessToken}
					mapStyle={this.state.map.mapStyle}
					onViewportChange={this._onViewportChange}
					{...this.state.map.viewport}
				>
					<Popup
						latitude={this.state.map.viewport.latitude}
						longitude={this.state.map.viewport.longitude}
						closeButton={false}
						closeOnClick={false}
						anchor="bottom"
					>
						<div>
							506 2nd Ave #2700 506 2nd Ave #2700
							<br />
							Seattle, WA 98104
							<br />
							<a
								href="https://maps.google.com/maps?ll=47.601979,-122.331716&z=16&t=m&hl=en-US&gl=US&mapclient=embed&daddr=506%202nd%20Ave%20%232700%20Seattle%2C%20WA%2098104@47.6019789,-122.3317164"
								target="_blank"
								rel="nofollower noreferrer"
							>
								Directions
							</a>
						</div>
					</Popup>
				</ReactMapGL>
			</div>
		);
	}
}

export default GoogleMap;

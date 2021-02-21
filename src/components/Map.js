import React from "react";

const Map = ({ locations }) => {
	return (
		<iframe
			src={locations.mapLink}
			width="600"
			height="450"
			frameBorder="0"
			style={{ border: 0, width: "100%", height: "50vh" }}
			allowFullScreen=""
			aria-hidden="false"
			tabIndex="0"
		></iframe>
	);
};

export default Map;

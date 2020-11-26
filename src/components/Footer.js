import React from "react";
import "./Footer.css";

const Footer = () => (
	<div>
		<footer className="footer">
			<div className="container">
				<h4>OUR VALUES AND COMMITMENTS</h4>
				<p>
					Provide exceptional service to our clients
					<br />
					Foster a creative spirit in our employees
					<br />
					Seek meaningful work in our areas of expertise
					<br />
					Support our employees and their families
					<br />
					Make a positive impact in our community
					<br />
					Have a positive impact on the environment
				</p>
			</div>

			<div className="bottom">
				<div className="container taRight">
					<span>
						© Copyright {new Date().getFullYear()} Watershed Science &amp;
						Engineering
					</span>
				</div>
			</div>
		</footer>
	</div>
);

export default Footer;

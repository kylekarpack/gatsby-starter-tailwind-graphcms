import React from "react";

const Footer = () => (
	<div>
		<footer className="bg-gray-900">
			<div className="container text-white py-12">
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

			<div className="bg-gray-800 text-white py-2">
				<div className="container text-right">
					<span className="text-sm">
						© Copyright {new Date().getFullYear()} Watershed Science &amp;
						Engineering
					</span>
				</div>
			</div>
		</footer>
	</div>
);

export default Footer;

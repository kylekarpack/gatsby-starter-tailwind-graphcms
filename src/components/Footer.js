import React from "react";
import { MapPin, Phone } from "react-feather";

const Footer = () => (
	<div>
		<footer className="bg-gray-900">
			<div className="container text-white py-12 grid md:grid-cols-3">
				<div>
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
				<div>&nbsp;</div>
				<div>
					<div className="flex gap-4 mb-4">
						<MapPin />
						<div>
							<a
								className="text-white"
								target="_blank"
								rel="nofollower noreferrer"
								href="https://goo.gl/maps/cYDbnERDHDuxebbi8"
							>
								Watershed Science &amp; Engineering
								<br />
								Smith Tower, 506 2nd Ave, Suite 2700
								<br />
								Seattle, WA 98104
							</a>
						</div>
					</div>
					<div className="flex gap-4">
						<Phone />
						<div>
							<a className="text-white" href="tel:206-521-3000">
								(206) 521-3000
							</a>
						</div>
					</div>
				</div>
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

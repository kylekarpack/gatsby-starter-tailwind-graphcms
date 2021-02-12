import React from "react";
import { MapPin, Phone } from "react-feather";
import { location, siteTitle } from "../../constants";

const Footer = () => (
	<div>
		<footer className="bg-gray-900">
			<div className="container text-white py-12 grid md:grid-cols-3">
				<div>
					
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
							{location?.address}
							</a>
						</div>
					</div>
					<div className="flex gap-4">
						<Phone />
						<div>
							<a className="text-white" href={`tel:${location?.phoneNumber}`}>
								{location.phoneNumber}
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gray-800 text-white py-2">
				<div className="container text-right">
					<span className="text-sm">
						© Copyright {new Date().getFullYear()} {siteTitle}
					</span>
				</div>
			</div>
		</footer>
	</div>
);

export default Footer;

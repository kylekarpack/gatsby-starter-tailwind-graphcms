import React from "react";
import "./Footer.css";

export default () => (
	<div>
		<footer className="footer">
			<div className="container taCenter">
				<span>
					© Copyright {new Date().getFullYear()} Watershed Science &amp; Engineering
				</span>
			</div>
		</footer>
	</div>
);

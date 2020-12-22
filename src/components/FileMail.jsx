import React, { useEffect } from "react";
import Helmet from "react-helmet";

const FileMail = ({ companyId }) => {
	// clear out filemail when component is removed
	useEffect(() => {
		return () => {
			const fileMails = document.querySelectorAll(
				"script[src^='//www.filemail.com/']"
			);
			[...fileMails].forEach((el) => el.remove());
		};
	}, []);
	return (
		<div>
			<div id="FilemailUploadWrap"></div>
			<Helmet defer={false}>
				<script>console.warn(window)</script>
				<script
					type="text/javascript"
					src={`//www.filemail.com/js/widgets/uploadIntegrator2.js?companyid=${companyId}&wrapId=FilemailUploadWrap`}
				></script>
			</Helmet>
		</div>
	);
};

export default FileMail;

import React from "react";
import Helmet from "react-helmet";

const FileMail = ({ companyId }) => {
	return (
		<div>
			<h2>Send Us Files</h2>
			<div id="FilemailUploadWrap"></div>
			<Helmet>
				<script
					type="text/javascript"
					onLoad={() => console.warn("FileMail loaded")}
					src={`https://www.filemail.com/js/widgets/uploadIntegrator2.js?companyid=${companyId}&wrapId=FilemailUploadWrap`}
				></script>
			</Helmet>
		</div>
	);
};

export default FileMail;

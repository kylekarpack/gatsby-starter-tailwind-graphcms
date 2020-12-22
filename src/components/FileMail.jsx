import React from "react";
import Helmet from "react-helmet";

const FileMail = ({ companyId }) => {
	return (
		<div>
			<div id="FilemailUploadWrap"></div>
			<Helmet>
				<script
					type="text/javascript"
					src={`https://www.filemail.com/js/widgets/uploadIntegrator2.js?companyid=${companyId}&wrapId=FilemailUploadWrap`}
				></script>
			</Helmet>
		</div>
	);
};

export default FileMail;

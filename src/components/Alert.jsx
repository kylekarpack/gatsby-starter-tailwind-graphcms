import React from "react";
import { AlertTriangle, Info, Check, XCircle } from "react-feather";

const Alert = ({ color, children }) => {
	return (
		<div
			className={`bg-${color}-100 text-${color}-900 px-6 py-4 border-0 rounded relative mb-8 flex items-center gap-4`}
		>
			{color === "yellow" && <AlertTriangle className="w-24 h-12" />}
			{color === "green" && <Check className="w-24 h-12" />}
			{color === "blue" && <Info className="w-24 h-12" />}
			{color === "red" && <XCircle className="w-24 h-12" />}
			<span className="inline-block align-middle mr-8">{children}</span>
		</div>
	);
};

export default Alert;

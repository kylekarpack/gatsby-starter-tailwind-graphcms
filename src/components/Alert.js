import React from "react";
import { AlertTriangle, Check, Info, XCircle } from "react-feather";

const Alert = ({ type, children }) => {
	let className = "";
	let icon = "";
	switch (type) {
		case "warning":
			className = "bg-yellow-100 text-yellow-900";
			icon = <AlertTriangle className="w-24 h-12" />;
			break;
		case "danger":
			className = "bg-red-100 text-red-900";
			icon = <XCircle className="w-24 h-12" />;
			break;
		case "success":
			className = "bg-green-100 text-green-900";
			icon = <Check className="w-24 h-12" />;
			break;
		default:
			// info
			className = "bg-blue-100 text-blue-900";
			icon = <Info className="w-24 h-12" />;
	}
	return (
		<div
			className={`${className} px-6 py-4 border-0 rounded relative mb-8 flex items-center gap-4`}
		>
			{icon}
			<span className="inline-block align-middle mr-8">{children}</span>
		</div>
	);
};

export default Alert;

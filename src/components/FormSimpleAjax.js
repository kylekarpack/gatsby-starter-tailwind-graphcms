import { serialize } from "dom-form-serializer";
import { stringify } from "qs";
import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { recaptchaSiteId } from "../../constants";

class Form extends React.Component {
	static defaultProps = {
		name: "Contact Form",
		subject: "New Website Contact", // optional subject of the notification email
		action: "",
		successMessage: "Thanks for your inquiry, we will get back to you soon",
		errorMessage:
			"There was a problem and your message has not been sent. Please try contacting us via email"
	};

	state = {
		alert: "",
		disabled: false
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.disabled) {
			return;
		}

		const form = e.target;
		const data = serialize(form);
		this.setState({ disabled: true });
		fetch(form.action + "?" + stringify(data), {
			method: "POST"
		})
			.then((res) => {
				if (res.ok) {
					return res;
				} else {
					throw new Error("Network error");
				}
			})
			.then(() => {
				form.reset();
				this.setState({
					alert: this.props.successMessage,
					disabled: false
				});
			})
			.catch((err) => {
				console.error(err);
				this.setState({
					disabled: false,
					alert: this.props.errorMessage
				});
			});
	};

	render() {
		const { name, subject, action } = this.props;

		return (
			<Fragment>
				<Helmet>
					<script src="https://www.google.com/recaptcha/api.js" />
				</Helmet>
				<form
					className="Form"
					name={name}
					action={action}
					onSubmit={this.handleSubmit}
					data-netlify="true"
					netlify-recaptcha=""
				>
					{this.state.alert && (
						<div className="text-white px-6 py-4 border-0 rounded relative mb-8 bg-blue-100 flex items-center gap-4 text-blue-900">
							{this.state.alert}
						</div>
					)}

					<div className="flex flex-col mb-6">
						<label
							htmlFor="name"
							className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
						>
							Your Name
						</label>
						<input
							id="name"
							type="text"
							name="name"
							className="placeholder-gray-500 pl-3 rounded-sm border border-gray-400 w-full py-2 focus:outline-none focus:border-primary"
							placeholder="Name"
							required
						/>
					</div>
					<div className="flex flex-col mb-6">
						<label
							htmlFor="email"
							className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
						>
							Email Address
						</label>
						<input
							id="email"
							type="email"
							name="email"
							className="placeholder-gray-500 pl-3 rounded-sm border border-gray-400 w-full py-2 focus:outline-none focus:border-primary"
							placeholder="Email Address"
							required
						/>
					</div>
					<div className="flex flex-col mb-6">
						<label
							htmlFor="files"
							className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
						>
							Send Files
						</label>
						<input
							id="files"
							type="file"
							name="files"
							className="placeholder-gray-500 pl-3 rounded-sm border border-gray-400 w-full py-2 focus:outline-none focus:border-primary"
							placeholder="Select file"
						/>
					</div>
					<div className="flex flex-col mb-6">
						<label
							htmlFor="message"
							className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							className="placeholder-gray-500 pl-3 rounded-sm border border-gray-400 w-full py-2 focus:outline-none focus:border-primary"
							placeholder="Message"
							rows="10"
							required
						></textarea>
					</div>
					<div
						className="g-recaptcha"
						data-sitekey={recaptchaSiteId}
					/>
					{!!subject && (
						<input type="hidden" name="subject" value={subject} />
					)}
					<input type="hidden" name="form-name" value={name} />

					<button
						type="submit"
						disabled={this.state.disabled}
						className="text-white text-sm sm:text-base bg-primary hover:bg-primary-500 rounded py-2 px-4 transition duration-150 ease-in"
					>
						Send
					</button>
				</form>
			</Fragment>
		);
	}
}

export default Form;

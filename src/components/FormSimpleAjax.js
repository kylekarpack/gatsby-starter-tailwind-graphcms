import React, { Fragment } from "react";

import Helmet from "react-helmet";
import { serialize } from "dom-form-serializer";
import { stringify } from "qs";

class Form extends React.Component {
	static defaultProps = {
		name: "Contact Form",
		subject: "New Website Contact", // optional subject of the notification email
		action: "",
		successMessage: "Thanks for your inquiry, we will get back to you soon",
		errorMessage:
			"There is a problem, your message has not been sent, please try contacting us via email"
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
					data-netlify=""
					netlify-recaptcha=""
				>
					{this.state.alert && (
						<div className="Form--Alert">{this.state.alert}</div>
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
							className="placeholder-gray-500 pl-3 rounded-sm border border-gray-400 w-full py-2 focus:outline-none focus:border-primary-400"
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
							className="placeholder-gray-500 pl-3 rounded-sm border border-gray-400 w-full py-2 focus:outline-none focus:border-primary-400"
							placeholder="Email Address"
							required
						/>
					</div>
					<div className="flex flex-col mb-6">
						<label
							htmlFor="message"
							className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
						>
							E-Mail Address
						</label>
						<textarea
							id="message"
							name="message"
							className="placeholder-gray-500 pl-3 rounded-sm border border-gray-400 w-full py-2 focus:outline-none focus:border-primary-400"
							placeholder="Message"
							rows="10"
							required
						></textarea>
					</div>
					<div
						className="g-recaptcha"
						data-sitekey="6LfKN3kUAAAAAGIM1CbXmaRZx3LIh_W2twn1tzkA"
					/>
					{!!subject && (
						<input type="hidden" name="subject" value={subject} />
					)}
					<input type="hidden" name="form-name" value={name} />

					<button
						type="submit"
						disabled={this.state.disabled}
						className="text-white text-sm sm:text-base bg-primary hover:bg-green-700 rounded py-2 px-4 transition duration-150 ease-in"
					>
						Send
					</button>
				</form>
			</Fragment>
		);
	}
}

export default Form;

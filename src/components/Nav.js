import React, { useEffect, useState } from "react";

import { Link } from "gatsby";
import { Location } from "@reach/router";

export const Navigation = (props) => {
	const [state, setState] = useState({
		active: false,
		currentPath: false
	});

	useEffect(() => {
		setState({ currentPath: props.location.pathname });
	}, []);

	const handleMenuToggle = () => {
		setState({ active: !state.active });
	};

	// Only close nav if it is open
	const handleLinkClick = () => {
		state.active && handleMenuToggle();
	};
	// keyboard events
	const handleLinkKeyDown = (ev) => {
		if (ev.keyCode === 13) {
			state.active && handleMenuToggle();
		}
	};

	const NavLink = ({ to, className, children, ...props }) => {
		return (
			<Link
				to={to}
				className={`${to === state.currentPath ? "text-white" : ""} ${
					className || ""
				}`}
				onClick={handleLinkClick}
				onKeyDown={handleLinkKeyDown}
				tabIndex={0}
				aria-label="Navigation"
				role="link"
				{...props}
			>
				{children}
			</Link>
		);
	};

	const AllNavLinks = () => {
		const navClass =
			"text-gray-300 whitespace-nowrap hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium outline-none border-none";
		const navSubClass =
			"text-white sm:text-primary block px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-no-wrap text-sm lg:text-base outline-none border-none";

		return (
			<>
				<div className="group relative inline-block overflow-visible">
					<NavLink to="/services" className={navClass}>
						Services{" "}
						<svg
							className="fill-current inline-block h-4 w-4 ml-2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</NavLink>
					<div className="sm:hidden group-hover:block sm:absolute z-50 w-screen max-w-md">
						<ul className="sm:bg-white list-none sm:shadow-lg">
							<li>
								<NavLink to="/services" className={navSubClass}>
									All Services
								</NavLink>
							</li>
							{subNav.services.map(({ slug, title }, index) => (
								<li key={`posts-subnav-link-${index}`}>
									<NavLink to={slug} className={navSubClass}>
										{title}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</div>
				<NavLink to="/portfolio" className={navClass}>
					Portfolio
				</NavLink>
				<NavLink to="/tools-skills" className={navClass}>
					Tools &amp; Skills
				</NavLink>
				<NavLink to="/team/" className={navClass}>
					Team
				</NavLink>
				<NavLink to="/careers/" className={navClass}>
					Careers
				</NavLink>
				<NavLink to="/community-service/" className={navClass}>
					Community Service
				</NavLink>
				<NavLink to="/contact/" className={navClass}>
					Contact
				</NavLink>
			</>
		);
	};

	const { subNav } = props;

	return (
		<>
			<nav className="bg-primary sm:sticky top-0 z-50">
				<div className="hidden sm:block max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex-shrink-0 flex items-center ">
								<a href="/">
									<img
										className="block md:hidden h-8 w-8"
										src="/favicon.png"
										alt="Logo"
									/>
									<img
										className="hidden md:block h-8 w-48 lg:h-12 lg:w-56"
										src="/images/logo.svg"
										alt="Logo"
									/>
								</a>
							</div>
							<div className="sm:ml-6 flex space-x-2 lg:space-x-4 self-center">
								<AllNavLinks />
							</div>
						</div>
					</div>
				</div>
				{/*
			Mobile menu, toggle classes based on menu state.
	
			Menu open: "block", Menu closed: "hidden"
		*/}
				<div className="block sm:hidden">
					<div className="flex justify-between p-2">
						<a href="/" className="self-center">
							<img
								className="h-8 w-48"
								src="/images/logo.svg"
								alt="Logo"
							/>
						</a>
						<button
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-expanded="false"
							onClick={handleMenuToggle}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								{state.active ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
					{state.active && (
						<div className="px-2 pt-2 pb-3 space-y-1">
							<AllNavLinks />
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

const Nav = ({ subNav }) => (
	<Location>{(route) => <Navigation subNav={subNav} {...route} />}</Location>
);

export default Nav;

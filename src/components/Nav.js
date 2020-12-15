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
				className={`NavLink ${to === state.currentPath ? "active" : ""} ${
					className || ""
				}`}
				onClick={handleLinkClick}
				onKeyDown={handleLinkKeyDown}
				tabIndex={0}
				aria-label="Navigation"
				role="button"
				{...props}
			>
				{children}
			</Link>
		);
	};

	const AllNavLinks = () => {
		return (
			<>
				<div className="group relative inline-block">
					<NavLink
						to="/services"
						className="text-gray-300 hover:text-white px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium inline-flex items-center"
					>
						Services{" "}
						<svg
							className="fill-current h-4 w-4 ml-2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</NavLink>
					<div className="hidden group-hover:block absolute z-10 w-screen max-w-md">
						<div className="rounded overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="relative bg-white">
								<NavLink
									to="/services"
									className="block px-4 py-2 rounded-lg hover:bg-gray-50 whitespace-no-wrap"
								>
									All Services
								</NavLink>
								{subNav.services.map(({ slug, title }, index) => (
									<NavLink
										key={`posts-subnav-link-${index}`}
										to={slug}
										className="block px-4 py-2 rounded-lg hover:bg-gray-50 whitespace-no-wrap"
									>
										{title}
									</NavLink>
								))}
							</div>
						</div>
					</div>
				</div>
				<NavLink
					to="/portfolio"
					className="text-gray-300 hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium"
				>
					Portfolio
				</NavLink>
				<NavLink
					to="/tools-skills"
					className="text-gray-300 hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium"
				>
					Tools &amp; Skills
				</NavLink>
				<NavLink
					to="/team/"
					className="text-gray-300 hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium"
				>
					Team
				</NavLink>
				<NavLink
					to="/careers/"
					className="text-gray-300 hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium"
				>
					Careers
				</NavLink>
				<NavLink
					to="/community-service/"
					className="text-gray-300 hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium"
				>
					Community Service
				</NavLink>
				<NavLink
					to="/contact/"
					className="text-gray-300 hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium"
				>
					Contact
				</NavLink>
			</>
		);
	};

	const { subNav } = props;

	return (
		<>
			<nav className="bg-primary">
				<div className="hidden sm:block max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex-shrink-0 flex items-center ">
								<a href="/">
									<img
										className="block md:hidden h-8 w-8"
										src="/favicon.png"
										alt="Workflow"
									/>
									<img
										className="hidden md:block h-8 w-48"
										src="/images/logo.svg"
										alt="Workflow"
									/>
								</a>
							</div>
							<div className="sm:block sm:ml-6">
								<div className="flex space-x-4">
									<AllNavLinks />
								</div>
							</div>
						</div>
					</div>
				</div>
				{/*
			Mobile menu, toggle classes based on menu state.
	
			Menu open: "block", Menu closed: "hidden"
		*/}
				<div className="block sm:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<AllNavLinks />
					</div>
				</div>
			</nav>
		</>
	);
};

const Nav = ({ subNav }) => (
	<Location>{(route) => <Navigation subNav={subNav} {...route} />}</Location>
);

export default Nav;

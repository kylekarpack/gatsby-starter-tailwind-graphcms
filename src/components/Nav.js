import "./Nav.css";

import { Menu, X } from "react-feather";
import React, { useEffect, useState } from "react";

import { Link } from "gatsby";
import { Location } from "@reach/router";
import Logo from "./Logo";

export const Navigation = (props) => {
	const [state, setState] = useState({
		active: false,
		activeSubNav: false,
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

	const toggleSubNav = (subNav, activeState) => {
		let active;
		if (typeof activeState !== "undefined") {
			active = activeState ? subNav : false;
		} else {
			active = state.activeSubNav === subNav ? false : subNav;
		}
		setState({
			activeSubNav: active
		});
	};

	const keyToggleSubNav = (e, subNav) => {
		// key o is for open so you can enter key to open
		if (e.keyCode === 79 || e.keyCode === 27) {
			toggleSubNav(subNav);
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
				<NavLink
					to="/services"
					className="text-gray-300 hover:text-white block px-1 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium"
				>
					Services
				</NavLink>
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

	const { active } = state;
	const { subNav } = props;

	return (
		<>
			<nav className="bg-primary">
				<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							{/* Mobile menu button*/}
							<button
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{/* Icon when menu is closed. */}
								{/*
				Heroicon name: menu
	
				Menu open: "hidden", Menu closed: "block"
			*/}
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
								{/* Icon when menu is open. */}
								{/*
				Heroicon name: x
	
				Menu open: "block", Menu closed: "hidden"
			*/}
								<svg
									className="hidden h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex-shrink-0 flex items-center">
								<a href="/">
									<img
										className="block lg:hidden h-8 w-auto"
										src="/favicon.png"
										alt="Workflow"
									/>
									<img
										className="hidden lg:block h-8 w-auto"
										src="/images/logo.svg"
										alt="Workflow"
									/>
								</a>
							</div>
							<div className="hidden sm:block sm:ml-6">
								<div className="flex space-x-4">
									{/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
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
				<div className="hidden sm:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<AllNavLinks />
					</div>
				</div>
			</nav>
		</>
	);

	return (
		<nav className={`Nav ${active ? "Nav-active" : ""}`}>
			<div className="Nav--Container container">
				<Link
					to="/"
					onClick={handleLinkClick}
					onKeyDown={handleLinkKeyDown}
					tabIndex={0}
					aria-label="Navigation"
					role="button"
				>
					<Logo />
				</Link>
				<div className="Nav--Links">
					<div
						className={`Nav--Group ${
							state.activeSubNav === "services" ? "active" : ""
						}`}
					>
						<span
							className={`NavLink Nav--GroupParent ${
								props.location.pathname.includes("services")
									? "active"
									: ""
							}`}
							onMouseEnter={() => toggleSubNav("services", true)}
							onMouseLeave={() => toggleSubNav("services", false)}
							onClick={() => toggleSubNav("services")}
							onKeyDown={(e) => keyToggleSubNav(e, "services")}
							tabIndex={0}
							aria-label="Navigation"
							role="button"
						>
							<NavLink to="/services">Services</NavLink>
							<div className="Nav--GroupLinks">
								<NavLink to="/services/" className="Nav--GroupLink">
									All Services
								</NavLink>
								{subNav.services.map(({ slug, title }, index) => (
									<NavLink
										to={slug}
										key={"posts-subnav-link-" + index}
										className="Nav--GroupLink"
									>
										{title}
									</NavLink>
								))}
							</div>
						</span>
					</div>
					<NavLink to="/portfolio">Portfolio</NavLink>
					<NavLink to="/tools-skills">Tools &amp; Skills</NavLink>
					<NavLink to="/team/">Team</NavLink>
					<NavLink to="/careers/">Careers</NavLink>
					<NavLink to="/community-service/">Community Service</NavLink>
					<NavLink to="/contact/">Contact</NavLink>
				</div>
				<button
					className="Button-blank Nav--MenuButton"
					onClick={handleMenuToggle}
					tabIndex={0}
					aria-label="Navigation"
				>
					{active ? <X color="#fff" /> : <Menu color="#fff" />}
				</button>
			</div>
		</nav>
	);
};

const Nav = ({ subNav }) => (
	<Location>{(route) => <Navigation subNav={subNav} {...route} />}</Location>
);

export default Nav;

import { Location } from "@reach/router";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React, { useEffect, useState } from "react";
import "./Nav.css";

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
				className={`${
					to === state.currentPath ? "text-white" : "text-gray-300"
				} ${className || ""}`}
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

	const MegaMenuLink = ({
		to,
		children,
		previewImage,
		previewImageDuotone
	}) => {
		return (
			<Link
				to={to}
				className="custom-group block text-white sm:text-primary hover:bg-primary-100 hover:text-primary px-6 py-2"
			>
				<div className="flex align-center self-center gap-4 group">
					{previewImage && previewImageDuotone && (
						<div className="hidden sm:block self-center relative h-10 w-14">
							<div className="opacity-100 custom-group-hover-opacity-0 absolute">
								<Img
									fluid={previewImageDuotone.childImageSharp.fluid}
									className="h-10 w-14"
								/>
							</div>
							<div className="opacity-0 custom-group-hover-opacity-100 absolute">
								<Img
									fluid={previewImage.childImageSharp.fluid}
									className="h-10 w-14"
								/>
							</div>
						</div>
					)}
					<div className="self-center">
						<div className="text-sm sm:text-base cursor-pointer mb-0">
							{children}
						</div>
					</div>
				</div>
			</Link>
		);
	};

	const AllNavLinks = () => {
		const navClass =
			"ml-0 hover:bg-white hover:text-primary px-4 py-3 sm:py-5 sm:px-2 md:px-3 xl:px-4 text-white text-sm lg:text-base whitespace-nowrap block font-medium outline-none border-none";
		const navSubClass =
			"text-white sm:text-white block pl-8 sm:px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-no-wrap text-sm lg:text-base outline-none border-none";
		const submenuClass = state.active ? "" : "sm:hidden";

		return (
			<>
				<div className="group block">
					<NavLink
						to="/services"
						className={`group-hover:bg-white group-hover:text-primary ${navClass}`}
					>
						Services{" "}
						<svg
							className="fill-current inline-block h-4 w-4 ml-2 transform group-hover:rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</NavLink>
					<div
						className={`${submenuClass} delay-0 group-hover:delay-100 hidden sm:block group-hover:block sm:absolute z-100 w-auto`}
					>
						<div className="sm:bg-white sm:shadow-lg py-2">
							<ul className="list-none mb-0">
								{subNav.services.map(
									({ slug, title, ...props }, index) => (
										<li key={`posts-subnav-link-${index}`}>
											<MegaMenuLink
												to={"/" + slug}
												className={navSubClass}
												{...props}
											>
												{title}
											</MegaMenuLink>
										</li>
									)
								)}
							</ul>
						</div>
					</div>
				</div>
				<NavLink to="/portfolio/" className={navClass}>
					Portfolio
				</NavLink>
				<NavLink to="/team/" className={navClass}>
					Team
				</NavLink>
				<NavLink to="/careers/" className={navClass}>
					Careers
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
			<nav className="bg-primary sm:sticky top-0 z-50 relative">
				<div className="hidden sm:block max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex-shrink-0 flex items-center ">
								<a href="/">
									<img
										className="block lg:hidden h-8 w-14"
										src="/images/logo-small.svg"
										alt="Logo"
									/>
									<img
										className="hidden lg:block h-8 w-48 lg:h-12 lg:w-56"
										src="/images/logo.svg"
										alt="Logo"
									/>
								</a>
							</div>
							<div className="sm:ml-6 flex self-center">
								<AllNavLinks />
							</div>
						</div>
					</div>
				</div>
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
							className="p-2 rounded-md text-white hover:text-grey-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
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
						<div className="pt-2 pb-3 space-y-1">
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

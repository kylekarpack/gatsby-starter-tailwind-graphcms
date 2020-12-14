import React, { useEffect, useState } from "react";
import { Location } from "@reach/router";
import { Link } from "gatsby";
import { Menu, X } from "react-feather";
import Logo from "./Logo";

import "./Nav.css";

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
		return <Link
			to={to}
			className={`NavLink ${
				to === state.currentPath ? "active" : ""
			} ${className || ""}`}
			onClick={handleLinkClick}
			onKeyDown={handleLinkKeyDown}
			tabIndex={0}
			aria-label="Navigation"
			role="button"
			{...props}
		>
			{children}
		</Link>
	};

	const { active } = state;
	const { subNav } = props;

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

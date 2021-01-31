import { Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Image from "gatsby-image";
import React from "react";

export const Excerpt = ({ text, minLength = 100 }) => {
	text = text || "";
	let processedExcerpt = "";
	const split = text.split(".");
	for (let i = 0; i < split.length; i++) {
		processedExcerpt += split[i];
		processedExcerpt += ".";
		if (processedExcerpt.length > minLength) {
			break;
		}
	}
	return <>{processedExcerpt}</>;
};

export const Page = ({
	page,
	excerpt,
	overlay,
	readMore,
	height,
	masonry,
	className
}) => {
	height = height || "200px";
	const image = page.image?.localFile?.childImageSharp?.fluid;
	return (
		<Link
			className={`hover:opacity-90 max-w-xs w-full rounded overflow-hidden shadow-lg hover:shadow-xl duration-500 transition-all ${
				overlay && "text-center"
			} ${className || ""}`}
			to={`/${page.slug}`}
		>
			{masonry ? (
				<div className="relative">
					<Image fluid={image} style={{minHeight: "100px"}} />
					<div className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 px-4 left-0 right-0 top-0 bottom-0 bg-black bg-opacity-60 text-center flex justify-center items-center">
						<span className="font-bold text-xl text-white px-4 leading-5">
							{page.title}
							{readMore && (
								<div className="text-primary-400 font-normal text-sm mt-2 cursor-pointer">
									Read more
								</div>
							)}
						</span>
					</div>
				</div>
			) : (
				<div className="Background">
					<BackgroundImage style={{ height }} fluid={image}>
						{overlay && (
							<div className="w-full h-full flex justify-center items-center bg-black bg-opacity-40">
								<h3 className="font-bold text-xl text-white text-bold px-4">
									{page.title}
								</h3>
							</div>
						)}
					</BackgroundImage>
				</div>
			)}

			{!(overlay || masonry) && (
				<div className="px-6 py-4">
					<>
						<div
							className={`font-bold text-lg leading-5 ${
								page.subtitle || (page.excerpt && "mb-2")
							}`}
						>
							{page.title}
						</div>
						{page.subtitle && (
							<div className="font-normal text-sm leading-4 mb-2">
								{page.subtitle}
							</div>
						)}
					</>
					{excerpt && (
						<p className="text-black text-xs mt-2 mb-0">
							<Excerpt text={page.content?.text} />
						</p>
					)}
					{readMore && (
						<small className="text-primary text-sm font-bold mt-2 cursor-pointer">
							Read more
						</small>
					)}
				</div>
			)}
		</Link>
	);
};

const PagePreview = ({ options, items }) => {
	console.warn(options);

	// if (type) {
	// 	items = items.filter((el) => el.frontmatter?.type === type);
	// }

	const style = options?.masonry
		? {
				columns: "4 250px",
				columnGap: "1rem",
				display: "block",
				textAlign: "center",
				breakInside: "avoid"
		  }
		: {};

	return (
		<div
			style={style}
			className="grid justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8"
		>
			{items.map((page, i) => (
				<Page
					page={page}
					excerpt={options?.excerpt !== false}
					overlay={options?.overlay}
					height={options?.height}
					masonry={options?.masonry}
					className={`Preview ${options?.masonry ? "inline-block mb-4" : ""}`}
					key={i}
				/>
			))}
		</div>
	);
};

export default PagePreview;

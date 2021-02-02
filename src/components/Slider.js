import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import "./Slider.css";

const Slider = ({ slides, title }) => {
	console.log(slides)
	return (
		<div className="relative">
			<div className="absolute hidden sm:block text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-6 text-white font-bold bg-black bg-opacity-60 max-w-1/2 z-10">
				<h1
					className="m-0 whitespace-pre" 
					dangerouslySetInnerHTML={{ __html: title }}
				></h1>
			</div>
			<Carousel
				interval={5000}
				showThumbs={false}
				showArrows={true}
				showIndicators={false}
				showStatus={false}
				useKeyboardArrows={true}
				infiniteLoop={true}
				autoPlay={false}
				dynamicHeight={true}
			>
				{slides.map((slide, i) => (
					<div key={i} className="slide-container">
						<img src={slide.image?.localFile?.childImageSharp?.fluid?.src} />
						<p className="legend">{slide.title}</p>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default Slider;

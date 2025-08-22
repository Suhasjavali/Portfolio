// src/components/Hero.jsx
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./Hero.css";

export default function Hero({ startTyping = false }) {
	const elRef = useRef(null);
	const typedRef = useRef(null);

	useEffect(() => {
		if (!startTyping || typedRef.current) return;

		typedRef.current = new Typed(elRef.current, {
			strings: [
				'This is <span class="typed-red">SUHAS JAVALI</span>',
				'I\'m a <span class="typed-green">FULL STACK DEVELOPER</span>',
			],
			typeSpeed: 70,
			backSpeed: 50,
			backDelay: 1200,
			startDelay: 0,
			loop: true,
			smartBackspace: true,
			showCursor: true,
			cursorChar: "|",
			contentType: "html",
		});

		return () => {
			typedRef.current?.destroy();
			typedRef.current = null;
		};
	}, [startTyping]);

	return (
		<section id="home" className="hero">
			{/* Left: typed text */}
			<div className="hero__text">
				<h1 className="hero-heading">
					<span ref={elRef} />
				</h1>
			</div>

			{/* Right: photo */}
			<div className="hero__photo-wrap">
				<img className="profilephoto" src="/photo23.jpg" alt="Suhas Javali" />
				<div className="photo-glow" aria-hidden="true" />
			</div>
		</section>
	);
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const serviceCardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom+=120% top",
                    scrub: true,
                    pin: true,
                    // markers: true,
                },
            });

            // Step 1 — Fade out hero text
            tl.to(textRef.current, {
                opacity: 0,
                x: -100,
                duration: 1,
                ease: "power2.out",
            });

            // Step 2 — Expand image to full screen
            tl.to(
                imageWrapperRef.current,
                {
                    width: "100%",
                    height: "100%",
                    left: 0,
                    borderRadius: 0,
                    duration: 1.5,
                    ease: "power3.inOut",
                },
                "<"
            );

            // Step 3 — Subtle zoom for cinematic effect
            tl.to(
                imageWrapperRef.current.querySelector("img"),
                {
                    scale: 1.05,
                    duration: 2,
                    ease: "power1.inOut",
                },
                "-=0.8"
            );

            // Step 4 — Fade in service cards (after image fully covers)
            tl.to(
                serviceCardsRef.current,
                {
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                },
                "-=0.2" // Slight delay overlap with zoom
            );

            tl.fromTo(
                serviceCardsRef.current.children,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.8"
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative flex flex-col md:flex-row items-center justify-between h-screen overflow-hidden bg-[#f8e8df]"
        >
            {/* Text Section */}
            <div ref={textRef} className="z-30 max-w-md text-left px-8 md:px-20">
                <h1 className="text-5xl md:text-6xl font-serif text-[#2d1b15] leading-tight">
                    Hair & <br /> Beauty Salon
                </h1>
                <p className="mt-4 text-lg text-[#5a433a]">
                    Award-winning Hair & Beauty Services — where style meets confidence.
                </p>
                <button className="mt-6 px-6 py-3 bg-[#2d1b15] text-white font-semibold rounded-full hover:bg-[#4b3026] transition">
                    Book Appointment
                </button>
            </div>

            {/* Expanding Banner Image */}
            <div
                ref={imageWrapperRef}
                className="absolute right-0 bottom-0 w-[50%] h-[80%] rounded-l-3xl overflow-hidden z-10"
            >
                <img
                    src="https://m.media-amazon.com/images/I/71PmT8R3rfL.jpg"
                    alt="Salon model"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Service Cards (fade in after image covers) */}
            <div
                ref={serviceCardsRef}
                className="absolute inset-0 flex flex-wrap justify-center items-center gap-6 opacity-0 z-40"
            >
                {[
                    "Hair Styling",
                    "Spa Treatments",
                    "Facials",
                    "Makeup",
                    "Nail Care",
                    "Massage",
                ].map((service, i) => (
                    <div
                        key={i}
                        className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl px-8 py-6 text-white text-xl font-semibold shadow-lg hover:bg-white/50 hover:text-[#2d1b15] transition-all duration-300"
                    >
                        {service}
                    </div>
                ))}
            </div>
        </section>
    );
}

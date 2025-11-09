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
    const searchRef = useRef(null);
    const serviceHeadingRef = useRef(null);

    useEffect(() => {
        // ---------- ✨ INITIAL LANDING ANIMATION ----------
        const tl = gsap.timeline();

        tl.fromTo(
            imageWrapperRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
        )
            .fromTo(
                textRef.current.querySelectorAll("h1, p"),
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.2,
                },
                "-=0.8"
            )
            .fromTo(
                searchRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.6"
            );

        // ---------- 📜 SCROLL ANIMATION ----------
        const ctx = gsap.context(() => {
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom+=60% top", // 🔽 reduced scroll distance
                    scrub: true,
                    pin: true,
                    // markers: true,
                },
            });

            scrollTl
                .to(textRef.current, {
                    opacity: 0,
                    x: -100,
                    duration: 1,
                    ease: "power2.out",
                })
                .to(
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
                )
                .to(
                    imageWrapperRef.current.querySelector("img"),
                    {
                        scale: 1.05,
                        duration: 2,
                        ease: "power1.inOut",
                    },
                    "-=0.8"
                )
                // ✨ Animate "Providing Services" heading
                .to(
                    serviceHeadingRef.current,
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        onStart: () => {
                            const letters = serviceHeadingRef.current.querySelectorAll("span");
                            gsap.fromTo(
                                letters,
                                { opacity: 0, y: 40 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    stagger: 0.05,
                                    duration: 0.5,
                                    ease: "power2.out",
                                }
                            );
                        },
                    },
                    "-=0.5"
                )
                .to(
                    serviceCardsRef.current,
                    {
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .fromTo(
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

    // Split heading text into spans for animation
    const headingText = "Providing Services";

    return (
        <section
            ref={heroRef}
            className="relative flex flex-col md:flex-row items-center justify-between h-screen overflow-hidden bg-gradient-to-br from-violet-100 to-purple-200"
        >
            {/* Left Content */}
            <div
                ref={textRef}
                className="z-30 w-full md:w-[60%] text-left px-8 md:px-24 py-16"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-[#3b0a61] leading-tight">
                    Bookmi Kya Kiya?
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-[#5a338f] font-medium">
                    India’s No. 1 Platform for Booking Salons, Spas & Beauty Services
                </p>

                {/* Search Bar */}
                <div
                    ref={searchRef}
                    className="mt-8 bg-white/70 backdrop-blur-lg rounded-full shadow-lg flex flex-wrap md:flex-nowrap items-center gap-3 p-4 border border-violet-200 max-w-2xl"
                >
                    <input
                        type="text"
                        placeholder="Search Location (e.g. Chennai, Mumbai)"
                        className="flex-1 bg-transparent px-4 py-3 outline-none text-[#3b0a61] placeholder-[#8c6cb3] text-base"
                    />
                    <div className="w-[1px] h-6 bg-violet-300 hidden md:block"></div>
                    <input
                        type="text"
                        placeholder="Search Service or Salon"
                        className="flex-1 bg-transparent px-4 py-3 outline-none text-[#3b0a61] placeholder-[#8c6cb3] text-base"
                    />
                </div>
            </div>

            {/* Expanding Banner Image */}
            <div
                ref={imageWrapperRef}
                className="absolute right-0 bottom-0 w-[50%] h-[80%] rounded-l-3xl overflow-hidden z-10"
            >
                <img
                    src="/young-beautiful-brunette-girl-tropical-plants-grey-wall.jpg"
                    alt="Salon model"
                    className="w-full h-full object-cover object-[center_25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
            </div>

            {/* Service Heading */}
            <div
                ref={serviceHeadingRef}
                className="absolute top-80 w-full text-center text-5xl md:text-6xl font-bold text-white opacity-0 z-40 tracking-wider"
            >
                {headingText.split("").map((char, i) => (
                    <span key={i} className="inline-block">
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>

            {/* Service Cards */}
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
                        className="backdrop-blur-md bg-black/40 border border-violet-200/40 rounded-2xl px-8 py-6 text-white text-xl font-semibold shadow-lg hover:bg-white/70 hover:text-violet-700 transition-all duration-300"
                    >
                        {service}
                    </div>
                ))}
            </div>
        </section>
    );
}

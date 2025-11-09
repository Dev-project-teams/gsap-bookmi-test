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
    const headingRef = useRef(null);
    const headerRef = useRef(null);
    const navLinksRef = useRef([]);
    const logoRef = useRef(null);

    useEffect(() => {
        // 🟣 INITIAL HEADER ANIMATION
        gsap.fromTo(
            headerRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
        );

        // 🟣 HEADER BACKGROUND + COLOR CHANGE ON SCROLL
        gsap.to(headerRef.current, {
            backgroundColor: "rgba(90, 41, 160, 0.5)",
            backdropFilter: "blur(10px)",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top+=100 top",
                end: "bottom top",
                toggleActions: "play none none reverse",
                onEnter: () => switchHeaderColors("white"),
                onLeaveBack: () => switchHeaderColors("#3b0a61"),
            },
        });

        // 🔤 Function to switch header text color
        function switchHeaderColors(color) {
            gsap.to(
                [logoRef.current, ...navLinksRef.current, headerRef.current.querySelectorAll(".login-btn")],
                {
                    color: color,
                    duration: 0.5,
                    ease: "power2.out",
                }
            );
        }

        // 🟣 HERO INITIAL LANDING ANIMATION
        const tl = gsap.timeline();

        tl.fromTo(
            imageWrapperRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
        )
            .fromTo(
                textRef.current.querySelectorAll("h1, p"),
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.2 },
                "-=0.8"
            )
            .fromTo(
                searchRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.6"
            );

        // 🟣 SCROLL TRANSITION: Banner → Services
        const ctx = gsap.context(() => {
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom+=80% top",
                    scrub: true,
                    pin: true,
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
                        duration: 1.2,
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
                // 🟣 Providing Service Heading Animation
                .fromTo(
                    headingRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        onStart: () => animateText(headingRef.current),
                    },
                    "-=0.5"
                )
                // 🟣 Show Service Cards Earlier
                .to(
                    serviceCardsRef.current,
                    {
                        opacity: 1,
                        duration: 1,
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

        
        // 🔠 Letter-by-letter heading animation
        function animateText(element) {
            const text = element.textContent;
            element.textContent = "";
            text.split("").forEach((char, i) => {
                const span = document.createElement("span");
                span.textContent = char;
                element.appendChild(span);
                gsap.from(span, {
                    opacity: 0,
                    y: 20,
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: "power2.out",
                });
            });
        }

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* 🟣 HEADER */}
            <header
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 bg-transparent border-b border-violet-200/30 shadow-sm transition-all"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <div
                        ref={logoRef}
                        className="text-2xl md:text-3xl font-extrabold text-[#3b0a61] tracking-wide"
                    >
                        Bookmi
                    </div>

                    {/* Center Links
                    <nav className="hidden md:flex gap-8 font-medium text-lg relative">
                        {["Hair", "Spa", "Makeup", "Nails", "Massage"].map((item, i) => (
                            <span
                                key={i}
                                ref={(el) => (navLinksRef.current[i] = el)}
                                className="relative group cursor-pointer text-[#3b0a61]"
                            >
                                {item}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current group-hover:w-full transition-all duration-300"></span>
                            </span>
                        ))}
                    </nav> */}

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <button className="font-semibold text-[#3b0a61] login-btn hover:text-violet-700 transition-colors">
                            Login
                        </button>
                        <button className="px-5 py-2 bg-violet-700 text-white rounded-full font-semibold hover:bg-violet-800 transition-all shadow-md">
                            For Partner
                        </button>
                    </div>
                </div>
            </header>

            {/* 🟣 HERO SECTION */}
            <section
                ref={heroRef}
                className="relative flex flex-col md:flex-row items-center justify-between h-screen overflow-hidden bg-gradient-to-br from-violet-100 to-purple-200"
            >
                {/* Left Text */}
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

                    {/* Search Bars */}
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

                {/* Banner Image */}
                <div
                    ref={imageWrapperRef}
                    className="absolute right-0 bottom-0 w-[50%] h-[80%] rounded-l-3xl overflow-hidden z-10"
                >
                    <img
                        src="/young-beautiful-brunette-girl-tropical-plants-grey-wall.jpg"
                        alt="Salon model"
                        className="w-full h-full object-cover object-[center_25%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                {/* Providing Services Heading */}
                <h2
                    ref={headingRef}
                    className="absolute top-[35%] left-1/2 -translate-x-1/2 text-5xl md:text-6xl font-bold text-white opacity-0 z-40"
                >
                    Providing Services
                </h2>

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
                            className="backdrop-blur-md bg-white/10 border border-violet-200/40 rounded-2xl px-8 py-6 text-white text-xl font-semibold shadow-lg hover:bg-white/70 hover:text-violet-700 transition-all duration-300"
                        >
                            {service}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

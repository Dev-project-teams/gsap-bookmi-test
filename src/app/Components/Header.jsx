"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const headerRef = useRef(null);

    useEffect(() => {
        // Landing animation
        gsap.fromTo(
            headerRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
        );

        // Scroll background change
        gsap.to(headerRef.current, {
            backgroundColor: "rgba(90, 41, 160, 0.6)",
            backdropFilter: "blur(10px)",
            scrollTrigger: {
                trigger: document.body,
                start: "top+=100 top",
                end: "bottom top",
                toggleActions: "play none none reverse",
            },
        });
    }, []);

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-violet-200/30 shadow-sm transition-all"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
                {/* Left - Logo */}
                <div className="text-2xl md:text-3xl font-extrabold text-black tracking-wide">
                    Bookmi
                </div>

                {/* Center - Empty or Animated Services */}
                <div className="hidden md:flex gap-8 text-black font-medium text-lg relative">
                    {["Hair", "Spa", "Makeup", "Nails", "Massage"].map((item, i) => (
                        <span key={i} className="relative group cursor-pointer">
                            {item}
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300"></span>
                        </span>
                    ))}
                </div>

                {/* Right - Buttons */}
                <div className="flex items-center gap-4">
                    <button className="text-white font-semibold hover:text-violet-200 transition-colors">
                        Login
                    </button>
                    <button className="px-5 py-2 bg-white text-violet-700 rounded-full font-semibold hover:bg-violet-200 transition-all shadow-md">
                        For Partner
                    </button>
                </div>
            </div>
        </header>
    );
}

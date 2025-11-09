"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ReviewSection() {
    const marqueeRef = useRef(null);
    const sectionRef = useRef(null);
    const tweenRef = useRef(null); // store GSAP animation instance

    useEffect(() => {
        const section = sectionRef.current;
        const marquee = marqueeRef.current;

        // Fade in section after hero animation
        gsap.set(section, { opacity: 0, y: 100 });
        gsap.to(section, {
            opacity: 1,
            y: 0,
            delay: 2.5,
            duration: 1.2,
            ease: "power3.out",
        });

        // Start marquee animation after fade-in
        setTimeout(() => {
            const clone = marquee.cloneNode(true);
            marquee.parentElement.appendChild(clone);

            const totalWidth = marquee.scrollWidth;

            // Infinite horizontal scroll
            const tween = gsap.to([marquee, clone], {
                x: `-=${totalWidth}`,
                duration: 60,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
                },
            });

            tweenRef.current = tween;

            // 🟣 Pause on hover anywhere on marquee wrapper
            const wrapper = marquee.parentElement;
            const handleEnter = () => tween.pause();
            const handleLeave = () => tween.resume();

            wrapper.addEventListener("mouseenter", handleEnter);
            wrapper.addEventListener("mouseleave", handleLeave);

            return () => {
                wrapper.removeEventListener("mouseenter", handleEnter);
                wrapper.removeEventListener("mouseleave", handleLeave);
                tween.kill();
            };
        }, 2800);
    }, []);

    const reviews = [
        {
            name: "Aisha Patel",
            review: "Loved the spa experience — calming, classy & worth every penny 🌸",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/75.jpg",
        },
        {
            name: "Rohit Sharma",
            review: "Professional staff & stylish interiors — I’ll definitely book again!",
            rating: 4,
            image: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
            name: "Priya Singh",
            review:
                "Facial & hair spa combo was heavenly 💆‍♀️💜. The staff made me feel pampered from the moment I arrived!",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/32.jpg",
        },
        {
            name: "Simran Kaur",
            review:
                "Incredible nail work! The detailing was next level 💅 and the ambience was top-tier luxury.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        {
            name: "Vikram Das",
            review:
                "Found my go-to salon — super easy booking process, modern UI, and great stylists!",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/64.jpg",
        },
        {
            name: "Sara Khan",
            review:
                "Great value and top-notch stylists. The salon had the perfect relaxing vibe 👏",
            rating: 4,
            image: "https://randomuser.me/api/portraits/women/47.jpg",
        },
        {
            name: "Anjali Verma",
            review:
                "Ambience was so relaxing — my weekend therapy spot 💜 Loved how clean and cozy it was!",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/10.jpg",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-gradient-to-b from-violet-100 to-violet-200 overflow-hidden"
        >
            <h2 className="text-center text-5xl font-extrabold text-violet-900 mb-16 tracking-tight">
                What Our Clients Say 💜
            </h2>

            {/* Horizontal Marquee */}
            <div className="relative py-8 overflow-hidden w-full cursor-pointer">
                <div
                    ref={marqueeRef}
                    className="flex gap-8 w-max items-start"
                    style={{ willChange: "transform" }}
                >
                    {reviews.concat(reviews).map((r, i) => (
                        <div
                            key={i}
                            className={`min-w-[300px] mb-6 max-w-[340px] relative bg-white/40 backdrop-blur-lg border border-violet-300/40 rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500`}
                            style={{
                                transform: `translateY(${(i % 2) * 20}px)`,
                            }}
                        >
                            {/* Floating accent glow */}
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-tr from-violet-400 to-fuchsia-400 rounded-full blur-2xl opacity-50"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-between gap-4">
                                <p className="text-violet-900 text-base leading-relaxed font-medium">
                                    “{r.review}”
                                </p>

                                <div className="flex items-center gap-3 mt-3">
                                    <img
                                        src={r.image}
                                        alt={r.name}
                                        className="w-12 h-12 rounded-full border-2 border-violet-500 object-cover"
                                    />
                                    <div>
                                        <h4 className="text-violet-900 font-semibold text-lg">
                                            {r.name}
                                        </h4>
                                        <div className="flex text-yellow-400 text-sm">
                                            {Array.from({ length: r.rating }).map((_, idx) => (
                                                <span key={idx}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fade edges */}
            <div className="pointer-events-none absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-violet-100 to-transparent"></div>
            <div className="pointer-events-none absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-violet-100 to-transparent"></div>
        </section>
    );
}

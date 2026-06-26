"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang, t } = useLanguage();

  // Counters and staggered entries animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Stagger Team cards
    gsap.from(".team-card", {
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });

    // Counting stats animation
    const counters = document.querySelectorAll(".stat-card .num");
    counters.forEach((counter) => {
      const targetValue = parseInt(counter.getAttribute("data-target"), 10);
      let current = 0;
      const duration = 2000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / targetValue));

      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        onEnter: () => {
          const timer = setInterval(() => {
            current += 1;
            counter.innerText = current + (counter.innerText.includes("+") ? "+" : "");
            if (current >= targetValue) {
              counter.innerText =
                targetValue + (counter.getAttribute("data-target").includes("+") || counter.innerText.includes("+") ? "+" : "");
              clearInterval(timer);
            }
          }, stepTime || 20);
        },
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('/images/hotel_lobby.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{lang === "ur" ? "ہمارے بارے میں" : "About Our Guest House"}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("navAbout")}</span>
          </div>
        </div>
      </header>

      {/* Intro Story & Numerical Stats */}
      <section className="py-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text-block">
              <span className="section-label">{t("introLabel")}</span>
              <h2 className="section-title">{lang === "ur" ? "آرام دہ رہائش کا عزم" : "A Heritage of Comfort"}</h2>
              <p>{t("introDesc1")}</p>
              <p>{t("introDesc2")}</p>
            </div>
            <div className="intro-image-block">
              <div className="intro-image-frame">
                <img src="/images/hotel_lobby.jpg" alt="Lobby view" style={{ aspectRatio: "4/3" }} />
              </div>
            </div>
          </div>

          {/* Animated Statistics */}
          <div className="about-stats">
            <div className="stat-card">
              <span className="num" data-target="5">
                0+
              </span>
              <span className="lbl">{lang === "ur" ? "سالہ تجربہ" : "Years of Service"}</span>
            </div>

            <div className="stat-card">
              <span className="num" data-target="500">
                0+
              </span>
              <span className="lbl">{lang === "ur" ? "خوشگوار قیام" : "Happy Lodging Guests"}</span>
            </div>

            <div className="stat-card">
              <span className="num" data-target="10">
                0
              </span>
              <span className="lbl">{lang === "ur" ? "باکلاس کمرے" : "Luxurious Bedrooms"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Crew Section */}
      <section className="py-section bg-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("testLabel")}</span>
            <h2 className="section-title">{t("featuredTitle")}</h2>
            <p className="section-desc">
              {lang === "ur" ? "مہمانوں کی خدمت کے لیے چوبیس گھنٹے کوشاں ہماری ٹیم" : "The dedicated individuals working day and night behind the scenes to guarantee a premium experience."}
            </p>
          </div>

          <div className="team-grid">
            {/* Manager 1 */}
            <div className="team-card">
              <div className="team-img-wrap">
                <span>👨🏽‍💼</span>
              </div>
              <div className="team-info">
                <h4>{lang === "ur" ? "محمد احسن" : "Muhammad Ahsan"}</h4>
                <p>{lang === "ur" ? "منیجنگ ڈائریکٹر" : "Managing Director"}</p>
              </div>
            </div>

            {/* Manager 2 */}
            <div className="team-card">
              <div className="team-img-wrap">
                <span>👩🏻‍💼</span>
              </div>
              <div className="team-info">
                <h4>{lang === "ur" ? "آمنہ فاروق" : "Amina Farooq"}</h4>
                <p>{lang === "ur" ? "آپریشنز مینیجر" : "Guest Operations Lead"}</p>
              </div>
            </div>

            {/* Manager 3 */}
            <div className="team-card">
              <div className="team-img-wrap">
                <span>👨🏻‍🍳</span>
              </div>
              <div className="team-info">
                <h4>{lang === "ur" ? "شیف ساجد" : "Chef Sajid"}</h4>
                <p>{lang === "ur" ? "ہیڈ شیف" : "Head Executive Chef"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import React from "react";

const themes = [
  { number: "01", title: "AI in Healthcare & Life Sciences", description: "Diagnostics, drug discovery, personalized medicine, hospital management." },
  { number: "02", title: "AI in Finance & Fintech", description: "Risk management, fraud detection, trading, blockchain, AI." },
  { number: "03", title: "AI in Education & Skill Development", description: "Adaptive learning, EdTech, skilling, AI tutors." },
  { number: "04", title: "AI in Manufacturing & Industry 4.0", description: "Smart factories, robotics, supply chain optimization." },
  { number: "05", title: "AI in Government & Public Services", description: "Smart governance, services, citizen analytics." },
  { number: "06", title: "AI in Retail, E-commerce & Consumer Experience", description: "Personalization, chatbots, inventory management." },
  { number: "07", title: "AI in Agriculture & Food Security", description: "Precision farming, crop monitoring, sustainability." },
  { number: "08", title: "AI in Media, Entertainment & Creativity", description: "Generative AI, gaming, content creation, IP solutions." },
  { number: "09", title: "AI in Sustainability & Climate Action", description: "Energy optimization, green tech, disaster prediction." },
  { number: "10", title: "AI in Transport, Mobility & Smart Cities", description: "Autonomous transport, urban planning, traffic management." },
];

function ScaleUpTheme() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Gradient Border */}
      <div
        className="relative overflow-hidden rounded-3xl p-[2px]"
        style={{
          background:
            "linear-gradient(135deg, #4169E1, #9B6FFF, #FF8C42, #FF6B9D)",
        }}
      >
        {/* Inner */}
        <div className="rounded-3xl bg-[#1F1F1F] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          
          {/* Header */}
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-white">
                ScaleUp Conclave 2026
                <br />
                The Theme
              </h2>
              <p className="mt-4 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-gray-300">
                From diagnosing disease to designing cities — ScaleUp 2026 unveils 10 arenas where AI
                is rewriting the rules of human progress.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2">
              <span className="text-lg text-white">✦</span>
              <span className="text-sm font-medium text-white">
                ScaleUp theme
              </span>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
            {themes.map((theme, index) => (
              <div key={index} className="flex items-start gap-4">
                
                {/* Blue bullet dot */}
                <div
                  className="mt-4 flex-shrink-0 rounded-full"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#60A5FA",
                  }}
                />

                {/* Number + Text in one line */}
                <div className="flex gap-3">
                  <span className="text-5xl sm:text-6xl font-bold text-emerald-400 leading-none">
                    {theme.number}
                  </span>

                  <div className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                      {theme.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-gray-400">
                      {theme.description}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default ScaleUpTheme;

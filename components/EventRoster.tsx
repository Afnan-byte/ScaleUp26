"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ScaleupEventRoster — Next.js + Tailwind CSS
// Matches the "05 Scaleup Event roster" section from the design reference.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const events = [
  {
    id: "discussions",
    title: "Discussions",
    description:
      "Engage in panel discussions with experts sharing insights, tackling challenges, and offering actionable ideas to drive growth and innovation.",
    image: "/assets/images/roster1.jpg",
  },
  {
    id: "expert-talks",
    title: "Expert Talks",
    description:
      "Hear from industry leaders sharing practical advice, experiences, and strategies to empower you with knowledge for personal and professional growth.",
    image: "/assets/images/roster1.jpg",
  },
  {
    id: "workshops",
    title: "Workshops",
    description:
      "Join 50+ workshops covering technical skills, creativity, business strategies, and personal development, offering hands-on learning and expert guidance.",
    image: "/assets/images/roster1.jpg",
  },
  {
    id: "startup-jam",
    title: "Startup JAM",
    description:
      "Startup Jam at ScaleUp Conclave 2025 is your chance to showcase your startup, share your journey, and inspire others at Kerala's biggest business event. Don't miss out!",
    image: "/assets/images/roster1.jpg",
  },
  {
    id: "competitions",
    title: "Competitions",
    description:
      "Compete in Business Challenges, Live Pitch Battles, Drone Racing, and Stand-Up Comedy, showcasing creativity and talent for recognition and rewards.",
    image: "/assets/images/roster1.jpg",
  },
  {
    id: "exhibitions",
    title: "Exhibitions",
    description:
      "Explore 50+ stalls showcasing innovations, services, and products. Discover opportunities and connect with industry leaders shaping the future.",
    image: "/assets/images/roster1.jpg",
  },
];

// ─── Badge ────────────────────────────────────────────────────────────────────

function ExxtraBadge() {
  return (
    <div className="absolute top-3 left-3 z-20 bg-black/65 backdrop-blur-sm rounded px-2.5 py-1.5 leading-tight">
      <p className="text-[8px] font-medium text-gray-300 tracking-[0.2em] uppercase">
        EXXTRA
      </p>
      <p className="text-[11px] font-black text-white tracking-[0.15em] uppercase">
        INFORMATION
      </p>
    </div>
  );
}

// ─── Single Card ──────────────────────────────────────────────────────────────

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-72 lg:h-80">
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-10" />

      {/* Badge */}
      <ExxtraBadge />

      {/* Bottom text with gradient background */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-blue-600/85 via-blue-600/55 to-transparent">
        <h3 className="text-white font-black text-2xl leading-tight mb-1.5 drop-shadow-lg">
          {event.title}
        </h3>
        <p className="text-white/90 text-[11.5px] leading-relaxed line-clamp-3 drop-shadow">
          {event.description}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScaleupEventRoster() {
  const topRow = events.slice(0, 4);
  const bottomRow = events.slice(4);

  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-16 py-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 mb-12">
        <div className="flex-shrink-0">
          <p className="text-[88px] font-black leading-none text-gray-900 tracking-tight">
            05
          </p>
          <div className="inline-flex items-center border border-gray-800 rounded-full px-5 py-1.5 mt-1">
            <span className="text-sm font-medium text-gray-800 tracking-wide">
              Scaleup Event roster
            </span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-blue-500 text-xl">✳</span>
            <span className="text-blue-400 text-xl">✦</span>
            <span className="text-blue-600 text-xl">⚑</span>
          </div>
        </div>

        <div className="max-w-xl pt-2 lg:pt-8">
          <p className="text-gray-600 text-base leading-relaxed">
            Discussions, expert talks, workshops, Startup JAM, exhibitions,
            competitions uniting entrepreneurs to learn, collaborate, and grow
            globally together.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topRow.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {bottomRow.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

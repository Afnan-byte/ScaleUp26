"use client";

// ─────────────────────────────────────────────────────────────────────────────
// PartnersSection — Next.js + Tailwind CSS
// Matches the static 4×2 partners grid from the design reference.
// Drop this file into your Next.js project and import it wherever needed.
// ─────────────────────────────────────────────────────────────────────────────

const partners = [
  // Row 1
  {
    id: "profinz",
    logo: (
      <div className="flex items-center gap-2">
        <div className="relative flex items-end">
          {/* Stylised F lettermark */}
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
            <rect x="0" y="4" width="5" height="32" rx="1" fill="#c62828" />
            <rect x="5" y="4" width="18" height="5" rx="1" fill="#c62828" />
            <rect x="5" y="18" width="14" height="5" rx="1" fill="#1565c0" />
          </svg>
        </div>
        <div className="leading-none">
          <p className="text-lg font-black tracking-tight">
            <span className="text-[#1565c0]">PRO</span>
            <span className="text-[#c62828]">FINZ</span>
          </p>
          <p className="text-[8px] tracking-[0.18em] font-semibold text-[#1565c0] mt-0.5">
            CA CMA ACCA CS
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "thara-cart",
    logo: (
      <div className="flex items-center gap-1">
        <span className="text-2xl font-thin tracking-tight text-gray-800 select-none">
          thara cart
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#22c55e"
          className="mb-2"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </div>
    ),
  },
  {
    id: "karikku",
    logo: (
      <div className="flex flex-col items-center">
        {/* Coconut illustration */}
        <div className="relative w-12 h-12 mb-1">
          <div className="absolute inset-0 bg-green-600 rounded-full" />
          {/* fronds */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-green-800 rounded" />
          <div className="absolute top-1 left-1/2 origin-bottom rotate-[40deg] w-5 h-0.5 bg-green-500 rounded" />
          <div className="absolute top-1 left-1/2 origin-bottom -rotate-[40deg] w-5 h-0.5 bg-green-500 rounded" />
          {/* coconut body hint */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-5 bg-yellow-800 rounded-full opacity-60" />
        </div>
        <p className="text-sm font-black tracking-[0.2em] text-gray-900">
          KARIKKU
        </p>
      </div>
    ),
  },
  {
    id: "voxbay",
    logo: (
      <div className="bg-gray-900 px-5 py-2.5 rounded">
        <span className="text-white text-xl tracking-wide select-none">
          vo<span className="font-black">x</span>bay
        </span>
      </div>
    ),
  },

  // Row 2
  {
    id: "shifa",
    logo: (
      <div className="flex items-center gap-2.5">
        {/* Circular emblem */}
        <div className="relative w-10 h-10 flex-shrink-0">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#e91e63"
              strokeWidth="2"
              fill="white"
            />
            <path
              d="M20 10 C14 10 10 14 10 20 C10 26 14 30 20 30"
              stroke="#e91e63"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M20 10 C26 10 30 14 30 20 C30 26 26 30 20 30"
              stroke="#e91e63"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="20" cy="20" r="4" fill="#e91e63" opacity="0.3" />
          </svg>
        </div>
        <div>
          <p className="font-black text-sm text-[#c62828] tracking-widest leading-none">
            SHIFA
          </p>
          <p className="font-bold text-xs text-gray-700 leading-snug tracking-wider">
            FERTILITY
          </p>
          <p className="font-bold text-xs text-gray-700 leading-snug tracking-wider">
            CENTRE
          </p>
          <p className="text-[7.5px] text-gray-400 italic mt-0.5">
            your smile blooms here...
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "fulva",
    logo: (
      <div className="flex items-center gap-2">
        {/* Book icon */}
        <div className="w-9 h-11 bg-green-700 rounded-sm flex items-center justify-center shadow-sm">
          <div className="w-1 h-7 bg-green-900 rounded" />
        </div>
        <div className="leading-none">
          <p className="text-xl font-bold text-gray-800 tracking-wide">
            fulva
            <span className="text-yellow-500 font-black">.</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "haymed",
    logo: (
      <div className="flex items-center gap-2.5">
        {/* Abstract arrow/chevron mark */}
        <div className="flex gap-0.5 items-end">
          <div className="w-3.5 h-9 bg-blue-400 rounded-sm" />
          <div className="w-3.5 h-7 bg-blue-700 rounded-sm" />
        </div>
        <div className="leading-none">
          <p className="font-black text-blue-700 text-base">Haymed</p>
          <p className="font-semibold text-blue-400 text-sm tracking-wide">
            Healthcare
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "dcsmat",
    logo: (
      <div className="flex flex-col items-center gap-1">
        {/* Orange emblem */}
        <div className="w-11 h-11 border-[2.5px] border-orange-500 rounded flex items-center justify-center bg-white">
          <svg viewBox="0 0 32 32" width="24" height="24">
            <path
              d="M16 4 C16 4 8 8 8 16 C8 22 11 26 16 28 C21 26 24 22 24 16 C24 8 16 4 16 4Z"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            />
            <circle cx="16" cy="16" r="4" fill="#f97316" opacity="0.5" />
          </svg>
        </div>
        <p className="text-[10px] font-black tracking-[0.22em] text-gray-800">
          DCSMAT
        </p>
      </div>
    ),
  },
];

// ─── Single partner card ──────────────────────────────────────────────────────
function PartnerCard({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <div className="group flex items-center justify-center h-28 rounded-2xl border  bg-white  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer px-6 py-4">
      <div className="opacity-75 group-hover:opacity-100 transition-opacity duration-300">
        {partner.logo}
      </div>
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function PartnersSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-full h-full"
      >
        <div className="absolute -top-16 left-1/3 w-80 h-80 rounded-full bg-blue-50 blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-sky-50 blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pill label */}
        <div className="flex justify-center mb-14">
          <span className="inline-block border border-b-black rounded-4xl px-10 py-2.5 text-[20px] font-bold tracking-[0.3em] uppercase text-black bg-white ">
            Partners
          </span>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
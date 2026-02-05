"use client";

import Marquee from "react-fast-marquee";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Registration from "./Registration";

export default function DepositMarquee() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsRegisterModalOpen(true);
    window.addEventListener(
      "open-registration-modal",
      handler as EventListener,
    );
    return () =>
      window.removeEventListener(
        "open-registration-modal",
        handler as EventListener,
      );
  }, []);

  return (
    <div className="px-2 md:px-0 py-5">
      <div
        className="w-full  p-2 flex items-center "
        style={{ backgroundColor: "#00D28A", color: "var(--color-black)" }}
      >
        {/* Fixed "button" on the left */}

        {/* Scrolling marquee */}
        <div className="flex-1 overflow-hidden">
          <Marquee gradient={false} speed={50} direction="left">
            <span>
              Registration Started for{" "}
              <span className="">ScaleUp Conclave 2026 – The AI Summit</span>.{" "}
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="ml-1 underline font-semibold text-[#4028c8] hover:text-white-300 transition"
              >
                Book Tickets Now!
              </button>
            </span>
            &nbsp; &nbsp;
            <span>
              Registration Started for{" "}
              <span className="">ScaleUp Conclave 2026 – The AI Summit</span>.{" "}
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="ml-1 underline font-semibold text-[#4028c8] hover:text-white-300 transition"
              >
                Book Tickets Now!
              </button>
            </span>
            &nbsp; &nbsp;
            <span>
              Registration Started for{" "}
              <span className="">ScaleUp Conclave 2026 – The AI Summit</span>.{" "}
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="ml-1 underline font-semibold text-[#4028c8] hover:text-white-300 transition"
              >
                Book Tickets Now!
              </button>
            </span>
            &nbsp; &nbsp;
          </Marquee>
        </div>
      </div>
      <Registration
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}

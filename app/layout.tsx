import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ScaleUp Conclave",
  description: "ScaleUp Conclave - 2026",
  icons: {
    icon: "/favicon.ico",
  },
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-plusJakarta">
        {/* Toast notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  );
}

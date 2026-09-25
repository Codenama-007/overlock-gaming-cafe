import type { Metadata } from "next";
import { Orbitron, Rajdhani, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Overclock Gaming Café — Gaming Café in Virar West",
    template: "%s | Overclock Gaming Café",
  },
  description:
    "Play better. Play faster. Play at Overclock. A premium gaming café in Virar West with ultra fast internet, PS5 consoles, comfy zone, food & drinks and tournaments & events.",
  openGraph: {
    title: "Overclock Gaming Café",
    description:
      "Play better. Play faster. Play at Overclock. Premium gaming café in Virar West.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="oc-background min-h-full flex flex-col">{children}</body>
    </html>
  );
}
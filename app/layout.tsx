import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://typofind.com"),
  title: {
    default: "TypoFind: Official Free Daily Misspelled Words Quiz Game",
    template: "%s | Typofind"
  },
  description:
    "Play TypoFind, a free daily typo quiz game where you find misspelled words, fix spelling mistakes, and test your proofreading skills.",
  keywords: [
    "commonly misspelled words",
    "most misspelled words",
    "misspelled words quiz",
    "daily spelling challenge",
    "Typofind"
  ],
  openGraph: {
    title: "TypoFind: Official Free Daily Misspelled Words Quiz Game",
    description:
      "Play TypoFind, a free daily typo quiz game where you find misspelled words, fix spelling mistakes, and test your proofreading skills.",
    url: "https://typofind.com",
    siteName: "Typofind",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg"
  }
};

const nav = [
  ["Challenge", "/"],
  ["Words", "/commonly-misspelled-words"],
  ["Rankings", "/leaderboard"],
  ["How to Play", "/how-to-play"],
  ["FAQ", "/faq"]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Typofind home">
            <span className="brand-mark">
              <span>T</span>
              <i>f</i>
            </span>
            <span>
              <strong>TypoFind</strong>
              <small>Daily typo quiz</small>
            </span>
          </Link>
          <nav aria-label="Primary navigation">
            {nav.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-brand">
            <span className="brand-mark">
              <span>T</span>
              <i>f</i>
            </span>
            <div>
              <strong>TypoFind</strong>
              <p>Free daily misspelled words quiz for sharper proofreading.</p>
            </div>
          </div>
          <div className="footer-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/how-to-play">How to play</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}

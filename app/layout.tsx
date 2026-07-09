import type { Metadata } from "next";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
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
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileMenu items={nav.map(([label, href]) => ({ label, href }))} />
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/how-to-play">How to play TypoFind</Link>
            <Link href="/commonly-misspelled-words">Commonly misspelled words</Link>
            <Link href="/leaderboard">Leaderboard</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
          <div className="footer-bottom">
            <Link href="/" className="brand-mark footer-brand-mark" aria-label="TypoFind home">
              <span>T</span>
              <i>f</i>
            </Link>
            <p>
              TypoFind - a free daily misspelled words quiz for sharper proofreading.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

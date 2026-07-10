export const metadata = {
  title: "Privacy Policy",
  description: "Read the TypoFind privacy policy for the daily commonly misspelled words quiz, including leaderboard data, local storage, analytics, and privacy choices.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">Policy</span>
        <h1>Privacy Policy</h1>
        <p className="deck">I&apos;m Jay, the independent developer behind TypoFind. This policy explains what information I may collect when you play, submit a score, or browse the word pages.</p>
        <p>Last updated: July 10, 2026</p>

        <h2>Information I collect</h2>
        <p>You can play TypoFind without creating an account. If you submit a leaderboard result, I collect the display name you enter, your score, completion time, challenge date, answer summary, and submission timestamp. I also store basic game statistics, such as which words were missed most often, so the site can show daily typo trends.</p>
        <p>Your light or dark mode preference may be stored in your browser. During local development, leaderboard data may be stored in a local JSON database. In production, leaderboard records may be stored with Supabase.</p>

        <h2>Information collected automatically</h2>
        <p>Like most websites, TypoFind may receive technical information from your browser, including IP address, device type, browser type, pages visited, referrer, and request time. Hosting providers such as Vercel may process logs for security, performance, abuse prevention, and service reliability.</p>

        <h2>Cookies and local storage</h2>
        <p>TypoFind does not require an account cookie to play. The site may use browser storage for preferences, basic session state, and daily quiz behavior. If analytics or abuse-prevention tools are added later, this policy will be updated to describe them.</p>

        <h2>How I use it</h2>
        <p>I use collected information to run the daily quiz, rank signed scores, prevent obvious spam or automated abuse, improve word clues, show commonly missed words, troubleshoot bugs, and keep the service reliable.</p>

        <h2>Public leaderboard data</h2>
        <p>If you submit a score, your display name, score, time, and rank may appear publicly on the daily leaderboard. Please do not enter your full legal name, email address, phone number, or other private information as your display name.</p>

        <h2>Sharing and service providers</h2>
        <p>I do not sell personal information. I may share limited information with service providers that help operate the site, such as hosting, database, security, and analytics providers. Those providers process information according to their own terms and privacy practices.</p>

        <h2>Data retention</h2>
        <p>Leaderboard and quiz statistics may be kept as long as they are useful for the daily challenge, rankings, trend pages, debugging, or abuse prevention. I may remove, anonymize, or reset records when maintaining the game or database.</p>

        <h2>Your choices</h2>
        <p>You can avoid public leaderboard data by playing without submitting a name. You can clear browser storage in your browser settings to remove local preferences. If you need a leaderboard entry removed, email me with enough detail to identify the entry.</p>

        <h2>Children</h2>
        <p>TypoFind is a general-audience spelling game and is not designed to collect personal information from children. If you believe a child submitted personal information, contact me so it can be reviewed.</p>

        <h2>Changes to this policy</h2>
        <p>I may update this privacy policy as TypoFind changes. The updated date at the top of this page shows when the policy was last revised.</p>

        <h2>Contact</h2>
        <p>For privacy questions or removal requests, email <a href="mailto:contact@typofind.com">contact@typofind.com</a>.</p>
      </article>
    </section>
  );
}

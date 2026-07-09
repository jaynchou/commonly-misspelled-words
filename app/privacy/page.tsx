export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the TypoFind privacy policy for the daily commonly misspelled words quiz, including leaderboard data, local storage, analytics, and privacy choices."
};

export default function PrivacyPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">Policy</span>
        <h1>Privacy Policy</h1>
        <p className="deck">
          TypoFind is a free daily commonly misspelled words quiz. This policy explains what information may be
          collected when you play, submit a score, or browse the word pages.
        </p>
        <p>Last updated: July 9, 2026</p>

        <h2>Information we collect</h2>
        <p>
          You can play TypoFind without creating an account. If you submit a leaderboard result, we collect the display
          name you enter, your score, completion time, challenge date, answer summary, and submission timestamp. We also
          store basic game statistics such as which words were missed most often so the site can show daily typo trends.
        </p>
        <p>
          Your light or dark mode preference may be stored in your browser. During local development, leaderboard data
          may be stored in a local JSON database. In production, leaderboard records may be stored with Supabase.
        </p>

        <h2>Information collected automatically</h2>
        <p>
          Like most websites, TypoFind may receive technical information from your browser, including IP address, device
          type, browser type, pages visited, referrer, and request time. Hosting providers such as Vercel may process
          logs for security, performance, abuse prevention, and service reliability.
        </p>

        <h2>Cookies and local storage</h2>
        <p>
          TypoFind does not require an account cookie to play. The site may use browser storage for preferences, basic
          session state, and daily quiz behavior. If analytics or abuse-prevention tools are added later, they may use
          cookies or similar technologies, and this policy should be updated to describe them.
        </p>

        <h2>How we use it</h2>
        <p>
          We use collected information to run the daily quiz, rank signed scores, prevent obvious spam or automated
          abuse, improve word clues, show commonly missed words, troubleshoot bugs, and maintain the security and
          reliability of the service.
        </p>

        <h2>Public leaderboard data</h2>
        <p>
          If you submit a score, your display name, score, time, and rank may appear publicly on the daily leaderboard.
          Do not enter your full legal name, email address, phone number, or other private information as your display
          name.
        </p>

        <h2>Sharing and service providers</h2>
        <p>
          We do not sell personal information. We may share limited information with service providers that help operate
          the site, such as hosting, database, security, and analytics providers. Those providers process information
          according to their own terms and privacy practices.
        </p>

        <h2>Data retention</h2>
        <p>
          Leaderboard and quiz statistics may be kept as long as they are useful for the daily challenge, rankings,
          trend pages, debugging, or abuse prevention. We may remove, anonymize, or reset records when maintaining the
          game or database.
        </p>

        <h2>Your choices</h2>
        <p>
          You can avoid public leaderboard data by playing without submitting a name. You can clear browser storage in
          your browser settings to remove local preferences. If you need a leaderboard entry removed, contact the site
          operator with enough detail to identify the entry.
        </p>

        <h2>Children</h2>
        <p>
          TypoFind is a general-audience spelling game and is not designed to collect personal information from children.
          If you believe a child submitted personal information, contact the site operator so it can be reviewed.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this privacy policy as TypoFind changes. The updated date at the top of this page shows when the
          policy was last revised.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions or removal requests, contact the site operator through TypoFind.com or the contact method
          published with the site.
        </p>
      </article>
    </section>
  );
}

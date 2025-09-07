// src/app/terms/page.tsx

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg1 text-text-primary px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms &amp; Conditions</h1>
        <p className="text-sm text-text-muted mb-8">Last updated: 07/09/2025</p>

        <section className="space-y-6">
          <div>
            <p>
              Welcome to <strong>leetpulse</strong>. By using this app, you
              agree to the following terms:
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Use of Service</h2>
            <p>
              LeetPulse is a productivity tool to help you practice and review
              coding problems. You agree not to misuse the app, attempt to hack
              it, or use it in ways that could harm others.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Accounts</h2>
            <p>
              You are responsible for the security of your account. Don’t share
              your password.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Data &amp; Privacy
            </h2>
            <p>
              We store basic information (like your username, problems added,
              and progress). We don’t sell your data or use shady trackers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Content</h2>
            <p>
              You’re responsible for the problems, notes, or content you add.
              Don’t post illegal or offensive material.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Availability</h2>
            <p>
              We’ll try to keep the app running smoothly, but there may be
              downtime or bugs. No system is perfect.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Liability</h2>
            <p>
              LeetPulse is provided “as is.” We’re not liable for lost data,
              missed coding streaks, or you failing an interview because you
              didn’t review.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Changes</h2>
            <p>
              We may update these terms. Continued use of the app means you
              accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              8. Third-Party References
            </h2>
            <p>
              leetpulse is not affiliated with or endorsed by LeetCode. We only
              use publicly available metadata (problem number, title, and slug)
              from LeetCode to help users map and organize their practice.
              Problem statements and explanations within LeetPulse are original
              and not sourced from LeetCode.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
            <p>
              Questions? Contact us at{" "}
              <span className="text-accent">leetpulse@gmail.com</span>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Terms & Conditions | leetpulse",
  description: "Terms & Conditions of leetpulse",
};

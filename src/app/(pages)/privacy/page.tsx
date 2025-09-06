// src/app/privacy/page.tsx

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg1 text-text-primary px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-text-muted mb-8">Last updated: 06/09/2025</p>

        <section className="space-y-6">
          <div>
            <p>
              At <strong>leetpulse</strong>, we respect your privacy. This
              policy explains what data we collect, why we collect it, and how
              we use it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Data We Collect</h2>
            <p>
              We collect only the data necessary to run the app: your first
              name, username, login info, problems you add, progress, and
              feedback (if you provide it).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Data</h2>
            <p>
              Your data is used to personalize your experience (problem
              tracking, spaced repetition) and improve the app. We don’t sell
              your data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Cookies &amp; Tracking
            </h2>
            <p>
              We don’t use shady trackers or ads. The app may use simple cookies
              or local storage to keep you logged in.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We take reasonable measures to protect your data, but no system is
              100% secure. Keep your login credentials safe.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              5. Third-Party Services
            </h2>
            <p>
              If we integrate with third-party services (like Google login or
              GitHub), their policies apply to your use of those features.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
            <p>
              Your data stays in our system as long as you keep using the app.
              You can request deletion at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Changes</h2>
            <p>
              We may update this policy. Continued use of the app means you
              accept the updated privacy policy.
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

export default function CheckMailPage() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex flex-col p-16 gap-2 rounded-lg items-center">
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-text_muted">
          We’ve sent you a verification link. Please check your inbox.
        </p>
        <p className="text-text_muted">
          You may close this page after email verification.
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Check Mail | leetpulse",
  description:
    "Verify your email address to access your leetpulse account and continue using the app.",
};

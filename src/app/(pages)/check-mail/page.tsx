export default function CheckMailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-bg1 flex flex-col p-16 border-2 border-bg2 gap-2 rounded-lg">
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

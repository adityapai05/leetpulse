export default function Layout({ children }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(at_top_left,var(--bg-0),var(--bg-1))]">
      {children}
    </main>
  );
}

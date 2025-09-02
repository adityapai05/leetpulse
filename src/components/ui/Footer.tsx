export default function Footer() {
  return (
    <footer className="flex flex-row gap-4 justify-center items-center text-sm text-text_muted">
      <div>&copy; {new Date().getFullYear()}, leetpulse</div>
    </footer>
  );
}

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center px-4 py-2 justify-end">
        <div>
          <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-secondary">
            <span className="font-medium text-primary">GI</span>
          </div>
        </div>
        <div className="flex items-center gap-2"></div>
      </nav>
    </header>
  );
}

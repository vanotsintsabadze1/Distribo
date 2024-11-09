export default function loading() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-t-secondary" />
      <p className="text-xs font-medium uppercase tracking-wider text-secondary">Loading..</p>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 py-4 px-8 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <span className="text-xs tracking-[5px] uppercase font-bold text-white">Admin Panel — COOL</span>
        <div className="h-px w-12 bg-white/20" />
      </nav>
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}
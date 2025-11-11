export default function Layout({ children }) {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">{children}</div>
    </main>
  );
}

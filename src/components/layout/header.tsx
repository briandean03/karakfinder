import Link from 'next/link';
import { Music2 } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Music2 className="h-6 w-6" />
          <span>Karak Finder</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/djs" className="text-sm font-medium hover:underline">
            Browse DJs
          </Link>
          <Link
            href="/request-event"
            className="text-sm font-medium hover:underline"
          >
            Request DJ
          </Link>
        </nav>
      </div>
    </header>
  );
}

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Sun, Moon, ChevronRight } from 'lucide-react';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ sidebarOpen, setSidebarOpen, theme, toggleTheme }: NavbarProps) {
  const pathname = usePathname();
  const getBreadcrumbs = () => {
    if (pathname === '/') return ['Dashboard'];
    const segments = pathname.split('/').filter(Boolean);
    return segments.map(segment => {
      return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] px-6 backdrop-blur-md transition-all duration-300">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-1.5 text-neutral-450 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-white/5 hover:text-neutral-800 dark:hover:text-neutral-200 lg:hidden transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1.5 text-xs font-semibold">
          <span className="text-neutral-450 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors cursor-default">Platform</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="h-3.5 w-3.5 text-neutral-300 dark:text-neutral-700 shrink-0" />
              <span className={idx === breadcrumbs.length - 1 ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/10' : 'text-neutral-650 dark:text-neutral-400'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <div className="flex h-9 items-center gap-1 rounded-xl bg-[var(--pill-bg)] p-1 border border-[var(--card-border)]">
          <button 
            onClick={() => { if (theme !== 'dark') toggleTheme(); }}
            className={`rounded-lg p-1.5 transition-all ${theme === 'dark' ? 'text-indigo-400 bg-[var(--background)] shadow-sm border border-[var(--card-border)]' : 'text-neutral-550 hover:text-neutral-700'}`}
            title="Switch to Dark Mode"
          >
            <Moon className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={() => { if (theme !== 'light') toggleTheme(); }}
            className={`rounded-lg p-1.5 transition-all ${theme === 'light' ? 'text-indigo-600 bg-[var(--background)] shadow-sm border border-[var(--card-border)]' : 'text-neutral-500 hover:text-neutral-350'}`}
            title="Switch to Light Mode"
          >
            <Sun className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Project badge */}
        <div className="hidden md:block border-l border-[var(--navbar-border)] pl-4 text-right">
          <p className="text-xs font-bold text-[var(--foreground)] opacity-95">ROSPL Lab</p>
          <p className="text-[9px] font-semibold text-[var(--text-muted)] tracking-wider">MINI PROJECT</p>
        </div>
      </div>
    </header>
  );
}

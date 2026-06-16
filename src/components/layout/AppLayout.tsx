import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full z-30 transition-transform duration-300 lg:static lg:translate-x-0 lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 overflow-auto min-w-0" style={{ background: 'var(--color-bg)' }}>
        <div
          className="flex items-center gap-3 px-4 py-3 lg:hidden sticky top-0 z-10"
          style={{
            background: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text)' }}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div
              style={{ background: 'var(--color-accent)' }}
              className="w-6 h-6 rounded-md flex items-center justify-center"
            >
              <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>M</span>
            </div>
            <span className="font-display font-bold text-sm" style={{ color: 'var(--color-text)' }}>
              MovieHub
            </span>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
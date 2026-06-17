import { NavLink } from 'react-router-dom';
import { Home, Star, TrendingUp, Calendar, Film, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/popular', label: 'Popular', icon: TrendingUp },
  { to: '/top-rated', label: 'Top Rated', icon: Star },
  { to: '/upcoming', label: 'Upcoming', icon: Calendar },
];

interface Props {
  onClose?: () => void;
}

export function Sidebar({ onClose }: Props) {
  return (
    <aside
      style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
      className="w-56 h-screen sticky top-0 flex flex-col flex-shrink-0"
    >
      <div className="p-5 flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            style={{ background: 'var(--color-accent)' }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
          >
            <Film size={18} color="white" />
          </div>
          <span className="font-display font-bold text-lg" style={{ color: 'var(--color-text)' }}>
            MovieHub
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-muted)' }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all ${
                isActive ? 'text-white' : 'hover:opacity-80'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--color-accent)' : 'transparent',
              color: isActive ? 'white' : 'var(--color-muted)',
            })}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          Powered by TMDB
        </p>
      </div>
    </aside>
  );
}
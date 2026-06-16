import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  viewAllTo?: string;
}

export function SectionHeader({ title, viewAllTo }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-display font-semibold text-base" style={{ color: 'var(--color-text)' }}>
        {title}
      </h2>
      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="flex items-center gap-0.5 text-xs font-medium transition-opacity hover:opacity-80"
          style={{ color: 'var(--color-accent)' }}
        >
          View all <ChevronRight size={13} />
        </Link>
      )}
    </div>
  );
}

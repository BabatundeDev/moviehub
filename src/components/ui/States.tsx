import { AlertCircle, Film } from 'lucide-react';

export function ErrorState({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <AlertCircle size={32} style={{ color: 'var(--color-muted)' }} />
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
        {message}
      </p>
    </div>
  );
}

export function EmptyState({ message = 'No movies found.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Film size={32} style={{ color: 'var(--color-muted)' }} />
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
        {message}
      </p>
    </div>
  );
}

import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 3 }) {
  if (type === 'stats') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl space-y-3 border-slate-800">
            <div className="w-10 h-10 rounded-2xl skeleton-shimmer mx-auto" />
            <div className="h-8 w-24 skeleton-shimmer rounded-xl mx-auto" />
            <div className="h-3 w-28 skeleton-shimmer rounded mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="glass-panel rounded-3xl border-slate-800 p-6 space-y-4">
        <div className="h-6 w-48 skeleton-shimmer rounded-xl mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-full skeleton-shimmer rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="glass-card p-6 rounded-3xl space-y-4 border-slate-800">
          <div className="h-44 w-full skeleton-shimmer rounded-2xl" />
          <div className="h-5 w-3/4 skeleton-shimmer rounded-lg" />
          <div className="h-4 w-full skeleton-shimmer rounded-lg" />
          <div className="h-4 w-2/3 skeleton-shimmer rounded-lg" />
        </div>
      ))}
    </div>
  );
}

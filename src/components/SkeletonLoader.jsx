import React from 'react';
import './SkeletonLoader.css';

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-shimmer" />
      <div className="skeleton-image" />
      <div className="skeleton-title" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  );
};

export const SkeletonGrid = ({ count = 3, className = "" }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

import React from 'react';
import './SkeletonLoader.css';

function SkeletonLoader({ type = 'chapter' }) {
  if (type === 'image') {
    return <div className="skeleton-image"></div>;
  }

  return (
    <div className="skeleton-chapter">
      <div className="skeleton-banner"></div>
      <div className="skeleton-content">
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
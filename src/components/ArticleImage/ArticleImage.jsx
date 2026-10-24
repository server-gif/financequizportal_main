import { useState } from 'react';
import './ArticleImage.css';

const FALLBACK = '/images/fallback.svg';

/**
 * Responsive image with a fixed aspect ratio box (no layout shift),
 * object-fit: cover, lazy loading by default and a graceful fallback.
 */
export default function ArticleImage(props) {
  // Keying on src resets loading/fallback state when the image changes.
  return <ImageFrame key={props.src} {...props} />;
}

function ImageFrame({ src, alt, ratio = '16 / 9', priority = false, className = '' }) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`article-image ${loaded ? 'is-loaded' : ''} ${className}`.trim()} style={{ aspectRatio: ratio }}>
      <img
        src={current}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        width="1200"
        height="675"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (current !== FALLBACK) setCurrent(FALLBACK);
        }}
      />
    </div>
  );
}

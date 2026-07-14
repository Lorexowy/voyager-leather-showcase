'use client';

import { useEffect, useState } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'error';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function ProductImage({ src, alt, className = '', fallback }: ProductImageProps) {
  const [status, setStatus] = useState<ImageStatus>('loading');

  useEffect(() => {
    setStatus('loading');
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {status === 'loading' && (
        <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
      )}

      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}

      {status === 'error' && fallback}
    </div>
  );
}

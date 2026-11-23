import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ChantierPhoto } from '../data/siteData';

interface GalleryGridProps {
  photos: ChantierPhoto[];
  ariaLabel?: string;
}

export function GalleryGrid({ photos, ariaLabel = 'Galerie de chantiers' }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : Math.min(photos.length - 1, prev + 1)
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === null ? null : Math.max(0, prev - 1)));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="galerie" role="region" aria-label={ariaLabel}>
        {photos.map((photo, index) => (
          <figure
            key={`${photo.src}-${index}`}
            tabIndex={0}
            role="button"
            aria-label={`Agrandir : ${photo.legende}`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(index);
              }
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <figcaption>{photo.legende}</figcaption>
          </figure>
        ))}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          className="visionneuse"
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse photo"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="visionneuse__fermer"
            aria-label="Fermer la visionneuse"
            onClick={() => setActiveIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            className="visionneuse__nav"
            aria-label="Photo précédente"
            disabled={activeIndex === 0}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) => (prev === null ? null : Math.max(0, prev - 1)));
            }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <figure className="visionneuse__figure" onClick={(e) => e.stopPropagation()}>
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={activePhoto.width}
              height={activePhoto.height}
              referrerPolicy="no-referrer"
            />
            <figcaption>{activePhoto.legende}</figcaption>
          </figure>

          <button
            type="button"
            className="visionneuse__nav"
            aria-label="Photo suivante"
            disabled={activeIndex === photos.length - 1}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) =>
                prev === null ? null : Math.min(photos.length - 1, prev + 1)
              );
            }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          <p className="visionneuse__compte tabular-nums">
            {activeIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}

import { PointerEvent, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(4, Math.min(96, Math.round(pct * 10) / 10)));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Allow keyboard range slider interaction without conflict
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <figure className="comparer">
      <div
        ref={containerRef}
        className="comparer__vue"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src="/assets/source/entretien-chaudiere-avant.png"
          alt="Corps de chauffe encrassé avant entretien complet par ETS Chipeaux"
          width={876}
          height={913}
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        <div
          className="comparer__apres"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <img
            src="/assets/source/entretien-chaudiere-apres.png"
            alt="Corps de chauffe nettoyé et réglé après entretien par ETS Chipeaux"
            width={876}
            height={913}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <span className="comparer__etq comparer__etq--avant">Avant</span>
        <span className="comparer__etq comparer__etq--apres">Après</span>

        <div
          className="comparer__trait"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <div className="comparer__poignee">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        <input
          type="range"
          min={4}
          max={96}
          step={1}
          value={Math.round(position)}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="comparer__curseur"
          aria-label="Comparer l'état du corps de chauffe avant et après entretien"
        />
      </div>

      <figcaption className="comparer__legende">
        <b>Entretien d&apos;une chaudière — avant et après</b>
        <span>
          Démontage complet, décrassage du corps de chauffe, contrôle du brûleur et mesure de
          combustion. Déplacez le curseur pour comparer.
        </span>
      </figcaption>
    </figure>
  );
}

import { useEffect, useRef, useState } from 'react';

export function SavoirFaireShowcase() {
  const stage1Ref = useRef<HTMLElement>(null);
  const stage2Ref = useRef<HTMLElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const stage1TextRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const [video1Ready, setVideo1Ready] = useState(false);
  const [video2Ready, setVideo2Ready] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<Record<string, boolean>>({
    atelier: true,
    step1: true,
    step2: false,
    step3: false,
  });

  // Listen to viewport breakpoint and prefers-reduced-motion changes
  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setVideo2Ready(false);
    };
    const onMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mqMobile.addEventListener('change', onMobileChange);
    mqMotion.addEventListener('change', onMotionChange);
    return () => {
      mqMobile.removeEventListener('change', onMobileChange);
      mqMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Ensure only ONE video plays at a time based on viewport visibility
  useEffect(() => {
    if (reducedMotion) {
      video1Ref.current?.pause();
      video2Ref.current?.pause();
      return;
    }

    const ratios = { s1: 0, s2: 0 };

    const syncPlayback = () => {
      const v1 = video1Ref.current;
      const v2 = video2Ref.current;
      if (ratios.s1 === 0 && ratios.s2 === 0) {
        v1?.pause();
        v2?.pause();
        return;
      }
      if (ratios.s2 >= ratios.s1) {
        v1?.pause();
        if (v2 && v2.paused) {
          v2.play().catch(() => {});
        }
      } else {
        v2?.pause();
        if (v1 && v1.paused) {
          v1.play().catch(() => {});
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === stage1Ref.current) {
            ratios.s1 = entry.isIntersecting ? entry.intersectionRatio : 0;
          } else if (entry.target === stage2Ref.current) {
            ratios.s2 = entry.isIntersecting ? entry.intersectionRatio : 0;
          }
        }
        syncPlayback();
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85] }
    );

    if (stage1Ref.current) observer.observe(stage1Ref.current);
    if (stage2Ref.current) observer.observe(stage2Ref.current);

    return () => observer.disconnect();
  }, [reducedMotion, isMobile]);

  // Ensure cached videos immediately reveal instead of waiting for late events
  useEffect(() => {
    if (reducedMotion) return;
    if (video1Ref.current && video1Ref.current.readyState >= 2) {
      setVideo1Ready(true);
    }
    if (video2Ref.current && video2Ref.current.readyState >= 2) {
      setVideo2Ready(true);
    }
  }, [reducedMotion, isMobile]);

  // Smooth scroll fade-in for text blocks over video
  useEffect(() => {
    if (reducedMotion) {
      setVisibleSteps({ atelier: true, step1: true, step2: true, step3: true });
      return;
    }

    const items: Array<{ key: string; el: HTMLElement | null }> = [
      { key: 'atelier', el: stage1TextRef.current },
      { key: 'step1', el: step1Ref.current },
      { key: 'step2', el: step2Ref.current },
      { key: 'step3', el: step3Ref.current },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset.stepKey;
            if (key) {
              setVisibleSteps((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
            }
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach(({ el }) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div className="sf-wrapper" id="savoir-faire">
      {/* =================================================================
          VIDÉO 1 : EN ATELIER — Préfabrication d'un module de tuyauterie
          Plein écran bord à bord (100svh sous l'en-tête fixe)
          ================================================================= */}
      <section ref={stage1Ref} className="sf-stage" aria-label="En atelier — Préfabrication d'un module de tuyauterie">
        <div className="sf-sticky-bg">
          <img
            src="/assets/poster-atelier.jpg"
            alt="Atelier ETS Chipeaux — levage et assemblage d'un module de tuyauterie"
            className="sf-poster sf-poster--atelier"
            referrerPolicy="no-referrer"
          />

          {!reducedMotion && (
            <video
              ref={video1Ref}
              className={`sf-video sf-video--atelier ${video1Ready ? 'sf-video--ready' : ''}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/poster-atelier.jpg"
              onLoadedData={() => setVideo1Ready(true)}
              onCanPlay={() => setVideo1Ready(true)}
              onPlaying={() => setVideo1Ready(true)}
              aria-hidden="true"
            >
              <source src="/assets/video/atelier-module.mp4" type="video/mp4" />
              <source src="/assets/video/atelier-module.webm" type="video/webm" />
            </video>
          )}

          <div className="sf-scrim" aria-hidden="true" />

          <div className="sf-caption">
            <div className="conteneur">
              <p>Atelier ETS Chipeaux — levage et assemblage d&apos;un module de tuyauterie.</p>
            </div>
          </div>
        </div>

        <div className="sf-track">
          <div className="sf-step">
            <div className="conteneur">
              <div
                ref={stage1TextRef}
                data-step-key="atelier"
                className={`sf-text-block sf-fade ${visibleSteps.atelier ? 'sf-fade--visible' : ''}`}
              >
                <p className="sf-surtitre">En atelier</p>
                <h2 className="sf-title">Préfabrication d&apos;un module de tuyauterie</h2>
                <p className="sf-body">
                  Assemblage d&apos;un module en atelier avant livraison sur site : préparation,
                  soudure et contrôle, puis levage au pont roulant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sf-seam" aria-hidden="true" />

      {/* =================================================================
          VIDÉO 2 : SAVOIR-FAIRE — Le savoir-faire, notre priorité
          Plein écran bord à bord (100svh), texte progressif en fondu au scroll
          ================================================================= */}
      <section ref={stage2Ref} className="sf-stage" aria-label="Savoir-faire — Le savoir-faire, notre priorité">
        <div className="sf-sticky-bg">
          <img
            src={
              isMobile
                ? '/assets/poster-savoir-faire-mobile.jpg'
                : '/assets/poster-savoir-faire-pc.jpg'
            }
            alt="Atelier ETS Chipeaux — ébavurage d'un tronçon de tuyauterie industrielle avant assemblage"
            className="sf-poster sf-poster--savoir"
            referrerPolicy="no-referrer"
          />

          {!reducedMotion && (
            <video
              key={isMobile ? 'mobile' : 'desktop'}
              ref={video2Ref}
              className={`sf-video sf-video--savoir ${video2Ready ? 'sf-video--ready' : ''}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={
                isMobile
                  ? '/assets/poster-savoir-faire-mobile.jpg'
                  : '/assets/poster-savoir-faire-pc.jpg'
              }
              onLoadedData={() => setVideo2Ready(true)}
              onCanPlay={() => setVideo2Ready(true)}
              onPlaying={() => setVideo2Ready(true)}
              aria-hidden="true"
            >
              {isMobile ? (
                <>
                  <source src="/assets/video/savoir-faire-mobile.mp4" type="video/mp4" />
                  <source src="/assets/video/savoir-faire-mobile.webm" type="video/webm" />
                </>
              ) : (
                <>
                  <source src="/assets/video/savoir-faire-pc.mp4" type="video/mp4" />
                  <source src="/assets/video/savoir-faire-pc.webm" type="video/webm" />
                </>
              )}
            </video>
          )}

          <div className="sf-scrim" aria-hidden="true" />

          <div className="sf-caption">
            <div className="conteneur">
              <p>
                Atelier ETS Chipeaux — ébavurage d&apos;un tronçon de tuyauterie industrielle avant
                assemblage.
              </p>
            </div>
          </div>
        </div>

        <div className="sf-track">
          {/* Étape 1 : Titre + Premier paragraphe */}
          <div className="sf-step">
            <div className="conteneur">
              <div
                ref={step1Ref}
                data-step-key="step1"
                className={`sf-text-block sf-fade ${visibleSteps.step1 ? 'sf-fade--visible' : ''}`}
              >
                <p className="sf-surtitre">Savoir-faire</p>
                <h2 className="sf-title">Le savoir-faire, notre priorité</h2>
                <p className="sf-body">
                  Chez ETS Chipeaux, le savoir-faire est essentiel. Un réseau de tuyauterie tient
                  d&apos;abord à la qualité de la préparation : débit, chanfreinage, ébavurage et
                  ajustage sont réalisés à la main, dans notre atelier, avant tout assemblage.
                </p>
              </div>
            </div>
          </div>

          {/* Étape 2 : Deuxième paragraphe en fondu pendant le défilement */}
          <div className="sf-step sf-step--follow">
            <div className="conteneur">
              <div
                ref={step2Ref}
                data-step-key="step2"
                className={`sf-text-block sf-fade ${visibleSteps.step2 ? 'sf-fade--visible' : ''}`}
              >
                <p className="sf-body">
                  <strong>Le savoir-faire, c&apos;est ce qui fait la différence.</strong> Une soudure
                  propre, un chanfrein régulier, un serrage maîtrisé : ces gestes ne se voient pas
                  une fois l&apos;installation en service, mais ce sont eux qui garantissent
                  l&apos;étanchéité, la durabilité et la sécurité d&apos;un réseau de fluides.
                </p>
              </div>
            </div>
          </div>

          {/* Étape 3 : Troisième paragraphe en fondu avant reprise sur fond blanc */}
          <div className="sf-step sf-step--follow sf-step--last">
            <div className="conteneur">
              <div
                ref={step3Ref}
                data-step-key="step3"
                className={`sf-text-block sf-fade ${visibleSteps.step3 ? 'sf-fade--visible' : ''}`}
              >
                <p className="sf-body">
                  C&apos;est pourquoi nous formons nos équipes à l&apos;atelier avant de les envoyer
                  sur site, et pourquoi nous contrôlons chaque module avant son départ. Le
                  savoir-faire d&apos;ETS Chipeaux, c&apos;est un travail fait par des professionnels,
                  contrôlé à chaque étape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

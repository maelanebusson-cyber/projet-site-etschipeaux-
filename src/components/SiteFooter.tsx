import { useEffect, useState } from 'react';
import { Mail, Phone, X } from 'lucide-react';
import { ETS_CONFIG, PageId, SERVICES } from '../data/siteData';
import { BrandLogo } from './BrandLogo';

interface SiteFooterProps {
  onNavigate: (page: PageId, preselectService?: string) => void;
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  const [legalOpen, setLegalOpen] = useState(false);

  useEffect(() => {
    if (!legalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLegalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [legalOpen]);

  return (
    <>
      <footer className="pied" id="pied-contact">
        <div className="conteneur">
          <div className="pied__grille">
            <div>
              <button
                type="button"
                className="marque"
                aria-label="ETS Chipeaux, retour à l'accueil"
                onClick={() => onNavigate('accueil')}
              >
                <BrandLogo className="logo" />
              </button>
              <p className="pied__accroche">
                Chauffage, sanitaire, climatisation, ventilation et tuyauterie industrielle —
                particuliers, professionnels et industriels.
              </p>
              <div className="pied__reseaux">
                <a href={ETS_CONFIG.telHref} aria-label="Appeler ETS Chipeaux">
                  <Phone className="w-4 h-4" />
                </a>
                <a href={ETS_CONFIG.mailHref} aria-label="Écrire un e-mail à ETS Chipeaux">
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={ETS_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram ETS Chipeaux"
                >
                  {ETS_CONFIG.instagramHandle}
                </a>
              </div>
            </div>

            <nav aria-label="Nos services">
              <h2>Nos services</h2>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="pied__btn"
                      onClick={() => onNavigate(s.pageId)}
                    >
                      {s.nom}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Liens utiles">
              <h2>Liens utiles</h2>
              <ul>
                <li>
                  <button
                    type="button"
                    className="pied__btn"
                    onClick={() => onNavigate('realisations')}
                  >
                    Nos réalisations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="pied__btn"
                    onClick={() => onNavigate('service-industriel')}
                  >
                    Notre savoir-faire
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="pied__btn"
                    onClick={() => onNavigate('rendez-vous')}
                  >
                    Demander un devis
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="pied__btn"
                    onClick={() => onNavigate('contact')}
                  >
                    Nous joindre
                  </button>
                </li>
              </ul>
            </nav>

            <div>
              <h2>Contact</h2>
              <ul>
                <li>
                  <a href={ETS_CONFIG.telHref} className="tabular-nums">
                    {ETS_CONFIG.tel}
                  </a>{' '}
                  — 7j/7, dépannage
                </li>
                <li>
                  <a href={ETS_CONFIG.mailHref}>{ETS_CONFIG.email}</a>
                </li>
                <li>
                  <a href={ETS_CONFIG.instagram} target="_blank" rel="noopener noreferrer">
                    {ETS_CONFIG.instagramHandle}
                  </a>
                </li>
                <li>{ETS_CONFIG.secteur}</li>
              </ul>
            </div>
          </div>

          <div className="pied__bas">
            <span>© {new Date().getFullYear()} ETS Chipeaux — Tous droits réservés.</span>
            <ul>
              <li>
                <button
                  type="button"
                  className="pied__btn"
                  onClick={() => setLegalOpen(true)}
                >
                  Mentions légales
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="pied__btn"
                  onClick={() => onNavigate('contact')}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="pied__btn"
                  onClick={() => onNavigate('rendez-vous')}
                >
                  Devis gratuit
                </button>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {legalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mentions légales"
          className="fixed inset-0 z-[330] flex items-center justify-center p-4 bg-[#12151F]/65"
          onClick={() => setLegalOpen(false)}
        >
          <div
            className="bg-white border border-[#E5E5E8] max-w-lg w-full p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E5E5E8]">
              <h3 className="text-xl text-[#12151F]">Mentions légales — ETS Chipeaux</h3>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setLegalOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-[#E5E5E8] text-[#12151F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-4 text-sm text-[#2B3038] space-y-2.5">
              <p>
                <strong>Dénomination :</strong> {ETS_CONFIG.nom}
              </p>
              <p>
                <strong>Responsable / Gérant :</strong> {ETS_CONFIG.responsable}
              </p>
              <p>
                <strong>Siège social :</strong> {ETS_CONFIG.adresse}
              </p>
              <p className="tabular-nums">
                <strong>SIRET :</strong> {ETS_CONFIG.siret} · <strong>Code APE :</strong>{' '}
                {ETS_CONFIG.ape}
              </p>
              <p>
                <strong>Téléphone :</strong> {ETS_CONFIG.tel} · <strong>E-mail :</strong>{' '}
                {ETS_CONFIG.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ALL_PHOTOS, ETS_CONFIG, PageId, ServiceId } from '../data/siteData';
import { GalleryGrid } from './GalleryGrid';

interface RealisationsPageProps {
  onNavigate: (page: PageId, preselectService?: string) => void;
}

type FilterValue = 'tous' | ServiceId;

const FILTERS: Array<{ id: FilterValue; label: string }> = [
  { id: 'tous', label: 'Tous les chantiers' },
  { id: 'chauffage', label: 'Chauffage' },
  { id: 'climatisation', label: 'Climatisation' },
  { id: 'sanitaire', label: 'Plomberie & sanitaire' },
  { id: 'industriel', label: 'Tuyauterie industrielle' },
  { id: 'entretien', label: 'Entretien' },
];

export function RealisationsPage({ onNavigate }: RealisationsPageProps) {
  const [filter, setFilter] = useState<FilterValue>('tous');

  const photos =
    filter === 'tous' ? ALL_PHOTOS : ALL_PHOTOS.filter((p) => p.serviceId === filter);

  return (
    <main id="contenu">
      <div className="fil">
        <div className="conteneur">
          <ol>
            <li>
              <button type="button" onClick={() => onNavigate('accueil')}>
                Accueil
              </button>
            </li>
            <li aria-current="page">Réalisations</li>
          </ol>
        </div>
      </div>

      <section className="service-entete">
        <div className="conteneur">
          <div className="service-entete__grille">
            <div>
              <p className="surtitre surtitre--orange">Sur le terrain</p>
              <h1>Nos réalisations</h1>
            </div>
            <p className="chapeau">
              Pompes à chaleur, planchers chauffants, climatisations réversibles, installations
              sanitaires et préfabrication de tuyauterie industrielle en atelier.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-5 border-t border-[#E5E5E8]"
            role="tablist"
            aria-label="Filtrer par métier"
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`bg-transparent border-0 pb-2 text-sm cursor-pointer transition-colors border-b-2 ${
                    active
                      ? 'text-[#2A3387] font-semibold border-[#F0412B]'
                      : 'text-[#6E7381] border-transparent hover:text-[#12151F]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="conteneur">
          <GalleryGrid photos={photos} ariaLabel="Galerie des chantiers ETS Chipeaux" />
        </div>
      </section>

      <section className="appel">
        <div className="appel__in conteneur">
          <div>
            <h2>Un projet similaire à étudier ?</h2>
            <p>
              Nous intervenons pour les particuliers, professionnels et industriels dans le pays de
              Montbéliard.
            </p>
          </div>
          <div className="groupe-btn">
            <a className="appel__tel tabular-nums" href={ETS_CONFIG.telHref}>
              {ETS_CONFIG.tel}
            </a>
            <button
              type="button"
              className="btn btn--principal btn--grand"
              onClick={() => onNavigate('rendez-vous')}
            >
              <span>Demander un devis</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

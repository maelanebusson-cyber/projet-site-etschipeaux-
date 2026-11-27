import { Phone } from 'lucide-react';
import { ALL_PHOTOS, ETS_CONFIG, PageId, SERVICES, ServiceItem } from '../data/siteData';
import { GalleryGrid } from './GalleryGrid';
import { SavoirFaireShowcase } from './SavoirFaireShowcase';

interface ServicePageProps {
  service: ServiceItem;
  onNavigate: (page: PageId, preselectService?: string) => void;
}

export function ServicePage({ service, onNavigate }: ServicePageProps) {
  const servicePhotos = ALL_PHOTOS.filter((photo) => photo.serviceId === service.id);
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  return (
    <main id="contenu">
      {/* Fil d'Ariane */}
      <div className="fil">
        <div className="conteneur">
          <ol>
            <li>
              <button type="button" onClick={() => onNavigate('accueil')}>
                Accueil
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('services')}>
                Services
              </button>
            </li>
            <li aria-current="page">{service.nom}</li>
          </ol>
        </div>
      </div>

      {/* En-tête du service */}
      <section className="service-entete" id="prestations">
        <div className="conteneur">
          <div className="service-entete__grille">
            <div>
              <p className="surtitre surtitre--orange">
                {service.num} — {service.nom}
              </p>
              <h1>{service.titre}</h1>
            </div>
            <p className="chapeau">{service.texte}</p>
          </div>
        </div>
      </section>

      {/* Ce que nous réalisons */}
      <section className="section">
        <div className="conteneur">
          <div className={service.heroPhoto ? 'service-bloc' : ''}>
            <div className={!service.heroPhoto ? 'max-w-3xl' : undefined}>
              <h2>Ce que nous réalisons</h2>
              <ul className="puces mt-2">
                {service.prestations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="note">{service.note}</p>
              <div className="groupe-btn">
                <button
                  type="button"
                  className="btn btn--principal btn--grand"
                  onClick={() => onNavigate('rendez-vous', service.nom)}
                >
                  Demander un devis
                </button>
                <a className="btn btn--ligne" href={ETS_CONFIG.telHref}>
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>

            {service.heroPhoto && (
              <figure className="service-bloc__media">
                <img
                  src={service.heroPhoto}
                  alt={service.heroAlt || service.nom}
                  width={768}
                  height={1024}
                  style={service.heroPosition ? { objectPosition: service.heroPosition } : undefined}
                  referrerPolicy="no-referrer"
                />
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* Galerie photos du service */}
      {servicePhotos.length > 0 && (
        <section className="section" id="realisations">
          <div className="conteneur">
            <div className="bloc-titre bloc-titre--serre">
              <div className="bloc-titre__grille">
                <div>
                  <p className="surtitre">Sur le terrain</p>
                  <h2>Nos chantiers</h2>
                </div>
              </div>
            </div>

            <GalleryGrid photos={servicePhotos} ariaLabel={`Chantiers ${service.nom}`} />
          </div>
        </section>
      )}

      {/* En atelier + Savoir-faire plein écran (uniquement sur service-industriel) */}
      {service.id === 'industriel' && <SavoirFaireShowcase />}

      {/* FAQ du service & autres services */}
      <section className="section bg-white" id={`faq-${service.id}`}>
        <div className="conteneur">
          {service.faq.length > 0 && (
            <>
              <div className="bloc-titre bloc-titre--serre">
                <div className="bloc-titre__grille">
                  <div>
                    <p className="surtitre">Questions fréquentes</p>
                    <h2>À propos de : {service.nom.toLowerCase()}</h2>
                  </div>
                </div>
              </div>

              <div className="faq-min">
                {service.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <div className="faq-min__reponse">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </>
          )}

          <nav className="mt-4" aria-label="Autres services">
            <p className="surtitre">Autres services</p>
            <ul className="zone-liste">
              {otherServices.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(s.pageId)}
                    className="text-[#2A3387] hover:text-[#F0412B] transition-colors bg-transparent border-0 p-0 font-inherit cursor-pointer"
                  >
                    {s.nom}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="appel">
        <div className="appel__in conteneur">
          <div>
            <h2>Un projet en {service.nom.toLowerCase()} ?</h2>
            <p>Devis gratuit et sans engagement. Intervention rapide dans le pays de Montbéliard.</p>
          </div>
          <div className="groupe-btn">
            <a className="appel__tel tabular-nums" href={ETS_CONFIG.telHref}>
              {ETS_CONFIG.tel}
            </a>
            <button
              type="button"
              className="btn btn--principal btn--grand"
              onClick={() => onNavigate('rendez-vous', service.nom)}
            >
              Demander un devis
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

import { ArrowRight, Phone } from 'lucide-react';
import { ETS_CONFIG, PageId, SERVICES } from '../data/siteData';

interface ServicesIndexPageProps {
  onNavigate: (page: PageId, preselectService?: string) => void;
}

export function ServicesIndexPage({ onNavigate }: ServicesIndexPageProps) {
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
            <li aria-current="page">Services</li>
          </ol>
        </div>
      </div>

      <section className="service-entete">
        <div className="conteneur">
          <div className="service-entete__grille">
            <div>
              <p className="surtitre surtitre--orange">Prestations</p>
              <h1>Nos services</h1>
            </div>
            <p className="chapeau">
              Chauffage, climatisation, plomberie sanitaire, ventilation, tuyauterie industrielle et
              entretien 7j/7 dans le pays de Montbéliard.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="conteneur">
          <div className="prestations">
            {SERVICES.map((service) => (
              <article key={service.id} className="prestation">
                <span className="prestation__num" aria-hidden="true">
                  {service.num}
                </span>
                <div>
                  <h2 className="prestation__titre">{service.nom}</h2>
                </div>
                <div>
                  <p className="prestation__texte">{service.resume}</p>
                  <p className="text-sm text-[#6E7381] mb-0">{service.phrase}</p>
                </div>
                <div className="prestation__lien">
                  <button
                    type="button"
                    className="lien-fleche"
                    onClick={() => onNavigate(service.pageId)}
                  >
                    Voir la page
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="appel">
        <div className="appel__in conteneur">
          <div>
            <h2>Besoin d&apos;un devis ou d&apos;un conseil technique ?</h2>
            <p>Nous étudions votre projet sur place gratuitement dans le pays de Montbéliard.</p>
          </div>
          <div className="groupe-btn">
            <a className="appel__tel tabular-nums" href={ETS_CONFIG.telHref}>
              <Phone className="inline w-6 h-6 mr-2" aria-hidden="true" />
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

import { ArrowRight, ExternalLink, Mail, Phone } from 'lucide-react';
import { ETS_CONFIG, PageId } from '../data/siteData';

interface ContactPageProps {
  onNavigate: (page: PageId, preselectService?: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
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
            <li aria-current="page">Contact</li>
          </ol>
        </div>
      </div>

      <section className="service-entete">
        <div className="conteneur">
          <div className="service-entete__grille">
            <div>
              <p className="surtitre surtitre--orange">Contact</p>
              <h1>Nous joindre</h1>
            </div>
            <p className="chapeau">
              Par téléphone pour un dépannage ou une demande urgente, par mail pour un devis écrit,
              ou via le formulaire de rendez-vous.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="conteneur">
          <ul className="voies">
            <li className="voie">
              <span className="voie__icone" aria-hidden="true">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <h2 className="voie__titre">Téléphone — Dépannage 7j/7</h2>
                <p className="voie__texte">
                  Pour un dépannage urgent, une prise de rendez-vous ou un renseignement technique.
                </p>
              </div>
              <a className="voie__lien tabular-nums" href={ETS_CONFIG.telHref}>
                <span>{ETS_CONFIG.tel}</span>
              </a>
            </li>

            <li className="voie">
              <span className="voie__icone" aria-hidden="true">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <h2 className="voie__titre">E-mail</h2>
                <p className="voie__texte">
                  Pour transmettre des plans, photos de votre installation ou demander un devis.
                </p>
              </div>
              <a className="voie__lien" href={ETS_CONFIG.mailHref}>
                <span>{ETS_CONFIG.email}</span>
              </a>
            </li>

            <li className="voie">
              <span className="voie__icone" aria-hidden="true">
                <ExternalLink className="w-5 h-5" />
              </span>
              <div>
                <h2 className="voie__titre">Instagram</h2>
                <p className="voie__texte">
                  Suivez nos chantiers récents et l&apos;actualité de l&apos;atelier.
                </p>
              </div>
              <a
                className="voie__lien"
                href={ETS_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{ETS_CONFIG.instagramHandle}</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="conteneur">
          <div className="grille-2">
            <div>
              <p className="surtitre">Localisation</p>
              <h2>Siège &amp; atelier</h2>
              <p className="chapeau mt-2">
                <strong>{ETS_CONFIG.nom}</strong> — {ETS_CONFIG.responsable}
              </p>
              <p className="text-[#2B3038] mt-2">{ETS_CONFIG.adresse}</p>
              <p className="text-sm text-[#6E7381] mt-3 tabular-nums">
                SIRET {ETS_CONFIG.siret} · Code APE {ETS_CONFIG.ape}
              </p>
            </div>

            <div>
              <p className="surtitre">Zone d&apos;intervention</p>
              <h2>Pays de Montbéliard &amp; alentours</h2>
              <p className="text-[#6E7381] mt-2">
                {ETS_CONFIG.secteur}, pour les particuliers comme pour les sites professionnels et
                industriels.
              </p>
              <ul className="zone-liste">
                {ETS_CONFIG.communes.map((ville) => (
                  <li key={ville}>{ville}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="appel">
        <div className="appel__in conteneur">
          <div>
            <h2>Un devis gratuit ?</h2>
            <p>Planifiez votre visite technique ou décrivez-nous votre installation en ligne.</p>
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
              <span>Prendre rendez-vous</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

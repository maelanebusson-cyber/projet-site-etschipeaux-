import { ArrowDown, ArrowRight, Phone } from 'lucide-react';
import {
  ALL_PHOTOS,
  ETS_CONFIG,
  HOME_AVIS,
  HOME_ETAPES,
  HOME_FAQ,
  HOME_PREVIEW_FILES,
  MARQUES,
  PageId,
  SERVICES,
} from '../data/siteData';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { GalleryGrid } from './GalleryGrid';

interface HomePageProps {
  onNavigate: (page: PageId, preselectService?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const previewPhotos = HOME_PREVIEW_FILES.map((fileName) =>
    ALL_PHOTOS.find((p) => p.src.endsWith(fileName))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="contenu">
      {/* 1. HÉROS */}
      <section className="heros">
        <div className="conteneur">
          <div className="heros__grille">
            <div className="heros__texte-bloc">
              <p className="surtitre surtitre--orange">Pays de Montbéliard · Bart (25)</p>
              <h1>Chauffage, climatisation, sanitaire &amp; tuyauterie industrielle.</h1>
              <p className="heros__texte">
                Installation, entretien et dépannage 7j/7 pour les particuliers, les professionnels
                et les sites industriels du pays de Montbéliard.
              </p>
              <div className="heros__actions groupe-btn">
                <button
                  type="button"
                  className="btn btn--principal btn--grand"
                  onClick={() => onNavigate('rendez-vous')}
                >
                  Demander un devis gratuit
                </button>
                <a className="btn btn--ligne" href={ETS_CONFIG.telHref}>
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="tabular-nums">{ETS_CONFIG.tel}</span>
                </a>
                <button
                  type="button"
                  className="btn btn--ligne"
                  onClick={scrollToServices}
                >
                  <span>Nos prestations</span>
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <figure className="heros__photo">
              <img
                src="/assets/chantiers/chauffage-pompe-chaleur-bosch.jpg"
                alt="Installation d'une pompe à chaleur Bosch par ETS Chipeaux"
                width={768}
                height={1024}
                referrerPolicy="no-referrer"
              />
            </figure>
          </div>

          <ul className="atouts mt-4">
            <li>
              <b>Réactivité &amp; dépannage 7j/7</b>
              <span>
                Intervention rapide dans tout le pays de Montbéliard, y compris en urgence.
              </span>
            </li>
            <li>
              <b>Devis gratuit et détaillé</b>
              <span>
                Étude technique sur site et proposition claire avant tout démarrage des travaux.
              </span>
            </li>
            <li>
              <b>Particuliers &amp; sites industriels</b>
              <span>
                Maison individuelle, locaux tertiaires, plateformes logistiques et ateliers.
              </span>
            </li>
            <li>
              <b>Savoir-faire en atelier</b>
              <span>
                Préfabrication, soudure et contrôle rigoureux de chaque réseau avant pose.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. NOS SERVICES */}
      <section className="section" id="services">
        <div className="conteneur">
          <div className="bloc-titre">
            <div className="bloc-titre__grille">
              <div>
                <p className="surtitre">Nos métiers</p>
                <h2>Six domaines d&apos;intervention</h2>
              </div>
              <p className="chapeau">
                Du remplacement d&apos;une chaudière individuelle à la préfabrication de réseaux de
                fluides industriels, un seul interlocuteur suit votre installation de l&apos;étude à
                la mise en service.
              </p>
            </div>
          </div>

          <div className="prestations">
            {SERVICES.map((service) => (
              <article key={service.id} className="prestation">
                <span className="prestation__num" aria-hidden="true">
                  {service.num}
                </span>
                <div>
                  <h3 className="prestation__titre">{service.nom}</h3>
                </div>
                <div>
                  <p className="prestation__texte">{service.resume}</p>
                </div>
                <div className="prestation__lien">
                  <button
                    type="button"
                    className="lien-fleche"
                    onClick={() => onNavigate(service.pageId)}
                  >
                    Découvrir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPARATEUR AVANT / APRÈS */}
      <section className="section">
        <div className="conteneur">
          <div className="bloc-titre bloc-titre--serre">
            <div className="bloc-titre__grille">
              <div>
                <p className="surtitre">Entretien complet</p>
                <h2>L&apos;entretien fait la différence</h2>
              </div>
              <p className="chapeau">
                Une chaudière entretenue chaque année consomme moins, chauffe mieux et évite les
                pannes en plein hiver. Faites glisser le curseur pour voir le résultat d&apos;un
                nettoyage complet.
              </p>
            </div>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* 4. APERÇU RÉALISATIONS */}
      <section className="section">
        <div className="conteneur">
          <div className="bloc-titre bloc-titre--serre">
            <div className="bloc-titre__grille">
              <div>
                <p className="surtitre">Sur le terrain</p>
                <h2>Quelques chantiers récents</h2>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p className="chapeau mb-0">
                  Pompes à chaleur, planchers chauffants, climatisation et tuyauterie en atelier.
                </p>
                <button
                  type="button"
                  className="lien-fleche"
                  onClick={() => onNavigate('realisations')}
                >
                  Toutes les réalisations
                </button>
              </div>
            </div>
          </div>

          <GalleryGrid photos={previewPhotos} ariaLabel="Aperçu de nos réalisations" />
        </div>
      </section>

      {/* 5. MARQUES PARTENAIRES */}
      <section className="section" aria-label="Marques installées">
        <div className="conteneur">
          <p className="surtitre">Équipements &amp; marques installées</p>
          <ul className="marques-ligne">
            {MARQUES.map((m) => (
              <li key={m.nom}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Site officiel ${m.nom}`}
                >
                  {m.logo ? (
                    <img src={m.logo} alt={m.nom} loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <span>{m.nom}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. NOTRE MÉTHODE EN 4 ÉTAPES */}
      <section className="section">
        <div className="conteneur">
          <div className="bloc-titre bloc-titre--serre">
            <div className="bloc-titre__grille">
              <div>
                <p className="surtitre">Notre méthode</p>
                <h2>Un projet mené étape par étape</h2>
              </div>
            </div>
          </div>

          <ol className="etapes-edito">
            {HOME_ETAPES.map((etape) => (
              <li key={etape.num} className="etape-edito">
                <span className="etape-edito__num" aria-hidden="true">
                  {etape.num}
                </span>
                <h3>{etape.titre}</h3>
                <p>{etape.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. AVIS CLIENTS */}
      <section className="section">
        <div className="conteneur">
          <div className="bloc-titre bloc-titre--serre">
            <div className="bloc-titre__grille">
              <div>
                <p className="surtitre">Retours clients</p>
                <h2>Ils nous font confiance</h2>
              </div>
            </div>
          </div>

          <div className="avis-edito">
            {HOME_AVIS.map((avis) => (
              <blockquote key={avis.auteur}>
                <span className="avis-edito__etoiles" aria-label="5 étoiles sur 5">
                  ★★★★★
                </span>
                <p>« {avis.texte} »</p>
                <cite>{avis.auteur}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ & ZONE D'INTERVENTION */}
      <section className="section">
        <div className="conteneur">
          <div className="bloc-titre bloc-titre--serre">
            <div className="bloc-titre__grille">
              <div>
                <p className="surtitre">Questions fréquentes</p>
                <h2>Vos questions, nos réponses</h2>
              </div>
            </div>
          </div>

          <div className="faq-min">
            {HOME_FAQ.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <div className="faq-min__reponse">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-4">
            <p className="surtitre">Zone d&apos;intervention</p>
            <p className="chapeau">
              Basés à Bart, nous intervenons dans tout le pays de Montbéliard et ses communes
              alentour :
            </p>
            <ul className="zone-liste">
              {ETS_CONFIG.communes.map((ville) => (
                <li key={ville}>{ville}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. APPEL À L'ACTION */}
      <section className="appel">
        <div className="appel__in conteneur">
          <div>
            <h2>Un projet ou un dépannage urgent ?</h2>
            <p>
              Devis gratuit et sans engagement. Réponse rapide pour vos installations et dépannages
              7j/7.
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
              <span>Prendre rendez-vous</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

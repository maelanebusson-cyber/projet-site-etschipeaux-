import { FormEvent, useEffect, useState } from 'react';
import { Check, Phone } from 'lucide-react';
import { ETS_CONFIG, PageId } from '../data/siteData';

interface RendezVousPageProps {
  preselectedService?: string;
  onNavigate: (page: PageId) => void;
}

const SERVICE_OPTIONS = [
  'Chauffage',
  'Climatisation',
  'Plomberie & sanitaire',
  'Ventilation',
  'Tuyauterie industrielle',
  'Entretien & dépannage',
  'Autre demande',
];

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '19078c47-4d90-4a66-ae22-e46a08be3db7';

function isValidFrenchPhone(value: string): boolean {
  const cleaned = value.replace(/[\s.-]/g, '');
  return /^(?:(?:\+|00)33|0)[1-9]\d{8}$/.test(cleaned);
}

export function RendezVousPage({ preselectedService, onNavigate }: RendezVousPageProps) {
  const [nom, setNom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [ville, setVille] = useState('');
  const [clientType, setClientType] = useState('Particulier');
  const [service, setService] = useState(
    preselectedService && SERVICE_OPTIONS.includes(preselectedService)
      ? preselectedService
      : 'Chauffage'
  );
  const [creneau, setCreneau] = useState('En journée (8h – 18h)');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [botcheck, setBotcheck] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService && SERVICE_OPTIONS.includes(preselectedService)) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);

    if (!nom.trim()) {
      setErrorMsg('Merci d’indiquer votre nom et prénom.');
      return;
    }
    if (!isValidFrenchPhone(tel)) {
      setErrorMsg('Merci d’indiquer un numéro de téléphone français valide (ex. 06 12 34 56 78).');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('L’adresse e-mail saisie semble invalide.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Merci de décrire brièvement votre besoin ou la panne rencontrée.');
      return;
    }
    if (!consent) {
      setErrorMsg('Merci d’accepter d’être recontacté au sujet de votre demande.');
      return;
    }

    // Honeypot anti-spam : si rempli par un robot, on simule le succès sans envoyer
    if (botcheck) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Record<string, string | boolean> = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nouvelle demande de RDV — ${service} (${nom.trim()})`,
        from_name: 'Site ETS Chipeaux',
        'Nom et prénom': nom.trim(),
        'Téléphone': tel.trim(),
        'E-mail': email.trim() || 'Non renseigné',
        'Ville ou commune': ville.trim() || 'Non précisée',
        'Profil': clientType,
        'Domaine concerné': service,
        'Disponibilité souhaitée': creneau,
        'Description': message.trim(),
        botcheck: false,
      };
      if (email.trim()) {
        payload.replyto = email.trim();
      }

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "L'envoi automatique a échoué.");
      }

      setSubmitted(true);
    } catch {
      setErrorMsg(
        `Impossible d’envoyer la demande pour le moment. Merci d’appeler directement le ${ETS_CONFIG.tel} ou d’écrire à ${ETS_CONFIG.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <li aria-current="page">Rendez-vous</li>
          </ol>
        </div>
      </div>

      <section className="service-entete">
        <div className="conteneur">
          <div className="service-entete__grille">
            <div>
              <p className="surtitre surtitre--orange">Rendez-vous</p>
              <h1>Demander un devis ou un rendez-vous.</h1>
            </div>
            <p className="chapeau">
              Particulier ou professionnel ? Décrivez votre besoin et choisissez le créneau qui
              vous convient : nous vous rappelons rapidement pour fixer l&apos;intervention.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="conteneur">
          <div className="grille-2">
            <div className="formulaire">
              <h2>Votre demande</h2>
              <p className="chapeau">
                Les champs marqués d&apos;une étoile <span className="requis">*</span> sont
                nécessaires pour vous recontacter.
              </p>

              {submitted ? (
                <div className="mt-6 border-l-2 border-[#2A3387] pl-5 py-2 space-y-3">
                  <div className="flex items-center gap-2 text-[#2A3387] font-semibold">
                    <Check className="w-5 h-5" aria-hidden="true" />
                    <span>Demande envoyée avec succès</span>
                  </div>
                  <p className="text-[#2B3038]">
                    Merci <strong>{nom}</strong>. Votre demande concernant «{' '}
                    <strong>{service}</strong> » ({creneau}) a bien été transmise par e-mail à
                    ETS Chipeaux.
                  </p>
                  <p className="text-sm text-[#525866]">
                    Thomas Chipeaux vous recontactera au{' '}
                    <strong className="tabular-nums">{tel}</strong>. Pour toute urgence immédiate,
                    vous pouvez également appeler directement le{' '}
                    <a href={ETS_CONFIG.telHref} className="font-semibold underline">
                      {ETS_CONFIG.tel}
                    </a>
                    .
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="btn btn--principal"
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                        setErrorMsg(null);
                      }}
                    >
                      Envoyer une autre demande
                    </button>
                    <a href={ETS_CONFIG.telHref} className="btn btn--ligne">
                      Appeler le {ETS_CONFIG.tel}
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <input
                    type="text"
                    name="botcheck"
                    value={botcheck}
                    onChange={(e) => setBotcheck(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="visually-hidden"
                  />
                  {errorMsg && (
                    <div
                      role="alert"
                      className="mt-4 p-4 border-l-2 border-[#F0412B] bg-[#FFF5F4] text-sm text-[#12151F]"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="formulaire__grille">
                    <div className="champ">
                      <label htmlFor="rdv-nom">
                        Nom et prénom <span className="requis">*</span>
                      </label>
                      <input
                        id="rdv-nom"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Ex. Marc Dupont"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </div>

                    <div className="champ">
                      <label htmlFor="rdv-tel">
                        Téléphone <span className="requis">*</span>
                      </label>
                      <input
                        id="rdv-tel"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="06 00 00 00 00"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                      />
                    </div>

                    <div className="champ">
                      <label htmlFor="rdv-email">E-mail</label>
                      <input
                        id="rdv-email"
                        type="email"
                        autoComplete="email"
                        placeholder="vous@exemple.fr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="champ">
                      <label htmlFor="rdv-ville">Ville ou commune</label>
                      <input
                        id="rdv-ville"
                        type="text"
                        placeholder="Ex. Bart, Montbéliard, Audincourt…"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                      />
                    </div>

                    <div className="champ">
                      <label htmlFor="rdv-client">Vous êtes</label>
                      <select
                        id="rdv-client"
                        value={clientType}
                        onChange={(e) => setClientType(e.target.value)}
                      >
                        <option value="Particulier">Particulier</option>
                        <option value="Professionnel / Collectivité">
                          Professionnel / Collectivité
                        </option>
                        <option value="Site industriel">Site industriel</option>
                      </select>
                    </div>

                    <div className="champ">
                      <label htmlFor="rdv-service">Domaine concerné</label>
                      <select
                        id="rdv-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="champ champ--plein">
                      <label htmlFor="rdv-creneau">Disponibilité souhaitée</label>
                      <select
                        id="rdv-creneau"
                        value={creneau}
                        onChange={(e) => setCreneau(e.target.value)}
                      >
                        <option value="En journée (8h – 18h)">En journée (8h – 18h)</option>
                        <option value="En début de matinée">En début de matinée</option>
                        <option value="Fin de journée / hors heures de bureau">
                          Fin de journée / hors heures de bureau
                        </option>
                        <option value="Urgence / dépannage">Urgence / dépannage</option>
                      </select>
                      <span className="aide">
                        Nous nous adaptons à vos contraintes horaires lorsque cela est possible.
                      </span>
                    </div>

                    <div className="champ champ--plein">
                      <label htmlFor="rdv-message">
                        Description de votre projet ou panne <span className="requis">*</span>
                      </label>
                      <textarea
                        id="rdv-message"
                        required
                        placeholder="Précisez votre installation actuelle, la surface approximative ou les symptômes constatés…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <div className="champ champ--plein">
                      <label className="case">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                        />
                        <span>
                          J&apos;accepte d&apos;être recontacté par ETS Chipeaux par téléphone ou
                          e-mail au sujet de cette demande.
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn--principal btn--grand"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                  </button>
                </form>
              )}
            </div>

            <aside aria-label="Coordonnées directes" className="space-y-8">
              <div className="border-t border-[#E5E5E8] pt-6">
                <p className="surtitre">Ligne directe · 7j/7</p>
                <h3>Besoin d&apos;une réponse immédiate ?</h3>
                <p className="text-sm text-[#6E7381] mt-2">
                  Pour un dépannage urgent ou un renseignement technique rapide, appelez directement
                  l&apos;entreprise.
                </p>
                <a
                  href={ETS_CONFIG.telHref}
                  className="inline-flex items-center gap-2.5 mt-3 text-xl font-semibold text-[#2A3387] hover:text-[#F0412B] tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#F0412B]" aria-hidden="true" />
                  <span>{ETS_CONFIG.tel}</span>
                </a>
              </div>

              <div className="border-t border-[#E5E5E8] pt-6">
                <p className="surtitre">Par écrit</p>
                <p className="text-sm text-[#2B3038]">
                  <strong>E-mail :</strong>{' '}
                  <a href={ETS_CONFIG.mailHref} className="underline">
                    {ETS_CONFIG.email}
                  </a>
                </p>
                <p className="text-sm text-[#2B3038] mt-2">
                  <strong>Atelier / siège :</strong> {ETS_CONFIG.adresse}
                </p>
              </div>

              <div className="border-t border-[#E5E5E8] pt-6">
                <p className="surtitre">Secteur</p>
                <p className="text-sm text-[#6E7381]">{ETS_CONFIG.secteur}</p>
                <ul className="zone-liste">
                  {ETS_CONFIG.communes.map((villeItem) => (
                    <li key={villeItem}>{villeItem}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

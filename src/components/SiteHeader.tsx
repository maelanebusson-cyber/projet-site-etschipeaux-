import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { ETS_CONFIG, PageId, SERVICES } from '../data/siteData';
import { BrandLogo } from './BrandLogo';

interface SiteHeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, preselectService?: string) => void;
}

export function SiteHeader({ currentPage, onNavigate }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const barreRef = useRef<HTMLDivElement>(null);

  const activeService = SERVICES.find((s) => s.pageId === currentPage);
  const isServicesSection = currentPage === 'services' || Boolean(activeService);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (servicesOpen && barreRef.current && !barreRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [servicesOpen]);

  const navigate = (page: PageId, preselect?: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    onNavigate(page, preselect);
  };

  return (
    <>
      <a className="saut-contenu" href="#contenu">
        Aller au contenu principal
      </a>

      {/* Bandeau supérieur */}
      <div className="bandeau">
        <div className="bandeau__in">
          <span>{ETS_CONFIG.secteur}</span>
          <span className="bandeau__droite">
            <span className="bandeau__urg">Dépannage 7j/7</span>
          </span>
        </div>
      </div>

      {/* En-tête fixe */}
      <header className="entete" id="entete">
        <div className="entete__in">
          <button
            type="button"
            className="marque"
            data-header-logo="true"
            aria-label="ETS Chipeaux, retour à l'accueil"
            onClick={() => navigate('accueil')}
          >
            <BrandLogo className="logo" />
          </button>

          <nav
            className={`nav ${menuOpen ? 'nav--ouvert' : ''}`}
            id="nav-principal"
            aria-label="Navigation principale"
          >
            <button
              type="button"
              className="nav__link"
              aria-current={currentPage === 'accueil' ? 'page' : undefined}
              onClick={() => navigate('accueil')}
            >
              Accueil
            </button>
            <button
              type="button"
              className="nav__link"
              aria-current={isServicesSection ? 'page' : undefined}
              onClick={() => navigate('services')}
            >
              Services
            </button>
            <button
              type="button"
              className="nav__link"
              aria-current={currentPage === 'realisations' ? 'page' : undefined}
              onClick={() => navigate('realisations')}
            >
              Réalisations
            </button>
            <button
              type="button"
              className="nav__link"
              aria-current={currentPage === 'rendez-vous' ? 'page' : undefined}
              onClick={() => navigate('rendez-vous', activeService?.nom)}
            >
              Rendez-vous
            </button>
            <button
              type="button"
              className="nav__link"
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              onClick={() => navigate('contact')}
            >
              Contact
            </button>
            <a className="nav__tel" href={ETS_CONFIG.telHref}>
              <Phone className="w-3.5 h-3.5 text-[#F0412B]" aria-hidden="true" />
              <span className="tabular-nums">{ETS_CONFIG.tel}</span>
            </a>
          </nav>

          <button
            className="burger"
            type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-principal"
            onClick={() => {
              setServicesOpen(false);
              setMenuOpen((prev) => !prev);
            }}
          >
            <span />
          </button>
        </div>
      </header>

      {/* Barre « Nos services » sous l'en-tête */}
      <div
        ref={barreRef}
        className={`barre ${servicesOpen ? 'barre--ouvert' : ''}`}
        id="barre"
      >
        <div className="barre__in">
          <button
            className="barre__btn"
            id="barre-btn"
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="barre-panneau"
            onClick={() => {
              setMenuOpen(false);
              setServicesOpen((prev) => !prev);
            }}
          >
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#F0412B] transition-transform duration-300 ${
                servicesOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
            <span>Nos services</span>
          </button>
          <span className="barre__courant">
            {activeService
              ? `${activeService.num} — ${activeService.nom}`
              : "6 domaines d'intervention"}
          </span>
        </div>

        <div className="barre__panneau" id="barre-panneau">
          <div className="conteneur">
            <ul className="barre__liste">
              {SERVICES.map((s) => (
                <li
                  key={s.id}
                  className={`barre__item ${
                    currentPage === s.pageId ? 'barre__item--actif' : ''
                  }`}
                >
                  <button type="button" onClick={() => navigate(s.pageId)}>
                    <span className="barre__num" aria-hidden="true">
                      {s.num}
                    </span>
                    <span>
                      <span className="barre__nom">{s.nom}</span>
                      <span className="barre__phrase">{s.phrase}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

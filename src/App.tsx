/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { PageId, SERVICES } from './data/siteData';
import { SiteHeader } from './components/SiteHeader';
import { HomePage } from './components/HomePage';
import { ServicesIndexPage } from './components/ServicesIndexPage';
import { ServicePage } from './components/ServicePage';
import { RealisationsPage } from './components/RealisationsPage';
import { RendezVousPage } from './components/RendezVousPage';
import { ContactPage } from './components/ContactPage';
import { SiteFooter } from './components/SiteFooter';
import { AssistantWidget } from './components/AssistantWidget';

const VALID_PAGES = new Set<PageId>([
  'accueil',
  'services',
  'service-chauffage',
  'service-climatisation',
  'service-sanitaire',
  'service-ventilation',
  'service-industriel',
  'service-entretien',
  'realisations',
  'rendez-vous',
  'contact',
]);

function readPageFromHash(): PageId {
  if (typeof window === 'undefined') return 'accueil';
  const raw = window.location.hash.replace(/^#\/?/, '').trim() as PageId;
  return VALID_PAGES.has(raw) ? raw : 'accueil';
}

function getDocumentTitle(page: PageId): string {
  if (page === 'service-industriel') {
    return 'Tuyauterie industrielle & Savoir-faire — ETS Chipeaux';
  }
  if (page === 'accueil') {
    return 'ETS Chipeaux — Chauffage, climatisation, sanitaire & tuyauterie industrielle | Montbéliard';
  }
  if (page === 'services') return 'Nos services — ETS Chipeaux';
  if (page === 'realisations') return 'Nos réalisations — ETS Chipeaux';
  if (page === 'rendez-vous') return 'Prendre rendez-vous & devis gratuit — ETS Chipeaux';
  if (page === 'contact') return 'Contact — ETS Chipeaux';
  const matchedService = SERVICES.find((s) => s.pageId === page);
  if (matchedService) {
    return `${matchedService.nom} — ETS Chipeaux`;
  }
  return 'ETS Chipeaux';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => readPageFromHash());
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = getDocumentTitle(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const onHashChange = () => {
      const nextPage = readPageFromHash();
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = useCallback((page: PageId, preselect?: string) => {
    if (preselect !== undefined) {
      setPreselectedService(preselect);
    } else if (page !== 'rendez-vous') {
      setPreselectedService(undefined);
    }

    setCurrentPage(page);
    const targetHash = `#${page}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const currentService = SERVICES.find((s) => s.pageId === currentPage);

  return (
    <>
      <SiteHeader currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'accueil' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'services' && <ServicesIndexPage onNavigate={handleNavigate} />}
      {currentService && <ServicePage service={currentService} onNavigate={handleNavigate} />}
      {currentPage === 'realisations' && <RealisationsPage onNavigate={handleNavigate} />}
      {currentPage === 'rendez-vous' && (
        <RendezVousPage preselectedService={preselectedService} onNavigate={handleNavigate} />
      )}
      {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}

      <SiteFooter onNavigate={handleNavigate} />
      <AssistantWidget onNavigate={handleNavigate} />
    </>
  );
}

import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { ETS_CONFIG, PageId } from '../data/siteData';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

interface AssistantWidgetProps {
  onNavigate?: (page: PageId, preselectService?: string) => void;
}

const SUGGESTIONS = [
  'Intervenez-vous en tuyauterie industrielle ?',
  'Intervenez-vous dans mon secteur ?',
  'Comment obtenir un devis gratuit ?',
  'Ma chaudière affiche une pression basse',
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getAssistantReply(raw: string): string {
  const q = normalizeText(raw);

  if (/(odeur|sent|fuite).{0,18}gaz|oeuf pourri|soufre/.test(q)) {
    return `Sécurité d'abord : aérez immédiatement, coupez l'arrivée de gaz si possible sans forcer, n'actionnez aucun interrupteur, sortez du logement et appelez GRDF au 0 800 47 33 33 (ou les pompiers au 18 / 112). Contactez ensuite ETS Chipeaux au ${ETS_CONFIG.tel}.`;
  }

  if (/monoxyde|intoxication|maux de tete|nausee|vertige|fumee|brule/.test(q)) {
    return `Sécurité d'abord : aérez immédiatement, arrêtez les appareils à combustion, évacuez les locaux et appelez les secours (15, 18 ou 112). Ne rallumez pas l'appareil avant contrôle par un professionnel (${ETS_CONFIG.tel}).`;
  }

  if (/industriel|tuyauterie|process|atelier|soudure|prefabri/.test(q)) {
    return `ETS Chipeaux réalise la préfabrication en atelier, le façonnage, l'ébavurage, la soudure et la pose sur site de réseaux de tuyauterie industrielle et de fluides (chauffage, eau glacée, process). Pour une étude technique : ${ETS_CONFIG.tel}.`;
  }

  if (/secteur|commune|montbeliard|bart|sochaux|audincourt|belfort|zone|ou interven/.test(q)) {
    return `Basée à Bart (25420), l'entreprise intervient dans tout le Pays de Montbéliard (${ETS_CONFIG.communes.slice(0, 8).join(', ')}…) et au-delà selon les chantiers.`;
  }

  if (/devis|rendez vous|rdv|prix|tarif|contacter|telephone|mail/.test(q)) {
    return `Les devis sont gratuits et sans engagement. Vous pouvez remplir le formulaire Rendez-vous ou appeler directement Thomas Chipeaux au ${ETS_CONFIG.tel} (dépannage 7j/7) ou écrire à ${ETS_CONFIG.email}.`;
  }

  if (/pression|chaudiere|radiateur|froid|fuite|clim|panne|entretien/.test(q)) {
    return `Nous assurons l'entretien annuel et le dépannage 7j/7 sur chaudières, pompes à chaleur, climatisations et réseaux sanitaires. Pour un diagnostic rapide ou une intervention : ${ETS_CONFIG.tel}.`;
  }

  return `Je peux vous renseigner sur nos prestations (chauffage, climatisation, sanitaire, ventilation, tuyauterie industrielle, dépannage 7j/7) et notre secteur autour de Montbéliard. Pour une réponse précise sur votre installation, appelez directement le ${ETS_CONFIG.tel}.`;
}

export function AssistantWidget({ onNavigate }: AssistantWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      text: 'Bonjour. Je suis l’assistant ETS Chipeaux. Comment puis-je vous aider concernant nos travaux ou dépannages ?',
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const sendQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    const reply = getAssistantReply(trimmed);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'bot', text: reply },
    ]);
    setInput('');
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <div className="assistant">
      {open && (
        <div
          className="assistant__panneau"
          role="dialog"
          aria-label="Assistant ETS Chipeaux"
        >
          <div className="assistant__entete">
            <div>
              <b>Assistant Chipeaux</b>
              <span>Pays de Montbéliard · 7j/7</span>
            </div>
            <button
              type="button"
              className="fermer-discret"
              onClick={() => setOpen(false)}
            >
              Fermer
            </button>
          </div>

          <div className="assistant__messages" ref={listRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`assistant__msg ${
                  msg.role === 'user' ? 'assistant__msg--moi' : 'assistant__msg--bot'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="assistant__suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => sendQuestion(s)}>
                {s}
              </button>
            ))}
            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onNavigate('rendez-vous');
                }}
              >
                Ouvrir le formulaire de devis
              </button>
            )}
          </div>

          <form className="assistant__saisie" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Poser une question..."
              aria-label="Votre question"
            />
            <button type="submit" aria-label="Envoyer">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="assistant__bulle"
        aria-expanded={open}
        aria-label={open ? 'Fermer l’assistant' : 'Ouvrir l’assistant ETS Chipeaux'}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    </div>
  );
}

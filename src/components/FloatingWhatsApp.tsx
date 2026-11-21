import {MessageCircle} from 'lucide-react';
import {buildWhatsAppUrl} from '../data/institute.ts';

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(
    'Hello Shivra Driving Institute, I would like to enquire about driving classes in Annur.'
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Shivra Driving Institute on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center justify-center gap-2 w-11 h-11 sm:w-auto sm:h-12 sm:px-4 rounded-full bg-yellow-400 hover:bg-yellow-300 text-[#0A192F] font-bold text-sm shadow-lg border border-[#0A192F]/15 transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A192F]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp Us</span>
    </a>
  );
}

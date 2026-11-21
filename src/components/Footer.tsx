import {ArrowUpRight, MapPin, MessageCircle, Phone} from 'lucide-react';
import {BUSINESS_INFO, buildWhatsAppUrl} from '../data/institute.ts';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-xl font-bold text-white">
              {BUSINESS_INFO.name}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Driving school in Annur, Coimbatore, Tamil Nadu dedicated to calm,
              practical driving lessons and straightforward learner support.
            </p>
            <p className="text-xs text-slate-400 flex items-start gap-2 pt-1">
              <MapPin
                className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{BUSINESS_INFO.address}</span>
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-yellow-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-yellow-400 transition-colors">
                  Driving Courses
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-400 transition-colors">
                  Training Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-yellow-400 transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-400 transition-colors">
                  Contact & Map
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-sm font-semibold text-white">Direct Contact</p>
            <div className="space-y-2.5 text-sm">
              <a
                href={BUSINESS_INFO.telHref}
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold tabular-nums"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{BUSINESS_INFO.formattedPhone}</span>
              </a>
              <a
                href={buildWhatsAppUrl(
                  'Hello Shivra Driving Institute, I would like to enquire about driving classes in Annur.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-200 hover:text-yellow-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp Enquiry</span>
              </a>
              <a
                href={BUSINESS_INFO.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-200 hover:text-yellow-400 transition-colors"
              >
                <span>Google Business Profile</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {BUSINESS_INFO.name}, Annur, Coimbatore.
          </p>
          <p>
            Interactive maps powered by Google Maps Platform (subject to Google
            Maps End User Terms).
          </p>
        </div>
      </div>
    </footer>
  );
}

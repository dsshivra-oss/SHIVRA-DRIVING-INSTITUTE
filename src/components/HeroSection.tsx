import {ArrowUpRight, MapPin, MessageCircle, Phone} from 'lucide-react';
import {BUSINESS_INFO, buildWhatsAppUrl} from '../data/institute.ts';
import {ImageWithFallback} from './ImageWithFallback.tsx';

export function HeroSection() {
  const heroWhatsAppHref = buildWhatsAppUrl(
    'Hello Shivra Driving Institute, I would like to enquire about driving classes in Annur.'
  );

  return (
    <section
      id="top"
      className="bg-[#0A192F] text-white border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 lg:pt-16 lg:pb-14">
        {/* 2-Column Balanced Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-yellow-400 tracking-wide mb-4">
              Annur, Odderpalayam · Coimbatore District
            </p>

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance] mb-5">
              Confident Driving Starts on Annur Roads
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mb-8">
              Looking for practical driving classes in Annur or a dependable
              driving institute near Coimbatore? Visit{' '}
              <strong className="font-semibold text-white">
                {BUSINESS_INFO.name}
              </strong>{' '}
              on Coimbatore Road, Opposite Panchayat Union Office, and speak
              directly with our team to get started.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BUSINESS_INFO.telHref}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
              >
                <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Call Now · {BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={heroWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/25 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle
                  className="w-5 h-5 text-yellow-400 shrink-0"
                  aria-hidden="true"
                />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right: 16:9 Road Photography */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px] rounded-xl overflow-hidden border border-white/15 bg-[#122645]">
              <ImageWithFallback
                src="/src/assets/images/hero_shivra_car_1795248928236.jpg"
                alt="Shivra Driving Institute training car with roof name board on Annur Coimbatore Road"
                fallbackTitle="Shivra Driving Institute – Practical Road Training in Annur"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/15 to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-yellow-300">
                    Coimbatore Road · Annur
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Opposite Panchayat Union Office
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 px-3 py-2 rounded-md whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>Visit Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Verified Fact Strip Below Hero Split */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-slate-400 mb-1">Institute Address</p>
            <p className="text-sm font-medium text-white leading-snug">
              Coimbatore Road, Annur, Odderpalayam – 641653
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">Landmark</p>
            <p className="text-sm font-medium text-white inline-flex items-center gap-1.5">
              <MapPin
                className="w-4 h-4 text-yellow-400 shrink-0"
                aria-hidden="true"
              />
              <span>{BUSINESS_INFO.landmark}</span>
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">Direct Phone & WhatsApp</p>
            <a
              href={BUSINESS_INFO.telHref}
              className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 tabular-nums transition-colors"
            >
              {BUSINESS_INFO.formattedPhone}
            </a>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">Verified Listing</p>
            <a
              href={BUSINESS_INFO.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-white hover:text-yellow-400 transition-colors"
            >
              <span>Google Business Profile</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

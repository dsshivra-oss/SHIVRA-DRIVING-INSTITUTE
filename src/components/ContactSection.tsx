import {useEffect, useState, type FormEvent} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiIsLoaded,
} from '@vis.gl/react-google-maps';
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  COURSE_CATEGORIES,
  buildWhatsAppUrl,
} from '../data/institute.ts';
import type {InstitutePlaceData} from '../hooks/useInstitutePlace.ts';

interface ContactSectionProps {
  hasMapsApiKey: boolean;
  placeData?: InstitutePlaceData;
}

interface EnquiryFormState {
  name: string;
  phone: string;
  course: string;
  message: string;
}

function InstituteMapCanvas({placeData}: {placeData?: InstitutePlaceData}) {
  const isApiLoaded = useApiIsLoaded();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const center = placeData?.location;

  useEffect(() => {
    if (center) {
      setInfoOpen(true);
    }
  }, [center]);

  if (!isApiLoaded || placeData?.loading) {
    return (
      <div className="h-[340px] w-full rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-6 text-center text-sm text-slate-600">
        Loading interactive Google Map for Annur...
      </div>
    );
  }

  if (!center) {
    return (
      <div className="h-[340px] w-full rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-8 h-8 text-[#0A192F] mb-3" aria-hidden="true" />
        <p className="text-sm font-semibold text-[#0A192F] mb-1">
          {BUSINESS_INFO.name}
        </p>
        <p className="text-xs text-slate-600 max-w-sm mb-4">
          {BUSINESS_INFO.address}
        </p>
        <a
          href={BUSINESS_INFO.googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors"
        >
          <span>Open in Google Maps</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="h-[340px] w-full rounded-xl overflow-hidden border border-slate-200">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={center}
        center={center}
        defaultZoom={16}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{width: '100%', height: '100%'}}
      >
        <AdvancedMarker
          ref={markerRef}
          position={center}
          title={BUSINESS_INFO.name}
          onClick={() => setInfoOpen(true)}
        >
          <Pin
            background="#FACC15"
            borderColor="#0A192F"
            glyphColor="#0A192F"
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={260}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-slate-900">
              <p className="font-display font-bold text-sm text-[#0A192F] mb-1">
                {placeData?.isExactInstituteMatch && placeData.displayName
                  ? placeData.displayName
                  : BUSINESS_INFO.name}
              </p>
              <p className="text-xs text-slate-600 leading-snug mb-2">
                {placeData?.isExactInstituteMatch && placeData.formattedAddress
                  ? placeData.formattedAddress
                  : BUSINESS_INFO.shortAddress}
              </p>
              <a
                href={
                  placeData?.googleMapsURI || BUSINESS_INFO.googleMapsSearchUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A192F] underline"
              >
                <span>Directions on Google Maps</span>
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function ContactSection({hasMapsApiKey, placeData}: ContactSectionProps) {
  const [form, setForm] = useState<EnquiryFormState>({
    name: '',
    phone: '',
    course: COURSE_CATEGORIES[0].title,
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(
    null
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const digitsOnly = form.phone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setFormError('Please enter your name (at least 2 characters).');
      return;
    }

    if (digitsOnly.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setFormError(null);

    const compiledMessage = [
      `Hello ${BUSINESS_INFO.name},`,
      `Name: ${trimmedName}`,
      `Phone: ${form.phone.trim()}`,
      `Course Interest: ${form.course}`,
      form.message.trim() ? `Notes: ${form.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    setSubmittedWhatsAppUrl(buildWhatsAppUrl(compiledMessage));
  };

  return (
    <section id="contact" className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-slate-600 mb-2">
            Visit or Message Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0A192F] [text-wrap:balance] mb-3">
            Contact {BUSINESS_INFO.name} in Annur
          </h2>
          <p className="text-base text-slate-600">
            Call, message on WhatsApp, or visit our Coimbatore Road office
            opposite the Panchayat Union Office to confirm batch timings and
            enrol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Verified Contact Card & Interactive Google Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-7 rounded-xl bg-[#0A192F] text-white space-y-5">
              <div>
                <p className="text-xs text-slate-400 mb-1">Phone & WhatsApp</p>
                <a
                  href={BUSINESS_INFO.telHref}
                  className="font-display text-2xl font-bold text-yellow-400 hover:text-yellow-300 tabular-nums transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.formattedPhone}</span>
                </a>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Complete Address</p>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed flex items-start gap-2">
                  <MapPin
                    className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{BUSINESS_INFO.address}</span>
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={BUSINESS_INFO.telHref}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors whitespace-nowrap min-h-[42px]"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>

                <a
                  href={buildWhatsAppUrl(
                    'Hello Shivra Driving Institute, I would like to enquire about joining driving classes in Annur.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/25 rounded-lg transition-colors whitespace-nowrap min-h-[42px]"
                >
                  <MessageCircle
                    className="w-4 h-4 text-yellow-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={BUSINESS_INFO.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-yellow-400 transition-colors whitespace-nowrap min-h-[42px]"
                >
                  <span>Google Profile</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            {hasMapsApiKey ? (
              <InstituteMapCanvas placeData={placeData} />
            ) : (
              <div className="h-[340px] w-full rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                <MapPin
                  className="w-8 h-8 text-[#0A192F] mb-3"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-[#0A192F] mb-1">
                  {BUSINESS_INFO.name}
                </p>
                <p className="text-xs text-slate-600 max-w-sm mb-4">
                  {BUSINESS_INFO.address}
                </p>
                <a
                  href={BUSINESS_INFO.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors"
                >
                  <span>Open Directions in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-display text-2xl font-bold text-[#0A192F] mb-2">
              Send a Quick Enquiry
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Fill in your details below to prepare a direct WhatsApp enquiry or
              call request for {BUSINESS_INFO.name}.
            </p>

            {submittedWhatsAppUrl ? (
              <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-display text-lg font-bold text-[#0A192F]">
                      Enquiry Ready to Send
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Thank you, <strong className="text-[#0A192F]">{form.name}</strong>.
                      Click below to send your enquiry directly to{' '}
                      {BUSINESS_INFO.name} on WhatsApp, or call us directly at{' '}
                      <span className="tabular-nums font-medium">
                        {BUSINESS_INFO.formattedPhone}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.telHref}
                    className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#0A192F] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedWhatsAppUrl(null);
                      setForm({
                        name: '',
                        phone: '',
                        course: COURSE_CATEGORIES[0].title,
                        message: '',
                      });
                    }}
                    className="text-sm font-medium text-slate-600 hover:text-[#0A192F] underline px-2 py-2 cursor-pointer"
                  >
                    Edit Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {formError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800 font-medium"
                  >
                    {formError}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block text-sm font-semibold text-[#0A192F] mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({...prev, name: e.target.value}))
                    }
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/15 min-h-[44px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-sm font-semibold text-[#0A192F] mb-1.5"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({...prev, phone: e.target.value}))
                    }
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm tabular-nums focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/15 min-h-[44px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-course"
                    className="block text-sm font-semibold text-[#0A192F] mb-1.5"
                  >
                    Training Category of Interest
                  </label>
                  <select
                    id="enquiry-course"
                    value={form.course}
                    onChange={(e) =>
                      setForm((prev) => ({...prev, course: e.target.value}))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/15 min-h-[44px]"
                  >
                    {COURSE_CATEGORIES.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block text-sm font-semibold text-[#0A192F] mb-1.5"
                  >
                    Preferred Timing or Questions (Optional)
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({...prev, message: e.target.value}))
                    }
                    placeholder="Share your preferred morning/evening slot or questions"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/15 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors duration-150 min-h-[48px] cursor-pointer"
                >
                  <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Prepare WhatsApp Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

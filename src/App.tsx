import {useEffect, useState} from 'react';
import {APIProvider} from '@vis.gl/react-google-maps';
import {AboutSection} from './components/AboutSection.tsx';
import {ContactSection} from './components/ContactSection.tsx';
import {CoursesSection} from './components/CoursesSection.tsx';
import {FloatingWhatsApp} from './components/FloatingWhatsApp.tsx';
import {Footer} from './components/Footer.tsx';
import {GallerySection} from './components/GallerySection.tsx';
import {HeroSection} from './components/HeroSection.tsx';
import {Navbar} from './components/Navbar.tsx';
import {ReviewsSection} from './components/ReviewsSection.tsx';
import {useInstitutePlace} from './hooks/useInstitutePlace.ts';

const MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  process.env.GOOGLE_MAPS_API_KEY ||
  '';

function InstitutePageLayout({
  hasMapsApiKey,
  quotaExceeded,
}: {
  hasMapsApiKey: boolean;
  quotaExceeded: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <GallerySection />
        {hasMapsApiKey ? (
          <MapsBackedSections />
        ) : (
          <>
            <ReviewsSection />
            <ContactSection hasMapsApiKey={false} />
          </>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function MapsBackedSections() {
  const placeData = useInstitutePlace();

  return (
    <>
      <ReviewsSection placeData={placeData} />
      <ContactSection hasMapsApiKey={true} placeData={placeData} />
    </>
  );
}

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
    };

    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  if (!MAPS_API_KEY) {
    return (
      <InstitutePageLayout
        hasMapsApiKey={false}
        quotaExceeded={quotaExceeded}
      />
    );
  }

  return (
    <APIProvider
      apiKey={MAPS_API_KEY}
      language="en"
      region="IN"
      libraries={['places', 'marker']}
    >
      <InstitutePageLayout
        hasMapsApiKey={true}
        quotaExceeded={quotaExceeded}
      />
    </APIProvider>
  );
}

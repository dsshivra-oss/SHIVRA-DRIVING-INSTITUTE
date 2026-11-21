import {ArrowUpRight, ExternalLink, MessageSquareQuote, Star} from 'lucide-react';
import {BUSINESS_INFO} from '../data/institute.ts';
import type {InstitutePlaceData} from '../hooks/useInstitutePlace.ts';

interface ReviewsSectionProps {
  placeData?: InstitutePlaceData;
}

export function ReviewsSection({placeData}: ReviewsSectionProps) {
  const hasGenuineReviews = Boolean(
    placeData && placeData.isExactInstituteMatch && placeData.reviews.length > 0
  );

  return (
    <section
      id="reviews"
      className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">
              Student Feedback & Google Profile
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0A192F] [text-wrap:balance]">
              Genuine Customer Reviews
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.googleBusinessProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0A192F] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto min-h-[42px]"
          >
            <span>View Google Business Profile</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {placeData?.loading && !hasGenuineReviews ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-sm text-slate-600">
            Checking Google Maps for live customer reviews of{' '}
            {BUSINESS_INFO.name}...
          </div>
        ) : hasGenuineReviews && placeData ? (
          <div className="space-y-6">
            {placeData.rating !== null && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400 text-[#0A192F] font-display font-bold text-lg tabular-nums">
                    <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                    {placeData.rating.toFixed(1)}
                  </span>
                  <div className="text-sm text-slate-700">
                    <p className="font-semibold text-[#0A192F]">
                      {placeData.displayName || BUSINESS_INFO.name}
                    </p>
                    {placeData.userRatingCount !== null && (
                      <p className="text-slate-600 tabular-nums">
                        Based on {placeData.userRatingCount} Google reviews
                      </p>
                    )}
                  </div>
                </div>
                {placeData.googleMapsURI && (
                  <a
                    href={placeData.googleMapsURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A192F] hover:underline"
                  >
                    <span>Read all reviews on Google Maps</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeData.reviews.map((review, index) => (
                <article
                  key={`${review.authorName}-${index}`}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#0A192F] tabular-nums">
                        {review.rating ? `${review.rating}.0 / 5.0` : 'Google Review'}
                      </span>
                      {review.relativeTime && (
                        <span className="text-xs text-slate-500">
                          {review.relativeTime}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-5">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#0A192F]">
                      {review.authorName}
                    </span>
                    {review.googleMapsUri && (
                      <a
                        href={review.googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-[#0A192F] underline"
                      >
                        Verified on Google
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A192F] mb-3">
                <MessageSquareQuote
                  className="w-5 h-5 text-yellow-500 shrink-0"
                  aria-hidden="true"
                />
                <span>Verified Google Reviews Only</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0A192F] mb-3">
                Read or Share Feedback on Our Official Google Business Profile
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We only publish authentic, verifiable student feedback rather than
                placeholder quotes. Visit {BUSINESS_INFO.name} on Google to read
                the latest verified learner reviews or share your own training
                experience.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={BUSINESS_INFO.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors whitespace-nowrap min-h-[44px]"
              >
                <span>Open Google Business Profile</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

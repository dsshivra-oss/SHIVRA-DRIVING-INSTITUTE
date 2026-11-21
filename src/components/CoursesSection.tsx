import {useState} from 'react';
import {Check, Info, MessageCircle, Phone} from 'lucide-react';
import {
  BUSINESS_INFO,
  COURSE_CATEGORIES,
  buildWhatsAppUrl,
  type CourseCategory,
} from '../data/institute.ts';

type FilterGroup = 'all' | CourseCategory['filterGroup'];

const FILTER_OPTIONS: {id: FilterGroup; label: string}[] = [
  {id: 'all', label: 'All Tracks'},
  {id: 'four-wheeler', label: 'Four-Wheeler'},
  {id: 'two-wheeler', label: 'Two-Wheeler'},
  {id: 'road-skills', label: 'Road Skills'},
];

export function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterGroup>('all');

  const visibleCourses =
    activeFilter === 'all'
      ? COURSE_CATEGORIES
      : COURSE_CATEGORIES.filter((c) => c.filterGroup === activeFilter);

  return (
    <section id="courses" className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-slate-600 mb-2">
              Driving Courses & Training Tracks
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0A192F] [text-wrap:balance]">
              Driving Training Categories in Annur
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter driving course categories"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg self-start lg:self-auto"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(option.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[38px] cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A192F] text-white'
                      : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transparent Distinction Notice */}
        <div className="mb-10 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info
              className="w-5 h-5 text-[#0A192F] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="text-sm text-slate-700 leading-relaxed">
              <strong className="font-semibold text-[#0A192F]">
                Suggested Course Guide vs. Verified Institute Details:
              </strong>{' '}
              The categories below outline standard driving school training
              tracks to help plan your enquiry. Vehicle availability, session
              schedules, and fees are confirmed directly by{' '}
              {BUSINESS_INFO.name} over phone or WhatsApp.
            </div>
          </div>
          <a
            href={BUSINESS_INFO.telHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A192F] hover:text-slate-700 whitespace-nowrap shrink-0 underline underline-offset-4"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Confirm on {BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Bento / Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCourses.map((course, idx) => {
            const isFeatured = activeFilter === 'all' && idx === 0;
            return (
              <article
                key={course.id}
                className={`bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-slate-300 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-[#0A192F] tabular-nums">
                      {course.index}.
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{course.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.availabilityNote}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A192F] mb-3">
                    {course.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5 max-w-2xl">
                    {course.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {course.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check
                          className="w-4 h-4 text-[#0A192F] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={buildWhatsAppUrl(course.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0A192F] bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[42px]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.telHref}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-[#0A192F] whitespace-nowrap shrink-0 py-2"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Call {BUSINESS_INFO.phone}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

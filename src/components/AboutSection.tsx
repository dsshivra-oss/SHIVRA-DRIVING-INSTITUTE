import {BUSINESS_INFO, WHY_CHOOSE_PILLARS} from '../data/institute.ts';
import {ImageWithFallback} from './ImageWithFallback.tsx';

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* About Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-16">
          <div className="lg:col-span-5 flex">
            <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <ImageWithFallback
                src="/src/assets/images/about_instructor_training_1795245742033.jpg"
                alt="Driving Classes in Annur – Instructor guiding a student at Shivra Driving Institute"
                fallbackTitle="Guided Driver Training in Annur"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-slate-600 mb-3">
              About {BUSINESS_INFO.name}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0A192F] [text-wrap:balance] mb-5">
              Practical, Calm Driver Education in the Heart of Annur
            </h2>

            <div className="space-y-4 text-base text-slate-700 leading-relaxed max-w-2xl">
              <p>
                {BUSINESS_INFO.name} is a local driving school situated on{' '}
                <strong className="font-semibold text-[#0A192F]">
                  {BUSINESS_INFO.shortAddress}
                </strong>
                , serving learners across Annur, Odderpalayam, and nearby
                Coimbatore corridors.
              </p>
              <p>
                Learning to drive is as much about calm judgement and road
                awareness as it is about operating controls. Our focus is
                straightforward: helping every learner understand vehicle
                handling, traffic discipline, and safe everyday road habits at a
                steady, comfortable pace.
              </p>
              <p>
                Whether you are picking up steering basics for the first time or
                looking to rebuild confidence on busy roads, you can reach us
                directly by phone or WhatsApp to discuss batch options and visit
                our Coimbatore Road office in person.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Subsection */}
        <div className="pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-2">
                Why Choose Us
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0A192F] [text-wrap:balance]">
                Focused on Learner Support and Real-World Readiness
              </h3>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Built around straightforward communication, practical training
              habits, and convenient access in Annur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block font-display text-sm font-bold text-[#0A192F] bg-yellow-300/80 px-2.5 py-1 rounded-md tabular-nums mb-4">
                    {pillar.index}
                  </span>
                  <h4 className="font-display text-lg font-bold text-[#0A192F] mb-2.5">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

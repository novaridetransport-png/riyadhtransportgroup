const reasons = [
  ["Private door-to-door journeys", "Collected from your address and taken to your destination."],
  ["No shared rides", "Only you and the people you travel with."],
  ["Direct booking coordination", "Your pickup details are arranged with you before travel."],
  ["Flexible vehicle options", "From a sedan for one to a van for the family."],
  ["Saudi and GCC route knowledge", "Planning shaped around the road and the border crossing."],
  ["Clear booking communication", "Vehicle and fare set out before you confirm."],
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-mist py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="why-heading" className="text-section">A private ride, properly coordinated</h2>
          <span className="mt-6 block h-1 w-16 bg-gold" aria-hidden="true" />
        </div>
        <dl className="grid gap-x-12 sm:grid-cols-2">
          {reasons.map(([t, d]) => <div key={t} className="border-t border-line py-6"><dt className="text-lg font-bold text-navy">{t}</dt><dd className="mt-1.5">{d}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}

const steps = [
  ["Submit your travel inquiry", "Share your route, date, passengers and luggage."],
  ["Receive vehicle and fare confirmation", "Review the vehicle category and price."],
  ["Coordinate pickup details", "Agree the address, time and contact."],
  ["Travel to your destination", "Ride directly, with your own party."],
];

export function BookingSteps() {
  return (
    <section aria-labelledby="steps-heading" className="py-20 lg:py-28">
      <div className="shell">
        <h2 id="steps-heading" className="text-section">How booking works</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="relative flex gap-5 md:block">
              {i < steps.length - 1 && <span aria-hidden="true" className="absolute left-5 top-11 h-full w-px bg-gold md:left-11 md:top-5 md:h-px md:w-full" />}
              <span aria-hidden="true" className="relative grid size-11 shrink-0 place-items-center rounded-full bg-navy font-bold text-white">{i + 1}</span>
              <div className="md:mt-5 md:pr-6"><h3 className="text-lg">{t}</h3><p className="mt-1.5">{d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

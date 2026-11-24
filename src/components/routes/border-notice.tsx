/** Shown on every international page. Recheck the Absher wording when the mandatory date is announced. */
export function BorderNotice({ enteringSaudi }: { enteringSaudi: boolean }) {
  return (
    <section aria-label="Travel document notice" className="border-b border-line bg-mist py-8">
      <div className="shell space-y-3">
        <p className="max-w-4xl"><strong className="text-navy">Check your documents.</strong> Passengers must independently verify current travel documents and entry requirements for every country on the route.</p>
        {enteringSaudi && (
          <p className="max-w-4xl">
            <strong className="text-navy">Absher Travel for Visitors.</strong> Saudi Arabia launched this service on 26 October 2026 for GCC nationals and other visitors arriving at its land crossings. The Saudi Press Agency reported that it becomes mandatory six months after launch.{" "}
            <a href="https://www.spa.gov.sa/en/w2710517" rel="noopener noreferrer" target="_blank" className="font-semibold text-royal underline underline-offset-4">Read the announcement</a> and check the effective date before travelling.
          </p>
        )}
      </div>
    </section>
  );
}

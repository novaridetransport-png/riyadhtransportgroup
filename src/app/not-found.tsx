import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not available" };

export default function NotFound() {
  return (
    <section className="shell py-24 lg:py-32">
      <p className="text-sm font-semibold text-muted">Error 404</p>
      <h1 className="mt-3 max-w-2xl text-section text-navy">This page is not available</h1>
      <p className="mt-4 max-w-xl text-lg">The address may be wrong, or the page has not been published yet. You can still prepare an inquiry for your journey.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/book-transport/">Book Your Ride</ButtonLink>
        <ButtonLink href="/" variant="secondary">Back to home</ButtonLink>
      </div>
    </section>
  );
}

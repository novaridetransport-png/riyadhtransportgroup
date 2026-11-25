"use client";

import { buttonClass } from "@/components/ui/button-class";

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-xl bg-white p-6 sm:p-8">
      <h1 className="text-2xl text-navy">This page could not be loaded</h1>
      <p className="mt-2">The database did not answer as expected. Please try again in a moment.</p>
      <button type="button" onClick={reset} className={`${buttonClass()} mt-5`}>Try again</button>
    </div>
  );
}

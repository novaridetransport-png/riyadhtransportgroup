/**
 * Photo slots. Put files in public/images/ and set e.g.
 *   hero: { src: "/images/hero.jpg", alt: "What the photo actually shows" }
 * While a slot is null, the built-in brand artwork is shown instead.
 */
export interface Photo { src: string; alt: string }

export const media = {
  hero: null as Photo | null,
  intercity: null as Photo | null,
  international: null as Photo | null,
  vehicles: {
    "/vehicles/sedan/": null as Photo | null,
    "/vehicles/suv/": null as Photo | null,
    "/vehicles/gmc-premium-suv/": null as Photo | null,
    "/vehicles/premium-vans/": null as Photo | null,
  },
};

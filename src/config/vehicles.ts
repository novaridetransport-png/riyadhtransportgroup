import { media, type Photo } from "./media";

export interface VehicleCategory {
  path: keyof typeof media.vehicles;
  name: string;
  summary: string;
  suits: string;
  /** Fill in only with confirmed figures; null is left out of the page. */
  passengers: string | null;
  luggage: string | null;
  photo: Photo | null;
}

const vehicle = (path: VehicleCategory["path"], name: string, summary: string, suits: string): VehicleCategory => ({
  path, name, summary, suits, passengers: null, luggage: null, photo: media.vehicles[path],
});

export const vehicles: VehicleCategory[] = [
  vehicle("/vehicles/sedan/", "Sedan", "A straightforward choice for lighter luggage and smaller parties.", "Solo travellers, couples and business trips"),
  vehicle("/vehicles/suv/", "SUV", "More cabin and luggage space for longer intercity drives.", "Families and travellers with extra bags"),
  vehicle("/vehicles/gmc-premium-suv/", "GMC & Premium SUV", "A full-size, higher-comfort category for long-distance and cross-border journeys.", "Executive travel and GCC routes"),
  vehicle("/vehicles/premium-vans/", "Premium Vans", "One vehicle for the whole party, so nobody travels separately.", "Groups and larger families"),
];

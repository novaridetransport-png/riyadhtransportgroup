/**
 * Owner-confirmed policy (28 November 2026): free cancellation until 24 hours before pickup;
 * payment after the journey to the driver, by cash, bank transfer, card (Mada, Apple Pay) or STC Pay.
 * Not reviewed by a lawyer.
 */
export const policyDate = "28 November 2026";
export const paymentMethods = "cash, bank transfer, card (including Mada and Apple Pay) or STC Pay";

export interface PolicySection { title: string; body: string[]; list?: string[] }

export const cancellationPolicy: PolicySection[] = [
  { title: "Free cancellation", body: ["You can cancel free of charge until 24 hours before the agreed pickup time."] },
  { title: "Later cancellations and no-shows", body: ["If you cancel less than 24 hours before pickup, or nobody is at the pickup point and we cannot reach you, a cancellation charge may apply. Any charge, and how it is worked out, is stated in your quotation before you confirm, so you know it in advance."] },
  { title: "How to cancel", body: ["Contact us by WhatsApp, phone or email and include your pickup date and, if you have one, your quotation or invoice number. Your cancellation counts from when we receive it."] },
  { title: "Changing a booking", body: ["Ask as early as you can. A new date, time, route or vehicle depends on driver and partner availability and may change the fare. A change made less than 24 hours before pickup may be treated as a cancellation if the original journey can no longer be covered."] },
  { title: "If we cannot provide your journey", body: ["If no suitable driver or vehicle is available after your booking is confirmed, we will tell you as soon as possible and you will not be charged for that journey."] },
  { title: "Payment", body: [`Payment is made after the journey, to the driver, by ${paymentMethods}. The available method is confirmed with your fare. Because nothing is paid in advance, a cancellation never needs a refund of a fare you have already paid.`] },
];

export const terms: PolicySection[] = [
  { title: "Who we are", body: ["Riyadh Transport Group arranges private transportation from Riyadh to cities in Saudi Arabia and neighbouring countries. Journeys are carried out by independent drivers and transport partners. In these terms, “we” means Riyadh Transport Group and “you” means the person who books."] },
  { title: "Requests and confirmation", body: ["Sending a request through the website, WhatsApp, phone or email does not create a booking. We check availability and reply with a vehicle category and fare. A booking is confirmed only when you accept them and we confirm the pickup details with you."] },
  { title: "Fares", body: ["The fare depends on the exact pickup and drop-off, the vehicle category, the date and any extras such as waiting time, stops or a return journey. The fare you accept is the fare you pay, unless the journey changes at your request."] },
  { title: "Payment", body: [`Payment is made after the journey, to the driver, by ${paymentMethods}. The available method is confirmed with your fare. A quotation, invoice or receipt can be emailed to you on request.`] },
  { title: "Cancellations and changes", body: ["Cancellation is free until 24 hours before pickup. Later cancellations, no-shows and changes are covered by our cancellation policy."] },
  { title: "Vehicles", body: ["You book a vehicle category, not a particular model, unless a model is confirmed in writing with your fare. The vehicle carries only you and the people travelling with you."] },
  { title: "Extras on request", body: ["Waiting time, extra stops, return journeys, overnight journeys, child seats and other special requirements are available on request and subject to driver and partner confirmation. They form part of your booking only once confirmed."] },
  { title: "Your responsibilities", body: ["Please make sure that:"], list: [
    "The number of passengers and amount of luggage you give us is accurate, as the vehicle is chosen on that basis",
    "Everyone is ready at the agreed pickup point and time",
    "Every passenger carries valid travel documents and any permit or entry permission they need",
    "Luggage contains nothing that is prohibited by law",
    "Passengers follow the driver's safety instructions and wear seatbelts",
  ] },
  { title: "Borders, Makkah and Madinah", body: ["Entry to another country, and to Makkah and the holy sites, is decided by the authorities. We cannot guarantee entry or waiting times. Only Muslims may enter the Sacred Area of Makkah, and further restrictions apply at certain times. Each passenger is responsible for checking and meeting the current requirements."] },
  { title: "Delays", body: ["Journey times depend on traffic, weather, road works, checkpoints and border processing, which are outside our control. Please allow a generous margin before flights and appointments."] },
  { title: "Lost property", body: ["Contact us as soon as possible if something is left in a vehicle. We will ask the driver, but cannot guarantee that items are found or returned."] },
  { title: "Your details", body: ["How we use your details is explained in our privacy policy."] },
  { title: "Changes to these terms", body: ["We may update these terms. The version on this page when you confirm a booking applies to that booking."] },
];

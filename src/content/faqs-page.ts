import type { PagePath } from "@/config/urls";

/** Answers describe the process only. Nothing here may promise a service that is not confirmed. */
export interface FaqGroup { title: string; items: [question: string, answer: string][]; links?: [PagePath, string][] }

export const faqGroups: FaqGroup[] = [
  {
    title: "Booking",
    items: [
      ["How do I book a journey?", "Send a request with your route, date, time, passengers and luggage. We check availability and reply with a vehicle category and fare. The journey is booked only after you agree to them."],
      ["Is my request a confirmed booking?", "No. A request lets us check availability. Nothing is booked, and no payment is taken, until the vehicle and fare are agreed with you."],
      ["How far ahead should I ask?", "As early as you can, especially for weekends, public holidays, Eid and cross-border trips, when demand is higher."],
      ["Can I book for someone else?", "Yes. Put the traveller's name and a number where they can be reached on the day, and mention that you are booking for them."],
      ["Do you run on a timetable?", "No. These are private journeys at a time you propose, subject to driver and partner availability."],
    ],
    links: [["/book-transport/", "Request a quote"]],
  },
  {
    title: "The journey",
    items: [
      ["Will other passengers share the vehicle?", "No. The vehicle carries only you and the people travelling with you. We do not arrange shared taxis or ride-sharing."],
      ["Who drives?", "Journeys are arranged through independent drivers and transport partners. We coordinate the request and pickup details with you."],
      ["Can I add stops, waiting time or a return trip?", "You can ask for them. Each is available on request and subject to driver and partner confirmation, and may change the fare."],
      ["Can I travel at night or with an overnight stop?", "Ask when you send your request. Long journeys are planned with rest in mind, and the arrangement is confirmed before booking."],
    ],
    links: [["/services/intercity-transfers/", "How intercity transfers work"], ["/services/private-transportation/", "Custom and multi-stop journeys"]],
  },
  {
    title: "Vehicles, passengers and luggage",
    items: [
      ["Which vehicle category should I choose?", "Start with how many people and bags are travelling, then the distance. If you are unsure, choose “Help me choose” in the form and describe your luggage."],
      ["How many bags can I bring?", "It depends on the vehicle available for your date. Count large and small bags, and mention pushchairs, wheelchairs or bulky items."],
      ["Can I ask for a particular car model?", "You choose a category. A specific model is only guaranteed if it is confirmed in writing with your fare."],
      ["Are child seats available?", "They can be requested and are subject to confirmation. Give each child's age. If a seat is not confirmed, please bring your own."],
    ],
  },
  {
    title: "Crossing a border",
    items: [
      ["What documents do I need?", "Every passenger needs valid travel documents and any entry permission required for their nationality. Check the official rules for every country on the route before you travel."],
      ["Can you arrange my visa?", "No. Please use official government portals or a licensed agency. We cannot give legal, immigration or visa advice."],
      ["Can you guarantee clearance or waiting time at the border?", "No. Entry, inspection and waiting times are decided by the border authorities."],
      ["Is there anything new for visitors entering Saudi Arabia by road?", "Saudi Arabia launched Absher Travel for Visitors for land arrivals on 26 October 2026. Check the Ministry of Interior's announcement for the date it becomes mandatory."],
    ],
    links: [["/international-transfers/", "International routes"]],
  },
  {
    title: "Makkah and Madinah",
    items: [
      ["Who may travel to Makkah?", "Only Muslims may enter the Sacred Area of Makkah, and further restrictions apply at certain times, including around Hajj. Check current official announcements for every passenger."],
      ["Can you arrange Umrah or Hajj permits?", "No. Permits must be arranged through official channels. We only coordinate transport."],
      ["Where can I check Ihram and Miqat rules?", "Please follow the Ministry of Hajj and Umrah at haj.gov.sa."],
    ],
    links: [["/saudi-arabia/riyadh-to-makkah/", "Riyadh to Makkah"], ["/saudi-arabia/riyadh-to-madinah/", "Riyadh to Madinah"]],
  },
  {
    title: "Fares, payment and documents",
    items: [
      ["How is the fare worked out?", "It depends on the exact pickup and drop-off, the vehicle category, the date and anything extra such as waiting, stops or a return. There is no single price per city."],
      ["Does sending a request cost anything?", "No. You only pay after you have agreed to the vehicle and fare."],
      ["Can I get a quotation, invoice or receipt?", "Yes. Ask for a quotation before you decide. Invoices and receipts can be emailed to you as PDF files."],
      ["Can I change or cancel?", "Tell us as early as possible. Ask for the change and cancellation terms that apply, and read them before you confirm."],
    ],
  },
  {
    title: "Your details",
    items: [
      ["What happens to my details?", "They are used to answer your request and arrange your journey. Our privacy policy explains who receives them and how long they are kept."],
      ["How do I ask for my details to be deleted?", "Email info@riyadhtransportgroup.com."],
    ],
    links: [["/privacy-policy/", "Privacy policy"]],
  },
];

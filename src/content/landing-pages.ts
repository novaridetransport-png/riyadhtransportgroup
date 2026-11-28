import type { PagePath } from "@/config/urls";
import { list, note, points, prose, steps, vehicleOptions, type PageContent } from "./types";

/** Service, airport and directory pages. */
export const landingPages = {
  "/services/": {
    title: "Private Transfer Services in Riyadh | Riyadh Transport Group",
    description: "Compare private transport services from Riyadh: intercity, cross-border, airport, business and family travel. Find the right one for your trip.",
    h1: "Transport services from Riyadh",
    intro: [
      "Every booking is a private vehicle for your own party. What differs is the planning: a flight to meet, a border to cross, a schedule to keep or a family to look after.",
      "Choose the description that sounds most like your trip.",
    ],
    blocks: [
      points("Find your service", [
        ["I need a car for my own plan", "Private transportation, with your stops and your hours."],
        ["I am going to another Saudi city", "Intercity transfers, from address to address."],
        ["I am catching or meeting a flight", "Airport transfers linked to an intercity journey."],
        ["I am travelling for work", "Business transportation for individuals, teams and guests."],
        ["I am travelling with family", "Family transportation with child seats, elders and luggage in mind."],
        ["I am leaving the Kingdom", "See the international transfers directory for each country."],
      ]),
      prose("How bookings are arranged",
        "Transportation is arranged through independent drivers and transport partners. We coordinate the request, the vehicle category and the pickup details with you.",
        "We do not sell individual seats, and we do not put strangers in the same vehicle."),
      steps("The same four steps every time",
        ["Inquire", "Route, date, passengers, bags."],
        ["Review", "A vehicle category and fare."],
        ["Coordinate", "Pickup place, time and contact."],
        ["Travel", "Directly to where you are going."]),
    ],
    faqs: [
      ["Can one booking combine services?", "Describe the whole trip. Available on request and subject to driver and partner confirmation. Describe the whole trip."],
      ["Do you offer city taxis by the minute?", "No. These are pre-arranged private journeys."],
    ],
    links: [
      ["/services/private-transportation/", "A vehicle on your own plan"],
      ["/services/intercity-transfers/", "Between Saudi cities"],
      ["/services/airport-transfers/", "Meeting a flight"],
      ["/services/business-transportation/", "Work and corporate travel"],
      ["/services/family-transportation/", "Children, parents and luggage"],
      ["/international-transfers/", "Routes to neighbouring countries"],
    ],
    cta: { title: "Not sure which one fits?", text: "Describe the trip in your own words and we will work from that." },
  },

  "/services/private-transportation/": {
    title: "Private Car with Driver in Riyadh | Custom Journeys",
    description: "Ask about a private car with driver from Riyadh, including multi-stop days, waiting time and custom routes, subject to confirmation.",
    h1: "A private car with driver, on your plan",
    intro: [
      "Some trips are not simply A to B. They have three stops, a long lunch, a relative to collect and an uncertain finish.",
      "Use this page to ask for a vehicle and independent driver around your own itinerary. Available on request and subject to driver and partner confirmation.",
    ],
    blocks: [
      points("What you can ask about", [
        ["Multi-stop days", "Several addresses in a set order, in Riyadh or on the way to another city."],
        ["Wait and return", "Wait and return: available on request and subject to driver and partner confirmation."],
        ["Round trips over days", "Out on one date, back on another."],
        ["Unusual routes", "Farms, heritage sites and towns without a page of their own."],
      ]),
      list("Details that make a quote accurate", [
        "Every stop, in order, with a pin",
        "How long you expect at each",
        "The latest time you need to finish",
        "Overnight stays, if any",
        "Bulky or delicate items",
      ]),
      prose("What “private” means here",
        "The vehicle carries only your party. You set the destination and reasonable stops, within the law and the driver's working hours.",
        "It is not chauffeur-hire of a specific model. You choose a category, and the available vehicle is confirmed with the quote."),
      vehicleOptions("Categories", "Choose by comfort and cargo.", {
        sedan: "City appointments and light travel.",
        suv: "Mixed roads and more luggage.",
        gmc: "Full-day comfort and hosting guests.",
        van: "One vehicle for the group.",
      }),
      steps("Arrange it",
        ["Write out the plan", "As a list, however rough."],
        ["Receive questions, then a fare", "We clarify before quoting."],
        ["Confirm", "Changes afterwards are agreed with you."]),
    ],
    faqs: [
      ["Is there a minimum booking?", "It depends on the plan and availability, and will be made clear in the quote."],
      ["Can I change the route on the day?", "Often, by agreement. Extra distance or time may alter the fare."],
    ],
    links: [
      ["/services/intercity-transfers/", "A simple trip to one city"],
      ["/services/business-transportation/", "Working days with meetings"],
      ["/saudi-arabia/", "Routes across the Kingdom"],
    ],
    cta: { title: "Have an itinerary?", text: "Paste it into the form's notes and request a fare." },
  },

  "/services/intercity-transfers/": {
    title: "Intercity Transfers in Saudi Arabia | Riyadh Door to Door",
    description: "How private intercity transfers from Riyadh work: what shapes the fare, how to choose a vehicle and when road beats rail or air.",
    h1: "Intercity transfers between Riyadh and Saudi cities",
    intro: [
      "An intercity transfer is a single private drive from an address in one city to an address in another.",
      "This page explains how to decide whether it suits you and what affects the quote. For individual cities, use the route directory.",
    ],
    blocks: [
      points("Road, rail or air?", [
        ["Choose the road when", "You are several people, carry much luggage, travel with someone frail, or end far from a station or airport."],
        ["Choose rail when", "A line serves both cities, your bags are few and someone can meet you."],
        ["Choose a flight when", "The distance is great, such as Jeddah, and you travel alone and light."],
      ]),
      list("What shapes the fare", [
        "The exact pickup and drop-off, not just the city names",
        "Vehicle category",
        "One-way or return, and any waiting",
        "Extra stops and detours",
        "Dates with heavy demand, such as Eid and school holidays",
        "Overnight or two-driver plans on the longest routes",
      ], "There is no single price per city, because two addresses in the same city can be far apart."),
      prose("Three corridors from Riyadh",
        "East: Dammam and Khobar, by expressway to the Gulf. North-west: Qassim with Buraydah and Unaizah, then Madinah beyond. West: Taif, Makkah and Jeddah, the longest of the three.",
        "Same-day returns: available on request and subject to driver and partner confirmation. The western and Madinah drives deserve a plan for rest."),
      steps("Booking a transfer",
        ["Check your route's page", "It lists the details that matter there."],
        ["Send both addresses", "With pins."],
        ["Compare categories", "Ask for two if undecided."],
        ["Confirm", "Fare first, booking second."]),
      vehicleOptions("Vehicle guidance", "The further you go, the more room you will want.", {
        sedan: "Shorter corridors, light bags.",
        suv: "Families on any corridor.",
        gmc: "Long western and Madinah drives.",
        van: "Groups and heavy luggage.",
      }),
    ],
    faqs: [
      ["Do you run on a timetable?", "No. You propose the time and it is confirmed with availability."],
      ["Can I book only one seat?", "No. Private-party journeys only, subject to confirmation."],
      ["Can the route start outside Riyadh?", "Return journeys: available on request and subject to driver and partner confirmation. Riyadh is currently the hub for all listed routes."],
    ],
    links: [
      ["/saudi-arabia/", "All Saudi routes, both directions"],
      ["/saudi-arabia/riyadh-to-dammam/", "The eastern corridor"],
      ["/saudi-arabia/riyadh-to-madinah/", "The north-western corridor"],
      ["/saudi-arabia/riyadh-to-jeddah/", "The western corridor"],
    ],
    cta: { title: "Know your two addresses?", text: "That is enough to start a quote." },
  },

  "/services/airport-transfers/": {
    title: "Airport Transfers in Saudi Arabia | Riyadh, Jeddah, Madinah, Dammam",
    description: "Private airport pickup and drop-off at Riyadh (RUH), Jeddah (JED), Madinah (MED) and Dammam (DMM), to the city or straight on to another city.",
    h1: "Airport transfers in Saudi Arabia",
    intro: [
      "Private pickup and drop-off at four Saudi airports: Riyadh, Jeddah, Madinah and Dammam. Go into the city, or straight on to another one without changing cars.",
      "Choose your airport below for local details.",
    ],
    blocks: [
      points("Before you book, send", [
        ["Flight number and date", "As shown on your booking."],
        ["Terminal", "As printed on your booking. Check it again the day before."],
        ["Checked bags", "Number and size, with any sports or medical equipment."],
        ["A working mobile number", "Roaming or local, reachable on landing."],
      ]),
      steps("How an arrival pickup works",
        ["Agree a meeting point", "Agreed with you in advance, following the airport's rules."],
        ["Land and clear", "Immigration and baggage take as long as they take."],
        ["Make contact", "Message when you have your bags."],
        ["Drive on", "Directly to your address."]),
      prose("Planning a departure",
        "Give us your check-in deadline rather than the take-off time. On a long drive to an airport, the margin must cover traffic, a stop and the unexpected.",
        "For early flights, travelling the evening before is safer than driving through the night."),
      note("Other airports", "Airports in Bahrain, Qatar, the UAE, Kuwait and Oman are not covered by these pages. Ask before planning a journey around a flight there."),
      vehicleOptions("Luggage first", "Check luggage space carefully.", {
        sedan: "Two travellers with one case each.",
        suv: "Several cases.",
        gmc: "Arriving guests and families.",
        van: "Groups with checked baggage.",
      }),
    ],
    faqs: [
      ["Can I go from the airport straight to another city?", "Yes. Give the final address and it is quoted as one journey."],
      ["Is waiting time free?", "Waiting terms are set out in each quote. Please read them before confirming."],
    ],
    links: [
      ["/services/airport-transfers/riyadh-airport/", "King Khalid International (RUH)"],
      ["/services/airport-transfers/jeddah-airport/", "King Abdulaziz International (JED)"],
      ["/services/airport-transfers/madinah-airport/", "Prince Mohammad bin Abdulaziz International (MED)"],
      ["/services/airport-transfers/dammam-airport/", "King Fahd International (DMM)"],
      ["/services/intercity-transfers/", "Intercity transfers"],
    ],
    cta: { title: "Have a flight booked?", text: "Send the number and your address at the other end." },
  },





  "/services/business-transportation/": {
    title: "Business Transportation Riyadh | Executive & Team Travel",
    description: "Private business travel from Riyadh: site visits, delegations, roadshows and team transfers across Saudi Arabia and the GCC. Request a quote.",
    h1: "Business transportation from Riyadh",
    intro: [
      "Work travel is judged by whether people arrive on time, prepared and together.",
      "Request private vehicles for executives, guests or teams. Available on request and subject to driver and partner confirmation.",
    ],
    blocks: [
      points("Situations you can ask about", [
        ["Site visits", "Industrial gates with passes and safety rules. Send them in advance."],
        ["Delegations", "Several passengers and drop-offs on one running order."],
        ["Roadshows", "Back-to-back meetings, with realistic time between districts."],
        ["Regional trips", "Visits to the Eastern Province, Qassim or GCC capitals."],
      ]),
      steps("A brief that works",
        ["Name a coordinator", "One person who can make decisions on the day."],
        ["Send the running order", "Addresses, times and guest names."],
        ["Mark the fixed points", "Which times cannot move."],
        ["Agree contingencies", "What happens if a meeting runs on."]),
      vehicleOptions("Choosing for the occasion", "Match the vehicle to the guests.", {
        sedan: "One professional between meetings.",
        suv: "Two or three colleagues with equipment.",
        gmc: "Executives and clients.",
        van: "Teams who need to talk on the way.",
      }),
      list("Administration", [
        "State purchase-order or invoice needs when you inquire",
        "Ask for a written quote to attach to an approval",
        "For cross-border work, check visas and equipment papers with your own advisers",
      ]),
    ],
    faqs: [
      ["Do you have corporate accounts?", "Tell us your expected volume. Any arrangement would be agreed individually."],
      ["Can the same driver stay for several days?", "You can request it. It depends on the partner's schedule and rest rules."],
      ["Can you guarantee a specific model?", "Not unless it is confirmed in writing with your quote. Otherwise you reserve a category."],
    ],
    links: [
      ["/saudi-arabia/riyadh-to-dammam/", "Eastern Province site visits"],
      ["/saudi-arabia/riyadh-to-khobar/", "Dhahran and Khobar meetings"],
      ["/international-transfers/riyadh-to-abu-dhabi/", "Travel to the UAE capital"],
      ["/services/private-transportation/", "Reserving a vehicle by the day"],
    ],
    cta: { title: "Have a schedule to keep?", text: "Send the running order and receive a fare for the whole job." },
  },

  "/services/family-transportation/": {
    title: "Family Transportation Riyadh | Private Cars & Vans",
    description: "Request private family travel from Riyadh. Child seats, stops and other needs: available on request and subject to driver and partner confirmation. Get a quote.",
    h1: "Family transportation, at your family's pace",
    intro: [
      "Families travel with prams, medicine, snacks, grandparents and opinions. Choose a category according to your party and luggage.",
      "Tell us who is coming, and the plan can allow for them.",
    ],
    blocks: [
      points("Who is travelling?", [
        ["Babies and toddlers", "Child seats: available on request and subject to driver and partner confirmation."],
        ["Older children", "Plan a stop before they ask."],
        ["Grandparents", "Step height and legroom matter. Mention walkers and wheelchairs."],
        ["Anyone unwell", "A relative should travel with them. This is not a medical service."],
      ]),
      list("Make the journey easier", [
        "Leave around nap time",
        "Keep a small bag for each child in the cabin",
        "Agree prayer and meal stops beforehand",
        "Choose the larger vehicle if you are between sizes",
        "Share a contact at the destination",
      ]),
      vehicleOptions("Space for everyone", "Seat count is only half of it. Prams and cases need room as well.", {
        sedan: "Parents with one child.",
        suv: "A young family with a pram.",
        gmc: "Several generations in comfort.",
        van: "Large families without splitting up.",
      }),
      prose("Journeys to consider",
        "Weekends in Khobar, relatives in Qassim, Umrah with parents, and holidays across the Gulf. Each has its own page with practical notes.",
        "For international trips, check every child's passport and consent papers early. These cause the most avoidable problems."),
      steps("Request a family trip",
        ["List passengers by age", "Adults, children, elders."],
        ["Count luggage", "Include folding items."],
        ["Review the vehicle", "Ask whatever you need before accepting."],
        ["Travel", "Only your family on board."]),
    ],
    faqs: [
      ["Are child seats provided?", "They can be requested and are subject to confirmation. Never assume one will be fitted unless your quote says so."],
      ["Will other passengers join us?", "No. The vehicle is private to your party."],
      ["Can we stop whenever we like?", "Stops: available on request and subject to driver and partner confirmation. Long ones should be planned so they are included in the fare."],
    ],
    links: [
      ["/saudi-arabia/riyadh-to-khobar/", "A weekend by the sea"],
      ["/saudi-arabia/riyadh-to-makkah/", "Umrah as a family"],
      ["/saudi-arabia/riyadh-to-qassim/", "Visiting relatives"],
      ["/international-transfers/riyadh-to-bahrain/", "A short trip abroad"],
    ],
    cta: { title: "Tell us who is coming", text: "Ages, bags and any special needs, for a vehicle that fits." },
  },

  "/saudi-arabia/": {
    title: "Saudi Arabia Routes from Riyadh | Private Transfers",
    description: "Private routes from and to Riyadh, Dammam, Khobar, Qassim, Jeddah, Makkah and Madinah, plus Jeddah, Makkah and Madinah transfers for pilgrims.",
    h1: "Private routes across Saudi Arabia",
    intro: [
      "Riyadh sits near the middle of the Kingdom, which makes it a natural starting point in three directions: the Gulf coast, Qassim and the west.",
      "Between Jeddah, Makkah and Madinah there are separate routes for pilgrims and visitors. Choose a route for local notes and booking details.",
    ],
    blocks: [
      points("Choose by direction", [
        ["East", "Dammam for port, industry and airport. Khobar for the sea, Dhahran and the causeway."],
        ["North-west", "Buraydah for market and hospitals, Unaizah for farms and heritage, Qassim for every other town."],
        ["West", "Makkah for Umrah, Jeddah for the Red Sea, with Taif on the way."],
        ["Madinah", "Reached through Qassim, with a quiet second half that needs planning."],
      ]),
      note("Travel to the holy cities", "Only Muslims may enter the Sacred Area of Makkah. Under Saudi eVisa terms, non-Muslims may not enter the Holy Mosque in Makkah or the Prophet's Mosque in Madinah, or their premises. Madinah city and the mosque are separate matters. Seasonal rules change, so check official Saudi sources before travelling. Check the official rules before booking."),
      steps("From this page to a booking",
        ["Open your route", "Outbound or return."],
        ["Note what to send", "Each page lists the useful details."],
        ["Request a quote", "The form on each route page opens with the cities filled in."]),
    ],
    faqs: [
      ["My city is not listed. Can I still ask?", "Yes. Send the request through the booking form and you will be told whether it can be arranged."],
      ["Are outbound and return prices the same?", "Not always. Timing, pickup place and vehicle availability differ in each direction."],
    ],
    links: [
      ["/services/intercity-transfers/", "How intercity fares are worked out"],
      ["/international-transfers/", "Destinations beyond the Kingdom"],
    ],
    cta: { title: "Where in the Kingdom?", text: "Send your route and date for a fare." },
  },

  "/international-transfers/": {
    title: "International Transfers from Riyadh | GCC by Private Car",
    description: "Request private cross-border journeys between Riyadh and Bahrain, Doha, Dubai, Abu Dhabi and Kuwait, or a feasibility check for Muscat. Compare borders and prepare documents.",
    h1: "International transfers between Riyadh and the GCC",
    intro: [
      "Five countries can be reached by road from Riyadh, through very different borders: a causeway, a single desert post, a choice of two.",
      "Use this directory to compare them and open the route you need.",
    ],
    blocks: [
      points("Borders at a glance", [
        ["Bahrain", "King Fahd Causeway from Khobar, with the border station on an island."],
        ["Qatar", "Salwa and Abu Samra, the only land crossing."],
        ["United Arab Emirates", "Al Batha and Al Ghuwaifat, then on to Abu Dhabi or Dubai."],
        ["Kuwait", "Khafji–Nuwaiseeb on the coast, or Al Ruqi–Salmi inland."],
        ["Oman", "The Rub al Khali road, or by way of the UAE."],
      ]),
      list("Every traveller should check", [
        "Passport validity and visa rules for their nationality",
        "Saudi exit and re-entry permission, for residents",
        "Children's documents and parental consent",
        "Customs limits in both countries, including medicines",
        "Border status on the day of travel",
      ], "We cannot give legal, immigration or visa advice."),
      prose("The vehicle crosses too",
        "Passengers are only half of a border crossing. The driver and vehicle need insurance and permissions for the country concerned, so a category is confirmed only when an eligible partner is available.",
        "For this reason, wait for confirmation before paying for non-refundable hotels or events."),
      note("No guarantees at the border", "Entry, inspection and waiting times are decided by the authorities. No booking can guarantee clearance."),
      vehicleOptions("Vehicles for cross-border travel", "You may spend time in the car at the crossing.", {
        sedan: "Light luggage and small parties.",
        suv: "Families with luggage.",
        gmc: "Longer distances and executive travel.",
        van: "Groups, subject to permissions.",
      }),
    ],
    faqs: [
      ["Can you arrange my visa?", "No. Please use official government portals or a licensed agency."],
      ["Which destination is simplest by road?", "Each crossing differs. Oman takes the most planning."],
      ["Can I visit two countries in one trip?", "Possibly. Describe the full itinerary, as each border adds its own conditions."],
    ],
    links: [
      ["/saudi-arabia/", "Routes inside the Kingdom"],
      ["/services/business-transportation/", "Cross-border work travel"],
    ],
    cta: { title: "Which border are you crossing?", text: "Send destination, dates and nationalities." },
  },
} satisfies Partial<Record<PagePath, PageContent>>;

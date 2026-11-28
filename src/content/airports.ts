import { list, note, points, prose, steps, vehicleOptions, type PageContent } from "./types";

/** Owner confirmed pickup and drop-off at these four airports on 28 November 2026. */
const meeting = points("How an arrival pickup works", [
  ["Before you fly", "Send your flight number, passengers and checked bags."],
  ["Meeting point", "Agreed with you in advance, following the airport's rules."],
  ["After landing", "Message when you have your bags; immigration and baggage take as long as they take."],
  ["Delays", "With the flight number, the pickup can be adjusted where possible. Waiting terms are stated with your fare."],
]);

export const airportPages = {
  "/services/airport-transfers/riyadh-airport/": {
    title: "Riyadh Airport Transfers (RUH) | Private Pickup & Drop-off",
    description: "Private car between King Khalid International Airport and any Riyadh address, or straight on to another city. Send your flight for a quote.",
    h1: "Riyadh airport transfers",
    intro: [
      "King Khalid International (RUH) sits to the north of the city. From there you can be taken to any address in Riyadh, or straight on to Qassim, the Eastern Province or further.",
      "Send your flight and destination, and we reply with a vehicle and fare.",
    ],
    blocks: [
      meeting,
      points("Where you can go from the airport", [
        ["Anywhere in Riyadh", "Homes, hotels, offices, the Diplomatic Quarter or KAFD."],
        ["Straight on to another city", "Qassim, Dammam, Khobar and other routes, without changing cars."],
        ["Across a border", "Bahrain, Qatar, the UAE, Kuwait and Oman, if every passenger can enter."],
      ]),
      steps("Departures",
        ["Give your check-in deadline", "And the airline and terminal on your booking."],
        ["Allow for Riyadh traffic", "Weekday rush hours can add a lot of time."],
        ["Agree the pickup", "Address and time, confirmed in advance."]),
      vehicleOptions("Choosing a vehicle", "Airport trips are about luggage.", {
        sedan: "One or two travellers.",
        suv: "Families with checked bags.",
        gmc: "Executives and visiting guests.",
        van: "Groups and crews.",
      }),
    ],
    faqs: [
      ["Can I go from the airport straight to another city?", "Yes. Give the final address; it is quoted as one journey."],
      ["Which terminal?", "Use the terminal on your latest airline booking, and send it with your request."],
      ["What if I land late at night?", "Send the flight details; night arrivals are arranged subject to driver availability."],
    ],
    links: [
      ["/saudi-arabia/riyadh-to-qassim/", "Riyadh to Qassim"],
      ["/saudi-arabia/riyadh-to-dammam/", "Riyadh to Dammam"],
      ["/international-transfers/riyadh-to-bahrain/", "Riyadh to Bahrain"],
    ],
    cta: { title: "Landing in Riyadh?", text: "Send your flight and address for a fare." },
  },

  "/services/airport-transfers/jeddah-airport/": {
    title: "Jeddah Airport Transfers (JED) | Makkah, Madinah & Jeddah",
    description: "Private car from King Abdulaziz International Airport to Makkah, Madinah, any Jeddah address or Riyadh. Check your terminal and request a quote.",
    h1: "Jeddah airport transfers",
    intro: [
      "King Abdulaziz International (JED) is the gateway for most Umrah pilgrims and for the Red Sea coast. From the airport you can go into Jeddah, on to Makkah or Madinah, or across the country to Riyadh.",
      "Send your flight and where you are going.",
    ],
    blocks: [
      note("Check your terminal", "Flights that used the North Terminal moved to Terminal 4 and the Hajj and Umrah terminals in October 2026, and seasonal terminals open at certain times. Use the terminal on your latest airline confirmation, and send any change before you travel."),
      meeting,
      points("Where you can go from the airport", [
        ["Makkah", "For Muslim passengers only. The ministry notes the airport is not a Miqat."],
        ["Madinah", "A long drive; rest stops on request."],
        ["Anywhere in Jeddah", "Obhur, Al Balad, the Corniche or any district."],
        ["Riyadh", "A cross-country drive, best with an overnight break."],
      ]),
      vehicleOptions("Choosing a vehicle", "Pilgrim luggage and Zamzam need space.", {
        sedan: "Two travellers with cabin bags.",
        suv: "Families with suitcases.",
        gmc: "Older relatives after a long flight.",
        van: "Umrah groups.",
      }),
    ],
    faqs: [
      ["Can you collect from the Hajj and Umrah terminals?", "Yes, subject to the access rules in force at the time. Tell us the terminal with your request."],
      ["Can non-Muslim passengers be taken to Makkah?", "No. Only Muslims may enter the Sacred Area of Makkah."],
      ["Is there a train from the airport?", "Yes, the Haramain High Speed Railway has a station at the airport. A car suits you better with a lot of luggage or to reach a hotel door."],
    ],
    links: [
      ["/saudi-arabia/jeddah-to-makkah/", "Jeddah to Makkah"],
      ["/saudi-arabia/jeddah-to-madinah/", "Jeddah to Madinah"],
      ["/saudi-arabia/jeddah-to-riyadh/", "Jeddah to Riyadh"],
    ],
    cta: { title: "Landing in Jeddah?", text: "Send your flight, terminal and destination." },
  },

  "/services/airport-transfers/madinah-airport/": {
    title: "Madinah Airport Transfers (MED) | Hotel, Makkah & Beyond",
    description: "Private car from Prince Mohammad bin Abdulaziz International Airport to your Madinah hotel, Makkah, Jeddah or Riyadh. Request a quote with your flight.",
    h1: "Madinah airport transfers",
    intro: [
      "Prince Mohammad bin Abdulaziz International (MED) brings visitors straight to the city of the Prophet's Mosque. Many go to a hotel near the mosque; others continue to Makkah or further.",
      "Send your flight and destination.",
    ],
    blocks: [
      meeting,
      prose("To a hotel near the Prophet's Mosque",
        "Roads near the mosque can be busy around prayer times. Ask your hotel which side to approach from, and we will plan the drop-off around it. Saudi eVisa terms bar non-Muslims from the Prophet's Mosque and its premises."),
      points("Going further", [
        ["Makkah", "For Muslim passengers. The Ministry of Hajj and Umrah lists Dhul Hulayfah as the Miqat for those setting out from Madinah."],
        ["Jeddah", "For a flight home or a stay on the coast."],
        ["Riyadh", "A long drive through Qassim; plan for rest."],
      ]),
      vehicleOptions("Choosing a vehicle", "Count every checked bag.", {
        sedan: "Two travellers.",
        suv: "Families with suitcases.",
        gmc: "Older visitors after a long flight.",
        van: "Pilgrim groups.",
      }),
      list("Send with your request", ["Flight number and arrival time", "Hotel name and which side of the mosque it is on", "Number of passengers and bags", "Mobility needs, if any"]),
    ],
    faqs: [
      ["Can I go straight from the airport to Makkah?", "Yes, if every passenger may enter Makkah. Mention any Miqat stop you want."],
      ["Do you take departures to the airport too?", "Yes. Give your check-in deadline and hotel."],
      ["What if my flight is late?", "Share the flight number so the pickup can be adjusted where possible."],
    ],
    links: [
      ["/saudi-arabia/madinah-to-makkah/", "Madinah to Makkah"],
      ["/saudi-arabia/madinah-to-jeddah/", "Madinah to Jeddah"],
      ["/saudi-arabia/madinah-to-riyadh/", "Madinah to Riyadh"],
    ],
    cta: { title: "Arriving in Madinah?", text: "Send your flight and hotel for a fare." },
  },

  "/services/airport-transfers/dammam-airport/": {
    title: "Dammam Airport Transfers (DMM) | Dammam, Khobar, Bahrain",
    description: "Private car from King Fahd International Airport to Dammam, Khobar, Dhahran, Bahrain or Riyadh. Send your flight for a quote.",
    h1: "Dammam airport transfers",
    intro: [
      "King Fahd International (DMM) lies well outside Dammam, to the north-west. It serves the whole Eastern Province, and it is a short drive from the causeway to Bahrain.",
      "Send your flight and destination.",
    ],
    blocks: [
      meeting,
      points("Where you can go from the airport", [
        ["Dammam, Khobar and Dhahran", "Homes, hotels, compounds, campuses and the port."],
        ["Bahrain", "Across the King Fahd Causeway, if every passenger can enter."],
        ["Riyadh", "Straight to the capital without changing cars."],
        ["Jubail and the industrial cities", "Give the company gate and any pass rules."],
      ]),
      prose("Departures",
        "Because the airport is outside the city, allow for the drive as well as check-in. Tell us your check-in deadline and we will suggest a pickup time."),
      vehicleOptions("Choosing a vehicle", "Tell us bag sizes, not only the count.", {
        sedan: "One or two passengers.",
        suv: "Families with large suitcases.",
        gmc: "Executives and visitors.",
        van: "Crews and groups.",
      }),
    ],
    faqs: [
      ["Can I go from the airport straight to Bahrain?", "Yes, if you can enter Bahrain. Allow time for the causeway."],
      ["Can I go straight to Riyadh?", "Yes, it is quoted as one journey."],
      ["Can I be met inside the terminal?", "The meeting point is agreed in advance, following the airport's rules."],
    ],
    links: [
      ["/saudi-arabia/dammam-to-riyadh/", "Dammam to Riyadh"],
      ["/international-transfers/dammam-to-bahrain/", "Dammam to Bahrain"],
      ["/saudi-arabia/riyadh-to-dammam/", "Riyadh to Dammam"],
    ],
    cta: { title: "Flying through Dammam?", text: "Send your flight and destination for a fare." },
  },
} satisfies Record<string, PageContent>;

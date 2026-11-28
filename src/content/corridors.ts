import { list, note, points, prose, steps, vehicleOptions, type RouteContent } from "./types";

const holyCities = note("Who may enter Makkah", "Only Muslims may enter the Sacred Area of Makkah, and Saudi eVisa terms bar non-Muslims from the Holy Mosque and its premises. At certain times, including the weeks around Hajj, entry is restricted further. Check current official announcements for every passenger. A booking does not grant entry.");

/** Routes that start and end outside Riyadh. Owner confirmed coverage on 28 November 2026. */
export const saudiCorridors = {
  "/saudi-arabia/jeddah-to-makkah/": {
    title: "Jeddah to Makkah Private Transfer | Airport, Hotel or Home",
    description: "Private car from Jeddah airport, a hotel or a home to your Makkah hotel, for Umrah and family visits. Request a quote with your flight or address.",
    h1: "Jeddah to Makkah private transfer",
    intro: [
      "For most pilgrims this is the last stretch before the Haram: off the plane at King Abdulaziz International, or out of a Jeddah hotel, and straight to a hotel in Makkah.",
      "A private car keeps your family and your bags together, and lets you set the time.",
    ],
    opposite: "Heading back to the coast?",
    blocks: [
      holyCities,
      points("Where the journey starts", [
        ["King Abdulaziz International Airport", "Share your flight number and checked bags. Terminals have changed recently, so check yours on your latest airline confirmation."],
        ["Jeddah hotels and homes", "Give the hotel or a map pin. Jeddah is long, and Obhur in the north is a very different start from the south."],
        ["Jeddah's Haramain station", "If you arrive by train, give the arrival time."],
      ]),
      prose("Ihram before you arrive",
        "The Ministry of Hajj and Umrah notes that King Abdulaziz International Airport is not a Miqat. Many pilgrims enter ihram before landing. Follow the ministry's guidance at haj.gov.sa, and tell us if you need time on the way."),
      list("Before you set off", [
        "Arrange your Umrah permit through official channels",
        "Ask your hotel where vehicles may stop; roads near the Haram close at busy times",
        "Keep passports, permits and ihram items in the cabin, not the boot",
        "Say if someone needs a wheelchair or help getting in and out",
      ]),
      vehicleOptions("Choosing a vehicle", "Count the bags from the flight, not just the people.", {
        sedan: "A couple with cabin bags.",
        suv: "A family with checked suitcases.",
        gmc: "Parents and older relatives after a long flight.",
        van: "Larger groups travelling together.",
      }),
      steps("Booking Jeddah to Makkah",
        ["Send the start point", "Flight number, hotel or pin."],
        ["Give your Makkah hotel", "Name and district."],
        ["Review the fare", "Vehicle category and price."],
        ["Agree the meeting point", "Confirmed before the day."]),
    ],
    faqs: [
      ["Is there a train as well?", "Yes. The Haramain High Speed Railway links Jeddah with Makkah. Its Makkah station is in Ar Rusayfah, a few kilometres from the Haram, so you still need onward transport with luggage."],
      ["Can the car reach my hotel entrance?", "It depends on the hotel and traffic controls at that hour. Drop-off follows the access rules in force and is not guaranteed."],
      ["What if my flight is delayed?", "Share the flight number so the pickup can be adjusted where possible. How waiting is handled is stated with your fare."],
    ],
    links: [
      ["/services/airport-transfers/jeddah-airport/", "Jeddah airport transfers"],
      ["/saudi-arabia/makkah-to-madinah/", "Continuing to Madinah"],
      ["/saudi-arabia/riyadh-to-makkah/", "Coming from Riyadh instead"],
    ],
    cta: { title: "Landing in Jeddah for Umrah?", text: "Send your flight and Makkah hotel for a fare." },
  },

  "/saudi-arabia/makkah-to-jeddah/": {
    title: "Makkah to Jeddah Private Car | To the Airport or City",
    description: "Private car from your Makkah hotel to King Abdulaziz International Airport or any Jeddah address, timed around your flight. Request a quote.",
    h1: "Makkah to Jeddah by private car",
    intro: [
      "The drive back to Jeddah usually ends at a check-in desk. That makes timing the main question: leave too late and the Haram traffic eats your margin.",
      "Tell us your flight and we plan the pickup backwards from it.",
    ],
    opposite: "Arriving for Umrah?",
    blocks: [
      steps("Planning around a flight",
        ["Start from the check-in deadline", "Not the take-off time."],
        ["Add a margin", "Hotel checkout, traffic leaving the Haram area and the airport itself."],
        ["Agree a pickup point", "Some hotels have no vehicle access at busy times; reception will know."],
        ["Bring bags down together", "Kerbside waiting is limited."]),
      points("Where you can be dropped", [
        ["King Abdulaziz International Airport", "Give the airline and terminal on your latest booking. Terminal assignments at JED have been changing."],
        ["Jeddah hotels and homes", "Al Balad, the Corniche, Obhur or any district, with a pin."],
        ["Jeddah's Haramain station", "If you are continuing by train."],
      ]),
      prose("Leaving Makkah",
        "Vehicles leave through the checkpoints around Makkah. During the Hajj period, access in both directions is controlled, and pickups depend on the permissions in force on the day."),
      vehicleOptions("Room for the return", "Pilgrims rarely leave with less than they arrived with.", {
        sedan: "A couple with modest luggage.",
        suv: "Families with suitcases and shopping.",
        gmc: "Older parents who want space to rest.",
        van: "Groups and anyone carrying Zamzam water.",
      }),
      list("Mention in your request", [
        "Hotel name and checkout time",
        "Flight number and airline",
        "Number of suitcases and any Zamzam containers",
        "Wheelchairs or other mobility needs",
      ]),
    ],
    faqs: [
      ["How early should I leave Makkah for my flight?", "Earlier than feels necessary, especially after a congregational prayer or during busy seasons. We will suggest a time based on your check-in deadline."],
      ["Can we stop on the way?", "Ask in your request. Stops are available on request and subject to driver and partner confirmation."],
      ["Can you collect from districts away from the Haram?", "Yes. Districts such as Aziziyah are often easier for vehicles."],
    ],
    links: [
      ["/services/airport-transfers/jeddah-airport/", "Jeddah airport transfers"],
      ["/saudi-arabia/makkah-to-madinah/", "Going on to Madinah instead"],
      ["/saudi-arabia/makkah-to-riyadh/", "Returning to Riyadh by road"],
    ],
    cta: { title: "Flying home from Jeddah?", text: "Send your hotel and flight for a pickup time and fare." },
  },

  "/saudi-arabia/makkah-to-madinah/": {
    title: "Makkah to Madinah Private Transfer | Hotel to Hotel",
    description: "Private car from your Makkah hotel to your Madinah hotel after Umrah, with stops on request and space for luggage and Zamzam. Request a quote.",
    h1: "Makkah to Madinah, hotel to hotel",
    intro: [
      "After Umrah, many families go on to Madinah to visit the Prophet's Mosque. It is a long road between the two holy cities.",
      "A private car collects you near your Makkah hotel and drops you as close to your Madinah hotel as access rules allow.",
    ],
    opposite: "Going the other way for Umrah?",
    blocks: [
      points("Road or train?", [
        ["Haramain High Speed Railway", "Fast between the two cities, but you still need transport at both ends, and luggage has to be moved twice."],
        ["Private car", "One vehicle from door to door, with stops when you need them. Often easier with children, older relatives or a lot of luggage."],
      ]),
      prose("Arriving in Madinah",
        "Roads around the Prophet's Mosque can be busy at prayer times. Ask your hotel which side to approach from, and we will plan the drop-off around it.",
        "Madinah city and the Prophet's Mosque are separate matters: Saudi eVisa terms bar non-Muslims from the Prophet's Mosque and its premises. Check current official guidance before travelling."),
      list("Before you leave Makkah", [
        "Check out before the crowds after a congregational prayer",
        "Seal Zamzam containers well and count them in your luggage",
        "Agree a meeting point your hotel can reach by car",
        "Eat before departure and keep water in the cabin",
      ]),
      vehicleOptions("Vehicles for a long drive", "Choose for comfort over several hours.", {
        suv: "Small families with luggage.",
        gmc: "Older passengers and long-distance comfort.",
        van: "Family groups who want to arrive together.",
        sedan: "Two travellers with light luggage.",
      }),
      steps("Booking Makkah to Madinah",
        ["Give both hotels", "Names and districts."],
        ["Choose the time", "And any stop you would like."],
        ["Review the fare", "Before anything is booked."]),
    ],
    faqs: [
      ["Can we stop for prayer or food?", "Ask in your request. Stops are available on request and subject to driver and partner confirmation."],
      ["Do you go back to Makkah afterwards?", "Yes, ask for Madinah to Makkah when you are ready. The Ministry of Hajj and Umrah lists Dhul Hulayfah as the Miqat for those setting out from Madinah; follow its guidance at haj.gov.sa."],
      ["Is this possible during Hajj?", "Access to Makkah is controlled during the Hajj period. Pickups depend on the permissions in force on the day."],
    ],
    links: [
      ["/saudi-arabia/madinah-to-makkah/", "Returning to Makkah"],
      ["/services/airport-transfers/madinah-airport/", "Flying out of Madinah"],
      ["/saudi-arabia/madinah-to-riyadh/", "Going on to Riyadh"],
    ],
    cta: { title: "Continuing to Madinah?", text: "Send both hotels and your preferred time." },
  },

  "/saudi-arabia/madinah-to-makkah/": {
    title: "Madinah to Makkah Private Transfer | For Umrah",
    description: "Private car from your Madinah hotel to Makkah for Umrah, with time at the Miqat on request. Hotel to hotel, for Muslim passengers. Request a quote.",
    h1: "Madinah to Makkah for Umrah",
    intro: [
      "Pilgrims who begin their visit in Madinah travel on to Makkah for Umrah. The journey has one important stop: the Miqat on the way out of Madinah.",
      "Tell us your plans and the stop is built into the trip.",
    ],
    opposite: "Visiting Madinah after Umrah?",
    blocks: [
      holyCities,
      prose("The Miqat on this route",
        "The Ministry of Hajj and Umrah lists Dhul Hulayfah, also known as Abyar Ali, as the Miqat for those setting out from Madinah. If you plan to enter ihram there, say so and how long you would like for washing, changing and prayer. For the rulings themselves, follow haj.gov.sa."),
      list("Before you set off", [
        "Arrange your Umrah permit through official channels",
        "Keep ihram garments and documents in the cabin",
        "Ask your Makkah hotel where vehicles may stop",
        "Mention wheelchairs or help needed getting in and out",
      ]),
      vehicleOptions("Choosing a vehicle", "Think about getting in and out in ihram, and about rest on a long road.", {
        sedan: "A couple with light luggage.",
        suv: "Small families.",
        gmc: "Older parents on a long drive.",
        van: "Groups performing Umrah together.",
      }),
      steps("Booking Madinah to Makkah",
        ["Give both hotels", "Names and districts."],
        ["Mention the Miqat stop", "And how long you need."],
        ["Review the fare", "Vehicle and price together."],
        ["Agree the pickup", "With a contact for the day."]),
    ],
    faqs: [
      ["Can non-Muslim family members travel with us?", "Not into Makkah. Only Muslims may enter the Sacred Area. Please plan separate arrangements before booking."],
      ["Is the train an option?", "Yes, the Haramain High Speed Railway links Madinah and Makkah. A private car avoids moving luggage between stations and hotels."],
      ["Can the car reach my Makkah hotel entrance?", "It depends on the hotel and traffic controls at that hour, and is not guaranteed."],
    ],
    links: [
      ["/saudi-arabia/makkah-to-madinah/", "Makkah to Madinah"],
      ["/saudi-arabia/makkah-to-jeddah/", "Flying home from Jeddah afterwards"],
      ["/saudi-arabia/riyadh-to-makkah/", "Coming from Riyadh"],
    ],
    cta: { title: "Travelling to Makkah for Umrah?", text: "Send both hotels and your Miqat plans for a fare." },
  },

  "/saudi-arabia/jeddah-to-madinah/": {
    title: "Jeddah to Madinah Private Transfer | Airport or City",
    description: "Private car from Jeddah airport or any Jeddah address to your Madinah hotel. Space for luggage, stops on request. Request a quote.",
    h1: "Jeddah to Madinah by private car",
    intro: [
      "Many visitors land in Jeddah and want to start their trip in Madinah. Others live in Jeddah and drive up to pray at the Prophet's Mosque.",
      "Either way, a private car takes you from the arrivals hall or your door to your hotel in Madinah.",
    ],
    opposite: "Heading back to Jeddah?",
    blocks: [
      points("Road or train?", [
        ["Haramain High Speed Railway", "Links Jeddah, including a station at King Abdulaziz International Airport, with Madinah. Quick, but you still need transport at the Madinah end."],
        ["Private car", "Door to door with all your bags, and stops when you want them. A long drive, so plan for rest."],
      ]),
      points("Where the journey starts", [
        ["King Abdulaziz International Airport", "Share your flight number. Check your terminal on your latest airline confirmation."],
        ["Jeddah hotels and homes", "Any district, with a pin."],
      ]),
      prose("Arriving in Madinah",
        "Ask your hotel which side of the Prophet's Mosque to approach from, especially near prayer times. Saudi eVisa terms bar non-Muslims from the Prophet's Mosque and its premises; check current guidance if anyone in your party is not Muslim."),
      vehicleOptions("Choosing a vehicle", "After a flight, extra space is worth it.", {
        sedan: "Two travellers with cabin bags.",
        suv: "Families with checked luggage.",
        gmc: "Comfort for a long drive after a flight.",
        van: "Groups and large families.",
      }),
      steps("Booking Jeddah to Madinah",
        ["Send the start point", "Flight number or address."],
        ["Give your Madinah hotel", "And any stop you want."],
        ["Review the fare", "Before anything is booked."]),
    ],
    faqs: [
      ["Can we rest on the way?", "Ask in your request. Stops are available on request and subject to driver and partner confirmation."],
      ["Can we go via Makkah?", "Only if every passenger may enter Makkah. Request it as a separate stop so it can be planned and priced."],
      ["What if the flight is late?", "Share the flight number so the pickup can be adjusted where possible."],
    ],
    links: [
      ["/services/airport-transfers/jeddah-airport/", "Jeddah airport transfers"],
      ["/services/airport-transfers/madinah-airport/", "Madinah airport transfers"],
      ["/saudi-arabia/madinah-to-makkah/", "Madinah to Makkah for Umrah"],
    ],
    cta: { title: "Starting your trip in Madinah?", text: "Send your flight or address and your hotel." },
  },

  "/saudi-arabia/madinah-to-jeddah/": {
    title: "Madinah to Jeddah Private Car | Airport and City Drop-off",
    description: "Private car from your Madinah hotel to King Abdulaziz International Airport or any Jeddah address. Timed around your flight. Request a quote.",
    h1: "Madinah to Jeddah by private car",
    intro: [
      "Ending a visit in Madinah with a flight from Jeddah means a long drive with a fixed deadline at the end.",
      "We plan the pickup around your check-in time, with room for the unexpected.",
    ],
    opposite: "Travelling up to Madinah?",
    blocks: [
      steps("Planning around a flight",
        ["Start from the check-in deadline", "And work backwards."],
        ["Allow for the distance", "This is a long drive; leave a generous margin."],
        ["Confirm the terminal", "JED terminal assignments have been changing."],
        ["Agree the hotel pickup point", "Near the Prophet's Mosque, access can be limited at prayer times."]),
      points("Where you can be dropped", [
        ["King Abdulaziz International Airport", "Give the airline and terminal on your latest booking."],
        ["Jeddah hotels and homes", "Any district, with a pin."],
        ["Jeddah's Haramain station", "If you are continuing by train."],
      ]),
      vehicleOptions("Vehicles for the drive", "Luggage often grows during a visit.", {
        sedan: "Two travellers with light bags.",
        suv: "Families with suitcases.",
        gmc: "A comfortable long drive before a flight.",
        van: "Groups and large families.",
      }),
      list("Mention in your request", [
        "Hotel name and checkout time",
        "Flight number and airline",
        "Number of bags, including dates and gifts",
        "Any stop you would like on the way",
      ]),
    ],
    faqs: [
      ["Would the train be quicker?", "The Haramain High Speed Railway links Madinah and Jeddah, including the airport. A car suits you if you have a lot of luggage or want door-to-door travel."],
      ["Can we visit Makkah on the way?", "Only if every passenger may enter Makkah, and only if your timing allows. Request it as a separate stop."],
      ["How early should we leave?", "We will suggest a time from your check-in deadline. When in doubt, leave earlier."],
    ],
    links: [
      ["/services/airport-transfers/jeddah-airport/", "Jeddah airport transfers"],
      ["/saudi-arabia/madinah-to-makkah/", "Going to Makkah instead"],
      ["/saudi-arabia/madinah-to-riyadh/", "Returning to Riyadh"],
    ],
    cta: { title: "Flying from Jeddah after Madinah?", text: "Send your hotel and flight for a pickup time and fare." },
  },
} satisfies Record<string, RouteContent>;

export const internationalCorridors = {
  "/international-transfers/dammam-to-bahrain/": {
    title: "Dammam to Bahrain Private Transfer | Also Khobar and Dhahran",
    description: "Private car from Dammam, Khobar or Dhahran across the King Fahd Causeway to Manama, Seef, Juffair or Muharraq. Prepare documents and request a quote.",
    h1: "Dammam and Khobar to Bahrain",
    intro: [
      "From the Eastern Province, Bahrain is the closest border crossing in the Gulf. The King Fahd Causeway leaves the Saudi coast at Khobar, a short drive from Dammam and Dhahran.",
      "Most of the trip is the causeway and its border station, so timing matters more than distance.",
    ],
    opposite: "Coming back from Bahrain?",
    blocks: [
      points("Pickups in the Eastern Province", [
        ["Dammam", "Homes, hotels, offices and the port. A map pin helps."],
        ["Khobar", "Corniche hotels, compounds and Half Moon Bay."],
        ["Dhahran", "Campuses and compounds; meet at the visitor gate unless the vehicle has been cleared."],
        ["King Fahd International Airport (DMM)", "Share your flight number, and make sure you can enter Bahrain after landing."],
      ]),
      prose("The crossing",
        "The King Fahd Causeway Authority runs the causeway and its tolls, payable in cash, through the JESR app or other channels at the toll gates. Whether the toll is included is stated in your fare.",
        "Thursday evenings and holidays are the busiest. Check the causeway's official channels for its status before you set off."),
      list("Documents for every passenger", [
        "Travel documents accepted by the Saudi and Bahraini authorities for your nationality",
        "A Bahrain visa or eVisa if your nationality needs one",
        "For Saudi residents: a valid iqama and exit/re-entry permission where it applies",
        "Documents and any consent letters for children",
      ], "Passengers must independently verify current travel documents and entry requirements."),
      note("No one can promise entry", "Admission is decided by border officers. We coordinate the car and the plan, and cannot guarantee clearance or waiting times."),
      vehicleOptions("Vehicles for Bahrain", "Vehicle and driver must also be cleared for the crossing.", {
        sedan: "Business visitors and couples.",
        suv: "Weekend families.",
        gmc: "A comfortable wait if the queue is slow.",
        van: "Groups going to an event.",
      }),
    ],
    faqs: [
      ["Can I go straight to Bahrain International Airport?", "Yes, if you can enter Bahrain. Leave a generous margin for the causeway."],
      ["Can you collect me from Khobar instead of Dammam?", "Yes. Give the address; this page covers Dammam, Khobar and Dhahran."],
      ["Is the toll included?", "It is stated with your fare."],
    ],
    links: [
      ["/international-transfers/riyadh-to-bahrain/", "Starting from Riyadh"],
      ["/services/airport-transfers/dammam-airport/", "Dammam airport transfers"],
      ["/saudi-arabia/riyadh-to-khobar/", "Riyadh to Khobar"],
    ],
    cta: { title: "Crossing to Bahrain?", text: "Send your pickup, date and nationalities." },
  },

  "/international-transfers/bahrain-to-dammam/": {
    title: "Bahrain to Dammam Private Transfer | Also Khobar and Dhahran",
    description: "Private car from Manama, Seef, Juffair or Bahrain Airport across the King Fahd Causeway to Dammam, Khobar or Dhahran. Request a quote.",
    h1: "Bahrain to Dammam and Khobar",
    intro: [
      "Weekend visitors heading home, business travellers with meetings in Dhahran, and passengers flying out of King Fahd International all make this short but border-bound trip.",
      "Have the Saudi side of your documents ready and the rest is straightforward.",
    ],
    opposite: "Going the other way?",
    blocks: [
      points("Pickups in Bahrain", [
        ["Hotels", "Manama, Seef, Juffair and Amwaj: give the entrance and checkout time."],
        ["Homes", "Building, road and block numbers, as used locally."],
        ["Bahrain International Airport", "Share your flight, and check you can enter Bahrain before leaving it."],
      ]),
      prose("Entering Saudi Arabia",
        "Saudi Arabia launched Absher Travel for Visitors for land arrivals on 26 October 2026. The Saudi Press Agency reported that it becomes mandatory six months after launch, so check the Ministry of Interior's announcement for the effective date.",
        "Alcohol, pork products and other prohibited goods must not be carried. Each passenger answers for their own luggage."),
      points("Drop-offs in the Eastern Province", [
        ["Khobar", "The first city after the causeway: hotels, compounds and offices."],
        ["Dhahran", "Campus and compound gates."],
        ["Dammam", "Any district, the port, or King Fahd International Airport."],
      ]),
      vehicleOptions("Vehicle options", "Allow for shopping and time at the border.", {
        sedan: "One or two travellers.",
        suv: "Families after a weekend.",
        gmc: "Executives and arriving guests.",
        van: "Groups travelling together.",
      }),
      note("Entry to Saudi Arabia", "Saudi officials decide on admission. A reserved car does not secure a visa or clearance."),
    ],
    faqs: [
      ["Can I be dropped at King Fahd International for a flight?", "Yes. Leave a generous margin for the causeway and the border."],
      ["When is the causeway quietest?", "It varies. Check its official channels before setting out, and avoid the end of weekends and holidays where you can."],
      ["Do you go on to Riyadh?", "Yes, ask for Bahrain to Riyadh instead."],
    ],
    links: [
      ["/international-transfers/bahrain-to-riyadh/", "Going all the way to Riyadh"],
      ["/services/airport-transfers/dammam-airport/", "Dammam airport transfers"],
      ["/saudi-arabia/khobar-to-riyadh/", "Khobar to Riyadh"],
    ],
    cta: { title: "Being collected in Bahrain?", text: "Send your hotel or address and where you are going." },
  },
} satisfies Record<string, RouteContent>;

export const business = {
  name: "Cornerstone Home Inspection LLC",
  shortName: "Cornerstone",
  inspector: "John Nichols",
  credentials: "Certified Home Inspector",
  licensedLine:
    "Cornerstone Home Inspection is a Michigan-licensed inspection company",
  tagline: "We Protect Your Interests",
  heroStatement:
    "Every inspection ends with a clear, detailed report: what's wrong, why it matters, and what to do about it.",
  location: "Southeastern Michigan",
  region: "Southeastern Michigan",
  phone: "(734) 338-5320",
  phoneTel: "+17343385320",
  email: "GetCornerstoneHI@Gmail.com",
  hours: "Call or email to schedule",
  hoursShort: "We Protect Your Interests",
} as const;

/** About Me copy — edit these paragraphs to change the homepage About section. */
export const aboutCopy = {
  heading: "Hi, I am John Nichols",
  paragraphs: [
    "Cornerstone Home Inspection LLC is a Michigan-licensed inspection company. When you hire Cornerstone, you get one inspector on site, one person on the phone, and one report written for you — not a franchise checklist.",
    "My background experience consists of home construction, roofing, electrical, and irrigation systems. This experience brings a critical eye to pinpoint issues more efficiently and thoroughly.",
    "I inspect homes across Southeastern Michigan for buyers and sellers. The name is the job: we look at the foundation of the deal, the house itself, so you can protect your interests before you sign.",
    "A typical inspection covers the structure, roof, electrical, plumbing, HVAC, and the rest of the accessible systems.",
    "When a roof is hard to reach or unsafe, drone imaging helps me document the covering, flashing, and layout without guessing from the ground. When heat, moisture, or electrical problems are hiding behind walls, thermal imaging helps locate faulty circuits, insulation gaps, heating and cooling losses, and water intrusion. These are some of the additional services I can provide.",
    "You are invited to walk the property with me. I encourage my clients to be present during the inspection and ask questions. When we are done, you leave with a clear, detailed report: what is wrong, why it matters, and what to do about it.",
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/schedule", label: "Schedule" },
] as const;

export const heroServices = [
  {
    title: "Home Inspection",
    body: "A complete look at the home’s systems and structure so you can buy or sell with a clear picture of the property.",
  },
  {
    title: "Pre-listing Inspection",
    body: "Find issues before the house hits the market so you can repair, disclose, and price with fewer surprises.",
  },
  {
    title: "Condo Inspection",
    body: "A focused inspection of the unit you are buying, with clarity on what is yours versus the association’s.",
  },
] as const;

export const coreServices = [
  {
    title: "Full home inspection",
    body: "Inspection of the entire property so you understand safety, condition, and long-term value.",
  },
  {
    title: "Pre-listing inspection",
    body: "Find issues before the house hits the market so you can repair, disclose, and price with fewer surprises.",
  },
  {
    title: "Condo inspection",
    body: "A focused inspection of the unit you are buying, with clarity on what is yours versus the association’s.",
  },
] as const;

export const addonServices = [
  {
    title: "Thermal imaging",
    body: "Locate faulty electrical circuits, improper insulation, heating and cooling inefficiencies, and water intrusions.",
  },
  {
    title: "Drone imaging",
    body: "Aid in roof inspections, property layouts, and video if desired.",
  },
  {
    title: "Wood-destroying insects",
    body: "Looking for termites, carpenter ants, and other wood-damaging pests. Add this to a full inspection when you want a dedicated pest check.",
  },
  {
    title: "Radon gas test",
    body: "Measuring radon levels so you know the risk before you close, not after you move in.",
  },
  {
    title: "Mold inspection",
    body: "Identifying mold and moisture-prone areas before they become a larger problem.",
  },
  {
    title: "Lawn irrigation system inspection",
    body: "Verifies system components present, the condition of those components, and the location of valve boxes for all zones.",
  },
] as const;

export const inspectItems = [
  { title: "Interior and Exterior", detail: "Siding, windows, doors, grading, and living spaces." },
  { title: "Basement", detail: "Foundation, moisture, and structural signs you can see." },
  { title: "HVAC", detail: "Heating, cooling, and distribution equipment." },
  { title: "Fireplace", detail: "Visible firebox, damper, and venting components." },
  { title: "Roof", detail: "Coverings, flashing, drainage, and chimney." },
  { title: "Electrical System", detail: "Service, panels, wiring, and fixtures." },
  { title: "Plumbing", detail: "Supply, drain, water heater, and visible fixtures." },
  { title: "Attic", detail: "Insulation, ventilation, and roof structure from above." },
  { title: "Heating and Cooling", detail: "How the systems run today and what that means next season." },
] as const;

export const scheduleSubjects = [
  "Schedule a home inspection",
  "Thermal imaging",
  "Drone imaging",
  "Wood-destroying insects",
  "Radon gas test",
  "Mold inspection",
  "Lawn irrigation system inspection",
  "Pre-listing inspection",
  "Condo inspection",
  "Question about pricing",
  "Other",
] as const;

export const scheduleAddons = [
  "Thermal imaging",
  "Drone imaging",
  "Wood-destroying insects",
  "Radon gas test",
  "Mold inspection",
  "Lawn irrigation system inspection",
] as const;

export const faqGroups = [
  {
    heading: "Why should I hire you?",
    items: [
      {
        q: "What makes your service exceptional?",
        a: "Cornerstone Home Inspection LLC is owner-operated by John Nichols. You are not a file in a call center. The job is to protect your interests: a careful walkthrough and a report that names what is wrong, why it matters, and what to do about it.",
      },
      {
        q: "Are you licensed in Michigan?",
        a: "Yes. Cornerstone Home Inspection is a Michigan-licensed inspection company, owned and operated by certified home inspector John Nichols. If you would like a copy of credentials before we book, email GetCornerstoneHI@Gmail.com or call (734) 338-5320.",
      },
      {
        q: "How do you work with clients?",
        a: "You are welcome on the inspection. Ask questions while we are in the attic, at the panel, and in the basement. Afterward you get a written report you can share with your realtor and use in negotiations.",
      },
    ],
  },
  {
    heading: "What really matters?",
    items: [
      {
        q: "What will the report include?",
        a: "A clear, detailed report covering the systems and components inspected, with photos where they help. Each finding is explained in plain language: what we saw, why it matters, and the recommended next step.",
      },
      {
        q: "Where do you inspect?",
        a: "We serve Southeastern Michigan, including the 734 area and surrounding communities. If you are unsure whether your property is in range, call (734) 338-5320.",
      },
      {
        q: "How do I get a price?",
        a: "Pricing depends on the size of the home and any add-ons you want: thermal imaging, drone imaging, wood-destroying insects, radon gas test, mold inspection, or a lawn irrigation system inspection. Call or send the property address through the schedule form and we will quote you directly.",
      },
    ],
  },
  {
    heading: "What do you do?",
    items: [
      {
        q: "What is included in a home inspection?",
        a: "A visual inspection of accessible interior and exterior, roof, attic, basement, electrical, plumbing, HVAC, and other major systems. Limitations (snow-covered roofs, finished walls, locked rooms) are noted in the report.",
      },
      {
        q: "What add-on services can I book?",
        a: "Add-ons include thermal imaging, drone imaging, wood-destroying insects, a radon gas test, mold inspection, and a lawn irrigation system inspection. The irrigation inspection verifies that system components are present, the condition of those components, and the location of valve boxes for all zones. Tell us which add-ons you want when you schedule.",
      },
      {
        q: "Do you offer thermal imaging?",
        a: "Yes. Thermal imaging is an add-on. It helps locate faulty electrical circuits, improper insulation, heating and cooling inefficiencies, and water intrusions. Ask to add it when you book, or request it on its own if you already have a specific concern.",
      },
      {
        q: "Do you offer drone imaging?",
        a: "Yes. Drone imaging is an add-on. It aids roof inspections, property layouts, and video if desired. It is especially useful on steep or high roofs and when you want a clear view of the lot. Tell us when you schedule so we plan for weather and site access.",
      },
      {
        q: "Do you test for radon, mold, or wood-destroying insects?",
        a: "Yes. A radon gas test, mold inspection, and wood-destroying insect check are all add-on services. They can be added to a full home inspection or scheduled on their own. Ask when you book so we bring the right equipment.",
      },
      {
        q: "Do you inspect lawn irrigation systems?",
        a: "Yes. A lawn irrigation system inspection is an add-on. The test verifies system components present, condition of components, and location of valve boxes for all zones.",
      },
      {
        q: "Do you inspect condos?",
        a: "Yes. Condo inspections focus on the unit and the systems you are responsible for. Association-maintained exteriors and roofs can be discussed when you schedule.",
      },
    ],
  },
  {
    heading: "What should I do?",
    items: [
      {
        q: "Should I attend the inspection?",
        a: "Please do. Walking the home with your inspector is the fastest way to understand the report and the house you are about to buy.",
      },
      {
        q: "How do I schedule?",
        a: "Call or text (734) 338-5320, email GetCornerstoneHI@Gmail.com, or use the schedule form. Include the property address and your closing timeline if you have one. The site sends an immediate written response so you know we received the request.",
      },
      {
        q: "What tools do you use during inspections?",
        a: "Standard inspection tools for a thorough visual evaluation of accessible systems, plus add-ons such as thermal imaging, drone imaging, radon, mold, wood-destroying insects, and lawn irrigation when you request them. If you have a specific concern (moisture, electrical, roof, irrigation), tell us when you book.",
      },
    ],
  },
] as const;

import { business } from "@/lib/business";

export type InspectionRequest = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  address: string;
  message: string;
  addons: string[];
};

export type AutoReply = {
  subject: string;
  greeting: string;
  body: string;
  closing: string;
  fullText: string;
  topics: string[];
};

function includesAny(text: string, needles: string[]) {
  const haystack = text.toLowerCase();
  return needles.some((needle) => haystack.includes(needle));
}

export function composeAutoReply(request: InspectionRequest): AutoReply {
  const blob = `${request.subject} ${request.message} ${request.addons.join(" ")}`.toLowerCase();
  const topics: string[] = [];

  if (includesAny(blob, ["thermal", "infrared", "ir camera", "hot spot"])) {
    topics.push("thermal imaging");
  }
  if (includesAny(blob, ["drone", "aerial", "roof video", "property layout"])) {
    topics.push("drone imaging");
  }
  if (includesAny(blob, ["radon"])) topics.push("radon gas test");
  if (includesAny(blob, ["mold"])) topics.push("mold inspection");
  if (includesAny(blob, ["wood-destroying", "termite", "carpenter ant", "wdi"])) {
    topics.push("wood-destroying insects");
  }
  if (includesAny(blob, ["irrigation", "sprinkler", "valve box"])) {
    topics.push("lawn irrigation system inspection");
  }
  if (includesAny(blob, ["condo"])) topics.push("condo inspection");
  if (includesAny(blob, ["pre-list", "prelist", "seller", "listing"])) {
    topics.push("pre-listing inspection");
  }
  if (
    topics.length === 0 ||
    includesAny(blob, ["home inspection", "full inspection", "buy", "purchase"])
  ) {
    if (!topics.includes("home inspection")) topics.unshift("home inspection");
  }

  const firstName = request.name.split(/\s+/)[0] || request.name;
  const greeting = `Hello ${firstName},`;

  const lines: string[] = [];
  lines.push(
    `Thank you for contacting ${business.name}. This is an automatic reply from ${business.inspector} so you know your request was received. I will follow up personally to confirm timing and a quote.`,
  );

  if (request.address) {
    lines.push(`I have the property noted as ${request.address}.`);
  } else {
    lines.push(
      "If you have not already, please reply with the property address and preferred inspection window so I can quote accurately.",
    );
  }

  if (topics.includes("thermal imaging")) {
    lines.push(
      "Thermal imaging can be added to locate faulty electrical circuits, improper insulation, heating and cooling inefficiencies, and water intrusions.",
    );
  }
  if (topics.includes("drone imaging")) {
    lines.push(
      "Drone imaging can aid the roof inspection, document the property layout, and include video if you want it. Weather and site access can affect when we fly.",
    );
  }
  if (topics.includes("radon gas test")) {
    lines.push(
      "A radon gas test can be added during the inspection window so you have a result before you waive contingencies.",
    );
  }
  if (topics.includes("mold inspection")) {
    lines.push(
      "A mold inspection looks at moisture-prone areas and documents findings in plain language with next steps.",
    );
  }
  if (topics.includes("wood-destroying insects")) {
    lines.push(
      "A wood-destroying insect check looks for termites, carpenter ants, and other wood-damaging pests and can be added to the inspection.",
    );
  }
  if (topics.includes("lawn irrigation system inspection")) {
    lines.push(
      "A lawn irrigation system inspection verifies that system components are present, the condition of those components, and the location of valve boxes for all zones.",
    );
  }

  lines.push(
    `If you need a same-day answer, call or text ${business.phone}. Otherwise I will be in touch to lock in the appointment.`,
  );

  const closing = `${business.inspector}\n${business.credentials}\n${business.name}\n${business.phone}\n${business.email}\n${business.tagline}`;
  const body = lines.join("\n\n");
  const subject = `We received your ${topics[0] ?? "inspection"} request`;
  const fullText = `${greeting}\n\n${body}\n\n${closing}`;

  return { subject, greeting, body, closing, fullText, topics };
}

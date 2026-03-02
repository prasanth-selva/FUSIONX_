export const SYMPOSIUM_DATE = new Date("2026-03-27T09:00:00+05:30");

export const COLLEGE_NAME = "KiTE";
export const SYMPOSIUM_NAME = "FUSION X '26";
export const TAGLINE = "WHERE INNOVATION TAKES FLIGHT";
export const SUB_TAGLINE = "KiTE's Premier Intercollegiate Technical Symposium";
export const HERO_DATE_DISPLAY = "MARCH 27, 2026";

export const SEQUENCE_1_COUNT = 147; // Frames 001-147 → Hero Cloud
export const SEQUENCE_2_COUNT = 147; // Frames 148-294 → Plane Morph

export type EventCategory = "technical" | "non-technical";

export interface EventRule {
  rule: string;
}

export interface SymposiumEvent {
  id: number;
  name: string;
  category: EventCategory;
  maxMembers: string;
  icon: string;
  image: string;
  description: string;
  color: string;
  rules: string[];
}

export const EVENTS: SymposiumEvent[] = [
  // ─── Technical ──────────────────────────────────────────────
  {
    id: 1,
    name: "Paper Presentation",
    category: "technical",
    maxMembers: "Max. 3 Members",
    icon: "📄",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=70&auto=format&fit=crop",
    description:
      "Present your cutting-edge research and ideas to a panel of expert judges. Demonstrate depth of knowledge and scientific rigor.",
    color: "#c8a96e",
    rules: [
      "Maximum 2–3 members per team",
      "Abstract (250–300 words) must be submitted prior to the event",
      "Presentation time: 8 minutes + 2 minutes Q&A",
      "PPT is mandatory",
      "Plagiarism above 20% will lead to disqualification",
    ],
  },
  {
    id: 2,
    name: "Project Expo",
    category: "technical",
    maxMembers: "Max. 3 Members",
    icon: "🔬",
    image: "https://images.unsplash.com/photo-1581092160607-ee22731c9adb?w=600&q=70&auto=format&fit=crop",
    description:
      "Showcase your working prototype or simulation. Innovation, practicality, and technical depth will be evaluated by industry experts.",
    color: "#c8a96e",
    rules: [
      "Maximum 3 members per team",
      "Working model preferred (prototype or simulation allowed)",
      "Teams must bring their own required components",
      "Presentation time: 10 minutes including demo",
      "Innovation, practicality, and technical depth will be evaluated",
      "Any unsafe setup will be disqualified",
    ],
  },
  {
    id: 3,
    name: "Poster Presentation",
    category: "technical",
    maxMembers: "Max. 2 Members",
    icon: "🖼️",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=70&auto=format&fit=crop",
    description:
      "Visual storytelling meets technical precision. Present complex ideas through a beautifully crafted A1 poster.",
    color: "#c8a96e",
    rules: [
      "Individual or team of 2 allowed",
      "Poster size: A1 (vertical preferred)",
      "Must include: Title, Abstract, Methodology, Conclusion",
      "4.5 minutes explanation + 3 minutes Q&A",
      "Posters must be original work",
    ],
  },
  {
    id: 4,
    name: "Quiz",
    category: "technical",
    maxMembers: "2 Members",
    icon: "🧠",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=70&auto=format&fit=crop",
    description:
      "Test your knowledge across domains in a fast-paced Kahoot-based challenge. No AI allowed — pure intellect wins here.",
    color: "#c8a96e",
    rules: [
      "Team of 2 members",
      "Kahoot link will be shared on the day",
      "No using AI tools",
      "Top 10 will be selected and moved to the next round",
    ],
  },
  {
    id: 5,
    name: "Vibathon",
    category: "technical",
    maxMembers: "2–4 Members",
    icon: "⚡",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=600&q=70&auto=format&fit=crop",
    description:
      "A rapid-fire vibe-coding hackathon. A problem will be given on spot — you have 1 hour to build a complete solution. AI is your co-pilot.",
    color: "#c8a96e",
    rules: [
      "Team of 2–4 members",
      "Problem will be given on spot",
      "Duration: 1 hour",
      "Can use any AI model to build a solution",
      "Solution exceeding 90% plagiarism will be disqualified",
    ],
  },
  {
    id: 6,
    name: "Build a Circuit",
    category: "technical",
    maxMembers: "2–4 Members",
    icon: "🔌",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=70&auto=format&fit=crop",
    description:
      "Circuit function revealed on the spot. Design and simulate using TinkerCAD or Wokwi — no AI allowed. Pure engineering skill.",
    color: "#c8a96e",
    rules: [
      "Team of 2–4 members",
      "Circuit function will be given on spot",
      "Team can use TinkerCAD or Wokwi for simulation",
      "Using AI for any purpose will lead to disqualification",
    ],
  },
  {
    id: 7,
    name: "UI/UX Design Challenge",
    category: "technical",
    maxMembers: "Max. 3 Members",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=70&auto=format&fit=crop",
    description:
      "Design a stunning and user-centric interface in 60 minutes. Theme announced on the spot. Tools: Figma, Adobe XD, or Canva.",
    color: "#c8a96e",
    rules: [
      "Individual or team of up to 3 allowed",
      "The theme will be announced on the spot",
      "Duration: 1 hour",
      "Allowed tools: Figma / Adobe XD / Canva",
      "Judging based on creativity, usability, and clarity",
    ],
  },
  {
    id: 8,
    name: "Logo Design Challenge",
    category: "technical",
    maxMembers: "Max. 3 Members",
    icon: "✏️",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=70&auto=format&fit=crop",
    description:
      "Brand a startup in 60 minutes. Create a compelling logo and 100-word brand explanation. AI-generated logos are not allowed.",
    color: "#c8a96e",
    rules: [
      "Individual or team of up to 3 members",
      "Theme or startup idea will be provided",
      "Duration: 60 minutes",
      "Must include logo + short brand explanation (100 words)",
      "AI-generated logos are not allowed unless specified",
    ],
  },
  // ─── Non-Technical ──────────────────────────────────────────
  {
    id: 9,
    name: "BGMI",
    category: "non-technical",
    maxMembers: "Max. 4 Members",
    icon: "🎮",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=70&auto=format&fit=crop",
    description:
      "Battle Grounds Mobile India — squad up and dominate the battleground. Only phones permitted. Show your tactical supremacy.",
    color: "#6e4fc8",
    rules: [
      "Individual or team up to 4 members",
      "No emulators allowed",
      "Only phones are permitted",
    ],
  },
  {
    id: 10,
    name: "FREE FIRE",
    category: "non-technical",
    maxMembers: "Max. 4 Members",
    icon: "🔥",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=70&auto=format&fit=crop",
    description:
      "Garena Free Fire battle royale showdown. Form your squad, survive, and claim the Booyah! Mobile devices only.",
    color: "#6e4fc8",
    rules: [
      "Individual or team up to 4 members",
      "No emulators allowed",
      "Only phones are permitted",
    ],
  },
];

export const TECH_EVENTS = EVENTS.filter((e) => e.category === "technical");
export const NON_TECH_EVENTS = EVENTS.filter(
  (e) => e.category === "non-technical"
);

export const PARTICIPATION_RULE =
  "One participant can register for a maximum of 2 events: 1 Technical + 1 Non-Technical  OR  2 Technical events.";

export const MARQUEE_ITEMS = [
  "PAPER PRESENTATION",
  "PROJECT EXPO",
  "VIBATHON",
  "BUILD A CIRCUIT",
  "UI/UX CHALLENGE",
  "LOGO DESIGN",
  "POSTER PRESENTATION",
  "QUIZ",
  "BGMI",
  "FREE FIRE",
];

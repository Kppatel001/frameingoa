// Fun "builder title" generator. Maps a role/stack to a pool of hacker-y titles
// and picks one at random so users can re-roll for variety.

type Pool = { match: RegExp; titles: string[] };

const POOLS: Pool[] = [
  { match: /\b(front[\s-]?end|react|next\.?js|vue|angular|svelte|ui)\b/i,
    titles: ["Pixel Wizard", "Interface Alchemist", "DOM Whisperer", "Frontend Sorcerer"] },
  { match: /\b(back[\s-]?end|node|django|rails|spring|api|server)\b/i,
    titles: ["API Alchemist", "Backend Beast", "Server Sorcerer", "Latency Slayer"] },
  { match: /\b(full[\s-]?stack)\b/i,
    titles: ["Code Architect", "Full-Stack Phantom", "End-to-End Engineer", "Stack Overlord"] },
  { match: /\b(ai|ml|machine|deep\s?learning|llm|nlp|genai|prompt)\b/i,
    titles: ["Prompt Hacker", "Neural Ninja", "Model Whisperer", "Gradient Wrangler"] },
  { match: /\b(data|analytics|sql|etl|warehouse)\b/i,
    titles: ["Data Druid", "Query Conjurer", "Insight Miner", "Pipeline Pilot"] },
  { match: /\b(devops|sre|infra|platform|kubernetes|docker|cloud)\b/i,
    titles: ["Cloud Commander", "Infra Wizard", "Uptime Guardian", "Deploy Daemon"] },
  { match: /\b(security|infosec|pentest|appsec|cyber)\b/i,
    titles: ["Digital Guardian", "Exploit Hunter", "Zero-Day Sentinel", "Cyber Ronin"] },
  { match: /\b(flutter|react\s?native|mobile|ios|android|swift|kotlin)\b/i,
    titles: ["Cross-Platform Ninja", "Mobile Maestro", "App Assassin", "Pocket Rocket Dev"] },
  { match: /\b(design|ux|product\s?design|figma)\b/i,
    titles: ["Vibe Architect", "Pixel Poet", "Experience Sculptor", "Design Renegade"] },
  { match: /\b(founder|ceo|cto|co[\s-]?founder|product\s?manager|\bpm\b)\b/i,
    titles: ["Chief Chaos Officer", "Vision Hacker", "Ship-It Captain", "Zero-to-One Builder"] },
  { match: /\b(blockchain|web3|solidity|smart\s?contract|crypto)\b/i,
    titles: ["Chain Reactor", "Block Builder", "Ledger Legend", "Web3 Wizard"] },
  { match: /\b(game|unity|unreal)\b/i,
    titles: ["Frame-Rate Fighter", "Level Designer", "Game Loop Guru"] },
  { match: /\b(embedded|hardware|iot|firmware|robotics)\b/i,
    titles: ["Silicon Shaman", "Circuit Sorcerer", "Bit Bender"] },
  { match: /\b(student|learning|beginner|fresher)\b/i,
    titles: ["Future Founder", "Rookie Renegade", "Builder-in-Training", "Next-Gen Hacker"] },
];

const GENERIC = ["Chaos Coder", "Idea Machine", "Midnight Shipper", "Hack Goblin", "Builder Supreme"];

export function generateFunTitle(role: string, seed?: number): string {
  const r = (role || "").trim();
  let pool = GENERIC;
  for (const p of POOLS) {
    if (p.match.test(r)) { pool = p.titles; break; }
  }
  const idx =
    seed == null ? Math.floor(Math.random() * pool.length) : Math.abs(seed) % pool.length;
  return pool[idx];
}

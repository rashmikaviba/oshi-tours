/* ═══════════════════════════════════════════════════════════
   OSHĪ — Leopard Wildlife Video Reveal Configuration
   ───────────────────────────────────────────────────────────
   Percentage-based coordinate system (`topPct`, `leftPct`) relative
   to the frozen leopard media frame (100% full-bleed image).
   
   To calibrate or reposition text over a new final-frame still:
   Adjust `topPct` (0 = top edge, 100 = bottom edge) and `leftPct`
   (0 = left edge, 100 = right edge) for each item below.
   ═══════════════════════════════════════════════════════════ */

export interface VideoRevealAnchor {
  id: string;
  topPct: number;    // Percentage from top of the media boundary (e.g. 16 = 16%)
  leftPct: number;   // Percentage from left of the media boundary (e.g. 11 = 11%)
  align: 'left' | 'right' | 'center';
  enterFrom: { x: number; y: number }; // Directional drift on reveal
  type: 'headline' | 'subcopy' | 'cta';
  eyebrow?: string;
  text: string;
  subtext?: string;
  href?: string;
  staggerIndex: number;
}

/* ── Media & Timing Constants ── */
export const VIDEO_REVEAL_CONFIG = {
  // Primary GIF path (Tiger.gif / leopard clip)
  gifPath: '/media/Tiger.gif',
  fallbackGifPath: '/media/Tiger.gif.gif',
  
  // Exact pixel-for-pixel static first frame before the GIF starts playing
  startImagePath: '/media/leopard-first-frame.jpg',
  
  // Exact pixel-for-pixel static final frame where the GIF freezes
  freezeImagePath: '/media/leopard-last-frame.jpg',
  fallbackFreezeImagePath: '/media/Tiger.gif',
  
  // Measured GIF play duration in milliseconds before crossfading to still
  // (Hard-coded measured play time: exactly 8000ms for 192 frames of Tiger.gif)
  durationMs: 8000,
};

/* ── Percentage Anchors Over Frozen Leopard Still Frame (Desktop/Tablet ≥ 768px) ── */
export const anchors: VideoRevealAnchor[] = [
  {
    id: 'headline',
    // ZONE 1 — top-left negative space above forest/moss background
    topPct: 16,
    leftPct: 11,
    align: 'left',
    enterFrom: { x: -28, y: 0 }, // drifts in from the left
    type: 'headline',
    eyebrow: 'WILD ENCOUNTERS',
    text: "The leopard's island.",
    staggerIndex: 0,
  },
  {
    id: 'subcopy',
    // ZONE 2 — top-right negative space opposite the leopard's resting head
    topPct: 15,
    leftPct: 84,
    align: 'right',
    enterFrom: { x: 28, y: 0 },  // drifts in from the right
    type: 'subcopy',
    text: "Sri Lanka holds the highest density of leopards on Earth. We know the light, the hours, and the places they roam.",
    staggerIndex: 1,
  },
  {
    id: 'cta',
    // ZONE 3 — bottom-left negative space below the branch
    topPct: 84,
    leftPct: 18,
    align: 'left',
    enterFrom: { x: 0, y: 24 },  // rises up from below
    type: 'cta',
    text: "Track the wild →",
    subtext: "Private safaris · Yala · Wilpattu",
    href: "#wildlife-journeys",
    staggerIndex: 2,
  },
];

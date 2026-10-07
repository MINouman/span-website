// Illustrated skyline across the top of the footer (client-requested, after a landscape-style footer
// reference): an amber sun setting behind three layers of Aftabnagar residential towers and a tower
// crane, fading through stone and slate into the ink footer. Layers get darker as they come forward,
// so the scene reads as depth. Decorative only. Clouds drift and the crane hook sways very slowly
// (globals.css, "Footer scene"); reduced motion holds them still.
//
// The towers come from a fixed seed, so the server and every visit draw the same skyline.
// The view box is 1440 wide; phones crop the sides (xMidYMax slice) and keep the sun and crane.
// Crane geometry is mirrored in globals.css (.footer-hook transform-origin).

const W = 1440
const H = 240
/** Empty sky trimmed off the top, so the scene stays short. */
const TOP = 55

type Tower = { x: number; w: number; h: number; roof: 0 | 1 | 2 }

function skyline(seed: number, minH: number, maxH: number, minW: number, maxW: number): Tower[] {
  let state = seed
  const rand = () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
  const towers: Tower[] = []
  let x = -10 - rand() * 20
  while (x < W) {
    const w = Math.round(minW + rand() * (maxW - minW))
    const h = Math.round(minH + rand() * (maxH - minH))
    towers.push({ x: Math.round(x), w, h, roof: Math.floor(rand() * 3) as 0 | 1 | 2 })
    x += w + Math.round(rand() * 14)
  }
  return towers
}

const far = skyline(7, 92, 168, 34, 70)
const mid = skyline(23, 58, 124, 40, 78)
const near = skyline(91, 26, 84, 46, 96)

// Tower crane: mast, jib and counter-jib, with a cable and hook hanging from the jib.
const crane = { x: 960, top: 74, jib: 96, left: 870, right: 1100, hook: 1070 }

function Towers({ towers, fill, windows }: { towers: Tower[]; fill: string; windows?: string }) {
  return (
    <g>
      {towers.map((t) => {
        const top = H - t.h
        return (
          <g key={`${t.x}-${t.w}`}>
            <rect x={t.x} y={top} width={t.w} height={t.h} fill={fill} />
            {/* Rooftop details: a stair core or a water tank, as on Dhaka apartment blocks. */}
            {t.roof === 1 ? (
              <rect x={t.x + t.w * 0.2} y={top - 8} width={t.w * 0.28} height={8} fill={fill} />
            ) : null}
            {t.roof === 2 ? (
              <rect x={t.x + t.w * 0.55} y={top - 6} width={t.w * 0.22} height={6} fill={fill} />
            ) : null}
            {windows ? (
              <rect
                x={t.x + 5}
                y={top + 8}
                width={Math.max(t.w - 10, 0)}
                height={Math.max(t.h - 16, 0)}
                fill={windows}
              />
            ) : null}
          </g>
        )
      })}
    </g>
  )
}

export function FooterScene({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 ${TOP} ${W} ${H - TOP}`}
      preserveAspectRatio="xMidYMax slice"
      className={`block w-full ${className}`}
    >
      <defs>
        <radialGradient id="ft-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff3db" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ft-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset="1" stopColor="#ffa500" />
        </linearGradient>
        {/* Window grids: faint on the middle row, a few warm lit windows on the front row. */}
        <pattern id="ft-win-mid" width="11" height="13" patternUnits="userSpaceOnUse">
          <rect x="3" y="3" width="4" height="6" fill="#faf9f6" fillOpacity="0.22" />
        </pattern>
        <pattern id="ft-win-near" width="33" height="26" patternUnits="userSpaceOnUse">
          <rect x="3" y="3" width="5" height="7" fill="#faf9f6" fillOpacity="0.08" />
          <rect x="14" y="3" width="5" height="7" fill="#ffa500" fillOpacity="0.85" />
          <rect x="25" y="3" width="5" height="7" fill="#faf9f6" fillOpacity="0.08" />
          <rect x="3" y="16" width="5" height="7" fill="#faf9f6" fillOpacity="0.08" />
          <rect x="14" y="16" width="5" height="7" fill="#faf9f6" fillOpacity="0.08" />
          <rect x="25" y="16" width="5" height="7" fill="#ffd27a" fillOpacity="0.6" />
        </pattern>
      </defs>

      {/* Sun and its glow */}
      <circle cx="640" cy="150" r="230" fill="url(#ft-glow)" />
      <circle className="footer-sun" cx="640" cy="160" r="66" fill="url(#ft-sun)" />

      {/* Clouds */}
      <g className="footer-cloud" fill="#ece8e1" transform="translate(0 40)">
        <path d="M300 70c0-12 10-20 22-20 6-12 26-14 36-4 14-4 28 4 28 18 10 0 16 6 16 12H300z" />
        <path d="M1180 54c0-10 9-17 19-17 5-10 22-12 31-3 12-3 24 4 24 15 8 0 14 5 14 10h-88z" />
      </g>
      <g
        className="footer-cloud footer-cloud--slow"
        fill="#ece8e1"
        fillOpacity="0.7"
        transform="translate(0 45)"
      >
        <path d="M820 40c0-8 7-13 15-13 4-8 17-9 24-2 9-2 18 3 18 11 6 0 10 4 10 8h-67z" />
      </g>

      {/* Birds */}
      <g fill="none" stroke="#9a5b00" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round">
        <path d="M560 74l6 4 6-4" />
        <path d="M584 62l5 3 5-3" />
        <path d="M720 88l5 3 5-3" />
      </g>

      <Towers towers={far} fill="#e2dbcf" />
      <Towers towers={mid} fill="#8f989f" windows="url(#ft-win-mid)" />

      {/* Tower crane, the same slate as the front row */}
      <g fill="#34404b" stroke="#34404b">
        <rect x={crane.x - 3} y={crane.top} width="6" height={H - crane.top} stroke="none" />
        <path
          d={`M${crane.left} ${crane.jib}H${crane.right}`}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={`M${crane.left + 14} ${crane.jib}L${crane.x} ${crane.top}L${crane.right - 10} ${crane.jib}`}
          fill="none"
          strokeWidth="1.4"
        />
        <rect x={crane.left + 6} y={crane.jib + 2} width="26" height="12" rx="1" stroke="none" />
        <rect x={crane.x + 4} y={crane.jib + 2} width="12" height="10" rx="1.5" stroke="none" />
        <g className="footer-hook">
          <path d={`M${crane.hook} ${crane.jib}V${crane.jib + 70}`} strokeWidth="1.2" />
          <rect
            x={crane.hook - 5}
            y={crane.jib + 70}
            width="10"
            height="8"
            rx="1.5"
            stroke="none"
            fill="#ffa500"
          />
        </g>
      </g>

      <Towers towers={near} fill="#34404b" windows="url(#ft-win-near)" />

      {/* Ground meeting the ink footer */}
      <path d={`M0 222Q720 200 ${W} 222V${H}H0Z`} fill="#1f2933" />
    </svg>
  )
}

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './DriftWall.css';

export interface DriftWallItem {
  id?: string | number;
  image?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  href?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_ITEMS: DriftWallItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  title: `Deployment Unit ${i + 1}`,
  subtitle: 'Agra Command Post',
  badge: 'ACTIVE GUARD',
  bgColor: i % 3 === 0 ? '#141518' : i % 3 === 1 ? '#FFFFFF' : '#EDE8DD',
  textColor: i % 3 === 0 ? '#FFFFFF' : '#141518',
}));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export const DriftWall: React.FC<DriftWallProps> = ({
  items = DEFAULT_ITEMS,
  columns = 3,
  tileWidth = 205,
  tileHeight = 140,
  gap = 16,
  radius = 16,
  tilt = 14,
  turn = -12,
  roll = 0,
  perspective = 1200,
  depth = 100,
  speed = 32,
  direction = 'up',
  variance = 0.45,
  parallax = 0.5,
  pauseOnHover = false,
  lift = 40,
  fade = 0,
  dim = 1,
  grayscale = false,
  overlayColor = 'transparent',
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerDampedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = useState<number>(490);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    const activeItems = items.slice(0, columns * 3);
    activeItems.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 490);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    // Odd non-parallel irrational column velocity factors modulated by variance
    const columnSpeeds = [0.85, -1.35, 1.1];
    return columnItems.map((_, c) => {
      const base = columnSpeeds[c % columnSpeeds.length];
      const factor = columnFactor(c, variance);
      return speed * base * factor * dirSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    // Odd staggered offsets so columns never line up in parallel:
    // Col 0 at 0, Col 1 offset by 52% of a tile unit, Col 2 offset by 26% of a tile unit
    const unit = tileHeight + gap;
    const staggerFractions = [0, 0.52, 0.26];
    offsetsRef.current = columnMeta.map((_, c) => {
      return unit * (c * 2 + staggerFractions[c % staggerFractions.length]);
    });
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems, tileHeight, gap]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta)
            el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? hit.closest('[data-tile-id]') : null;
      if (!tile) return;
      const htmlTile = tile as HTMLElement;
      const id = htmlTile.dataset.tileId;
      if (!id || id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(htmlTile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () =>
      ({
        '--dw-tile-w': `${tileWidth}px`,
        '--dw-tile-h': `${tileHeight}px`,
        '--dw-gap': `${gap}px`,
        '--dw-radius': `${radius}px`,
        '--dw-perspective': `${perspective}px`,
        '--dw-lift': `${lift}px`,
        '--dw-dim': dim,
        '--dw-gray': grayscale ? 1 : 0,
        '--dw-overlay': overlayColor,
        '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
        ...style,
      }) as React.CSSProperties,
    [
      tileWidth,
      tileHeight,
      gap,
      radius,
      perspective,
      lift,
      dim,
      grayscale,
      overlayColor,
      fade,
      style,
    ]
  );

  const renderTileContent = (item: DriftWallItem) => {
    if (item.image) {
      return (
        <span className="drift-wall__inner">
          <img
            src={item.image}
            alt={item.title ?? ''}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <span className="drift-wall__overlay" aria-hidden="true" />
        </span>
      );
    }

    // Borderless Placeholder Tile Mode: Clean solid background, soft shadow, ready for pictures
    return (
      <span className="drift-wall__inner">
        <div
          className="w-full h-full p-4 flex flex-col justify-between select-none transition-all shadow-md"
          style={{
            backgroundColor: item.bgColor || '#141518',
            color: item.textColor || '#FFFFFF',
            borderRadius: `${radius}px`,
            border: 'none',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C44D2B]" />
              <span className="text-[10px] font-mono tracking-wider uppercase opacity-85 font-semibold">
                {item.badge || 'MANPOWER'}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold opacity-50">#{item.id || 'SEC'}</span>
          </div>

          <div className="space-y-1 my-auto">
            <div className="text-sm font-bold tracking-tight leading-snug line-clamp-1">
              {item.title}
            </div>
            {item.subtitle && (
              <div className="text-xs opacity-75 leading-tight line-clamp-1">
                {item.subtitle}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
            <span>AGRA DISPATCH</span>
            <span>ACTIVE UNIT</span>
          </div>
        </div>
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );
  };

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
    };

    if (item.href) {
      return (
        <a
          key={id}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          {...commonProps}
        >
          {renderTileContent(item)}
        </a>
      );
    }

    return (
      <div
        key={id}
        tabIndex={0}
        role="button"
        aria-label={item.title ?? 'tile'}
        {...commonProps}
      >
        {renderTileContent(item)}
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of manpower tiles"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div
                className="drift-wall__track"
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) =>
                    renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c)
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;

"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type BaseItem = {
  id: string;
  leftPct: number;
  topPct: number;
  rotation: number;
  zIndex: number;
  link?: string;
  ignoreCollision?: boolean;
};

type ImageItem = BaseItem & {
  kind: "image";
  src: string;
  alt: string;
  widthPct: number;
  heightPct: number;
};

type TextItem = BaseItem & {
  kind: "text";
  text: string;
};

type CollageItem = ImageItem | TextItem;

const baseItems: CollageItem[] = [
  {
    id: "rectangle",
    kind: "image",
    src: "/assets/Rectangle.svg",
    alt: "",
    widthPct: 69.3287,
    heightPct: 30.8863,
    leftPct: -2.4306,
    topPct: 0,
    rotation: 0,
    zIndex: 1,
    ignoreCollision: true,
  },
  {
    id: "image7",
    kind: "image",
    src: "/assets/image7.svg",
    alt: "",
    widthPct: 12.037,
    heightPct: 24.9776,
    leftPct: 79.919,
    topPct: 7.6097,
    rotation: 0,
    zIndex: 4,
  },
  {
    id: "image9",
    kind: "image",
    src: "/assets/image9.svg",
    alt: "",
    widthPct: 9.2014,
    heightPct: 12.5336,
    leftPct: 89.8148,
    topPct: 1.3429,
    rotation: 0,
    zIndex: 6,
  },
  {
    id: "image4",
    kind: "image",
    src: "/assets/image4.svg",
    alt: "",
    widthPct: 49.1898,
    heightPct: 25.7833,
    leftPct: 54.2245,
    topPct: 35.7207,
    rotation: 0,
    zIndex: 2,
  },
  {
    id: "image8",
    kind: "image",
    src: "/assets/image8.svg",
    alt: "",
    widthPct: 10.2431,
    heightPct: 28.7377,
    leftPct: 2.3148,
    topPct: 41.8084,
    rotation: 0,
    zIndex: 3,
  },
  {
    id: "image1",
    kind: "image",
    src: "/assets/image1.svg",
    alt: "",
    widthPct: 38.4259,
    heightPct: 40.4655,
    leftPct: -1.5046,
    topPct: 43.0618,
    rotation: -15.54,
    zIndex: 6,
  },
  {
    id: "image10",
    kind: "image",
    src: "/assets/image10.svg",
    alt: "",
    widthPct: 23.9583,
    heightPct: 31.3339,
    leftPct: 45.4282,
    topPct: 70.5461,
    rotation: 0,
    zIndex: 5,
  },
  {
    id: "vector",
    kind: "image",
    src: "/assets/vector.svg",
    alt: "",
    widthPct: 22.16,
    heightPct: 38.76,
    leftPct: 85.94,
    topPct: 63.12,
    rotation: 0,
    zIndex: 2,
  },
  {
    id: "blogs",
    kind: "image",
    src: "/assets/blogs.svg",
    alt: "Blogs",
    widthPct: 9.0856,
    heightPct: 14.4136,
    leftPct: 12.5579,
    topPct: 27.3948,
    rotation: 0,
    zIndex: 6,
    link: "/blogs",
  },
  {
    id: "github",
    kind: "image",
    src: "/assets/github.svg",
    alt: "GitHub",
    widthPct: 8.2,
    heightPct: 12.8,
    leftPct: 23.4,
    topPct: 27.8,
    rotation: 0,
    zIndex: 6,
    link: "https://github.com/unworld11",
  },
  {
    id: "socials",
    kind: "image",
    src: "/assets/social.svg",
    alt: "Socials",
    widthPct: 7.2,
    heightPct: 11.2,
    leftPct: 34.3,
    topPct: 27.6,
    rotation: 0,
    zIndex: 6,
    link: "/socials",
  },
  {
    id: "signature",
    kind: "text",
    text: "vedanta",
    leftPct: 1.4,
    topPct: 95,
    rotation: 0,
    zIndex: 7,
  },
];

const DESIGN_WIDTH = 1728;
const DESIGN_HEIGHT = 1117;
const TEXT_WIDTH_PCT = 18;
const TEXT_HEIGHT_PCT = 6;
const MIN_GAP_PCT = 1.4;
const MAX_RANDOM_TRIES = 200;

const createItems = () => baseItems.map((item) => ({ ...item }));
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getItemBounds = (item: CollageItem) => {
  if (item.kind === "image") {
    return { widthPct: item.widthPct, heightPct: item.heightPct };
  }

  return { widthPct: TEXT_WIDTH_PCT, heightPct: TEXT_HEIGHT_PCT };
};

const getRotatedBounds = (item: CollageItem) => {
  const { widthPct, heightPct } = getItemBounds(item);
  const radians = (Math.abs(item.rotation) * Math.PI) / 180;
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));

  return {
    widthPct: widthPct * cos + heightPct * sin,
    heightPct: widthPct * sin + heightPct * cos,
  };
};

const randomizeLayout = (items: CollageItem[]) => {
  const padding = MIN_GAP_PCT / 2;
  const positions = new Map<string, { leftPct: number; topPct: number }>();
  const placed: Array<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  }> = [];

  const collidables = items
    .filter((item) => !item.ignoreCollision)
    .sort((a, b) => {
      const sizeA = getRotatedBounds(a);
      const sizeB = getRotatedBounds(b);
      return sizeB.widthPct * sizeB.heightPct - sizeA.widthPct * sizeA.heightPct;
    });

  const placeItem = (item: CollageItem) => {
    const { widthPct, heightPct } = getRotatedBounds(item);
    const maxLeft = Math.max(0, 100 - widthPct);
    const maxTop = Math.max(0, 100 - heightPct);

    for (let attempt = 0; attempt < MAX_RANDOM_TRIES; attempt += 1) {
      const left = clamp(Math.random() * maxLeft, 0, maxLeft);
      const top = clamp(Math.random() * maxTop, 0, maxTop);
      const rect = {
        left: left - padding,
        top: top - padding,
        right: left + widthPct + padding,
        bottom: top + heightPct + padding,
      };

      const overlaps = placed.some(
        (other) =>
          rect.left < other.right &&
          rect.right > other.left &&
          rect.top < other.bottom &&
          rect.bottom > other.top
      );

      if (!overlaps) {
        placed.push(rect);
        positions.set(item.id, { leftPct: left, topPct: top });
        return;
      }
    }

    positions.set(item.id, { leftPct: item.leftPct, topPct: item.topPct });
  };

  collidables.forEach(placeItem);

  items
    .filter((item) => item.ignoreCollision)
    .forEach((item) => {
      const { widthPct, heightPct } = getRotatedBounds(item);
      const maxLeft = Math.max(0, 100 - widthPct);
      const maxTop = Math.max(0, 100 - heightPct);
      positions.set(item.id, {
        leftPct: clamp(Math.random() * maxLeft, 0, maxLeft),
        topPct: clamp(Math.random() * maxTop, 0, maxTop),
      });
    });

  return items.map((item) => {
    const next = positions.get(item.id);
    return next ? { ...item, leftPct: next.leftPct, topPct: next.topPct } : item;
  });
};

export default function Home() {
  const [items, setItems] = useState<CollageItem[]>(createItems);
  const [stageSize, setStageSize] = useState({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFrameRef = useRef<number | null>(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{
    id: string;
    mode: "move" | "rotate";
    offsetX: number;
    offsetY: number;
    centerX: number;
    centerY: number;
    startAngle: number;
    startRotation: number;
    startPointerX: number;
    startPointerY: number;
    moved: boolean;
  } | null>(null);

  useEffect(() => {
    const updateStageSize = () => {
      const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT
      );

      setStageSize({
        width: Math.round(DESIGN_WIDTH * scale),
        height: Math.round(DESIGN_HEIGHT * scale),
      });
    };

    updateStageSize();
    window.addEventListener("resize", updateStageSize);
    return () => window.removeEventListener("resize", updateStageSize);
  }, []);

  useEffect(() => {
    setItems((prev) => randomizeLayout(prev));
  }, []);

  useEffect(() => {
    const updateCursor = () => {
      cursorFrameRef.current = null;
      const cursor = cursorRef.current;
      if (!cursor) return;
      const { x, y } = cursorPosRef.current;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursor.style.opacity = "1";
    };

    const handlePointerMove = (event: PointerEvent) => {
      cursorPosRef.current = { x: event.clientX, y: event.clientY };
      if (cursorFrameRef.current === null) {
        cursorFrameRef.current = window.requestAnimationFrame(updateCursor);
      }

      const dragState = dragRef.current;
      const container = containerRef.current;
      if (!dragState || !container) return;

      if (dragState.mode === "rotate") {
        const angle = Math.atan2(
          event.clientY - dragState.centerY,
          event.clientX - dragState.centerX
        );
        const delta = angle - dragState.startAngle;
        const nextRotation = dragState.startRotation + (delta * 180) / Math.PI;

        setItems((prev) =>
          prev.map((item) =>
            item.id === dragState.id ? { ...item, rotation: nextRotation } : item
          )
        );
        return;
      }

      const rect = container.getBoundingClientRect();
      const leftPx = event.clientX - rect.left - dragState.offsetX;
      const topPx = event.clientY - rect.top - dragState.offsetY;
      const distance = Math.hypot(
        event.clientX - dragState.startPointerX,
        event.clientY - dragState.startPointerY
      );

      setItems((prev) =>
        prev.map((item) =>
          item.id === dragState.id
            ? {
                ...item,
                leftPct: (leftPx / rect.width) * 100,
                topPct: (topPx / rect.height) * 100,
              }
            : item
        )
      );

      if (distance > 4 && dragRef.current) {
        dragRef.current.moved = true;
      }
    };

    const handleBlur = () => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleBlur);
      if (cursorFrameRef.current !== null) {
        window.cancelAnimationFrame(cursorFrameRef.current);
      }
    };
  }, []);

  const handlePointerDown =
    (id: string) => (event: ReactPointerEvent<HTMLDivElement>) => {
      const item = items.find((entry) => entry.id === id);
      if (!item) return;

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);

      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const startAngle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      );
      const isRotate = event.shiftKey;

      dragRef.current = {
        id,
        mode: isRotate ? "rotate" : "move",
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        centerX,
        centerY,
        startAngle,
        startRotation: item.rotation,
        startPointerX: event.clientX,
        startPointerY: event.clientY,
        moved: isRotate,
      };

      const maxZ = Math.max(...items.map((entry) => entry.zIndex));
      setItems((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, zIndex: maxZ + 1 } : entry
        )
      );
    };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const dragState = dragRef.current;
    if (dragState && dragState.mode === "move" && !dragState.moved) {
      const item = items.find((entry) => entry.id === dragState.id);
      if (item?.link) {
        if (item.link.startsWith("#")) {
          window.location.hash = item.link.slice(1);
        } else {
          window.location.href = item.link;
        }
      }
    }

    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleReset = () => {
    setItems(createItems());
  };

  const handleRandomize = () => {
    setItems((prev) => randomizeLayout(prev));
  };

  const stageStyle: CSSProperties = {
    width: stageSize.width,
    height: stageSize.height,
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            type="button"
            onClick={handleRandomize}
          >
            Randomize
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={handleReset}
          >
            Reset layout
          </button>
        </div>
        <div className={styles.canvas}>
          <div
            className={styles.stage}
            ref={containerRef}
            style={stageStyle}
            role="img"
            aria-label="Pixel collage with hands, figures, and a racing car"
          >
            {items.map((item) => {
              const style: CSSProperties & { "--rotation": string } = {
                left: `${item.leftPct}%`,
                top: `${item.topPct}%`,
                zIndex: item.zIndex,
                "--rotation": `${item.rotation}deg`,
              };

              if (item.kind === "image") {
                style.width = `${item.widthPct}%`;
                style.height = `${item.heightPct}%`;
              }

              return (
                <div
                  key={item.id}
                  data-item-id={item.id}
                  className={styles.layer}
                  onPointerDown={handlePointerDown(item.id)}
                  onPointerUp={handlePointerUp}
                  style={style}
                >
                  {item.kind === "image" ? (
                    <img
                      className={styles.asset}
                      src={item.src}
                      alt={item.alt}
                      aria-hidden={item.alt.length === 0}
                      draggable={false}
                    />
                  ) : (
                    <span className={styles.signature}>{item.text}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          ref={cursorRef}
          className={styles.pixelCursor}
          aria-hidden="true"
        />
      </main>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Shot } from "../projects";

const clock = (s: number) => `0:${s.toFixed(1).padStart(4, "0")}`;

export default function ShotPlayer({
  video,
  poster,
  duration,
  shots,
}: {
  video: string;
  poster: string;
  duration: number;
  shots: Shot[];
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () => {
      let i = 0;
      for (let k = 0; k < shots.length; k++) if (v.currentTime >= shots[k].start) i = k;
      setActive(i);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [shots]);

  const jump = (i: number) => {
    const v = ref.current;
    setActive(i);
    if (!v) return;
    v.currentTime = shots[i].start + 0.05;
    void v.play().catch(() => {});
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setSound(!v.muted);
    if (!v.muted && v.paused) void v.play().catch(() => {});
  };

  const s = shots[active];
  const end = shots[active + 1]?.start ?? duration;

  return (
    <div className="sb-grid">
      <div data-rise>
        <div className="sb-player">
          <video
            ref={ref}
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="The AquaPure ad, rendered by adforge"
          />
        </div>
        <div className="sb-controls">
          <button type="button" onClick={toggle}>
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={toggleSound} className={sound ? "on" : undefined} aria-pressed={sound}>
            {sound ? "Sound on" : "Turn sound on"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="wk-h2" data-rise>
          Nine shots, one cast
        </h2>
        <p className="sb-lede" data-rise style={{ ["--i" as string]: 1 }}>
          A 30-second Hindi brief for a smart water bottle came back as nine shots, the same woman in
          the same top and watch in every one of them. Pick a shot to jump the film to it.
        </p>
        <ol className="sb-strip" data-rise style={{ ["--i" as string]: 2 }} aria-label="Shots">
          {shots.map((shot, i) => (
            <li key={shot.start}>
              <button type="button" onClick={() => jump(i)} aria-pressed={i === active} aria-label={`Shot ${i + 1}, ${shot.type}: ${shot.gloss}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.still} alt="" width={360} height={630} loading="lazy" />
                <span className="t">{clock(shot.start)}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="sb-now" aria-live="polite">
          <div className="sb-meta">
            {s.type === "presenter" ? "Presenter, speaking to camera" : "B-roll with voiceover"} · {clock(s.start)} to {clock(end)}
          </div>
          <p className="sb-line" lang="hi">
            {s.line}
          </p>
          <p className="sb-gloss">{s.gloss}</p>
          <p className="sb-scene">{s.scene}</p>
        </div>
        <p className="sb-note">
          AquaPure is a made-up product for testing. The lines are the storyboard&apos;s own voiceover, and the
          English is my translation.
        </p>
      </div>
    </div>
  );
}

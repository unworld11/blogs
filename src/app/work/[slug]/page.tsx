import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AQUAPURE, PROJECTS, getProject, nextProject, type Media, type Project, type Section } from "../projects";
import ShotPlayer from "./ShotPlayer";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} · vedanta`, description: p.line };
}

const rise = (i: number) => ({ "data-rise": "", style: { ["--i" as string]: i } });

function MediaBlock({ m, i = 0, sizes = "(max-width: 780px) 100vw, 60vw" }: { m: Media; i?: number; sizes?: string }) {
  if (m.kind === "code") {
    return (
      <figure className="wk-code" {...rise(i)}>
        <span className="file">{m.file}</span>
        <pre>
          <code>{m.code}</code>
        </pre>
        {m.caption && <figcaption>{m.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className={`wk-shot${m.phone ? " phone" : ""}`} {...rise(i)}>
      <div className="mat">
        <Image src={m.src} alt={m.alt} width={m.w} height={m.h} sizes={m.phone ? "320px" : sizes} />
      </div>
      {m.caption && <figcaption>{m.caption}</figcaption>}
    </figure>
  );
}

function Prose({ s }: { s: Section }) {
  return (
    <div className="wk-prose">
      <h2 className="wk-h2" {...rise(0)}>
        {s.heading}
      </h2>
      {s.body.map((b, i) => (
        <p key={i} {...rise(i + 1)}>
          {b}
        </p>
      ))}
    </div>
  );
}

function SectionBlock({ s, flip }: { s: Section; flip: boolean }) {
  const layout = s.layout ?? (s.media?.length ? "side" : "text");

  if (layout === "code") {
    return (
      <section className="wk-night wk-section" id={s.id}>
        <div className="wk-wrap wk-codewrap">
          <Prose s={s} />
          {s.media?.map((m, i) => <MediaBlock key={i} m={m} i={2} />)}
        </div>
      </section>
    );
  }

  if (layout === "side") {
    return (
      <section className="wk-section" id={s.id}>
        <div className={`wk-wrap wk-side${flip ? " flip" : ""}`}>
          <Prose s={s} />
          <div className="wk-media">
            {s.media?.map((m, i) => <MediaBlock key={i} m={m} i={i + 1} />)}
          </div>
        </div>
      </section>
    );
  }

  if (layout === "wide" || layout === "pair") {
    const gates = s.id === "gates";
    return (
      <section className="wk-section" id={s.id}>
        <div className={`wk-wrap ${layout === "wide" ? "wk-wide" : "wk-pair"}`}>
          <div className="wk-prose">
            <h2 className="wk-h2" {...rise(0)}>
              {s.heading}
            </h2>
            {s.body.map((b, i) => (
              <p key={i} {...rise(i + 1)}>
                {b}
              </p>
            ))}
          </div>
          {gates ? (
            <ol className="gates">
              {s.media?.map((m, i) => (
                <li key={i}>
                  <MediaBlock m={m} i={i} sizes={i === 0 ? "100vw" : "(max-width: 780px) 100vw, 50vw"} />
                </li>
              ))}
            </ol>
          ) : (
            <div className="wk-media">
              {s.media?.map((m, i) => (
                <MediaBlock key={i} m={m} i={i} sizes={layout === "wide" && i === 0 ? "100vw" : "(max-width: 780px) 100vw, 50vw"} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="wk-section" id={s.id}>
      <div className="wk-wrap wk-wide">
        <Prose s={s} />
      </div>
    </section>
  );
}

function Facts({ p }: { p: Project }) {
  return (
    <dl className="wk-facts" {...rise(2)}>
      <div>
        <dt>Year</dt>
        <dd>{p.year}</dd>
      </div>
      <div>
        <dt>Status</dt>
        <dd>{p.status}</dd>
      </div>
      <div>
        <dt>Built with</dt>
        <dd>{p.stack.join(", ")}</dd>
      </div>
    </dl>
  );
}

function Action({ p }: { p: Project }) {
  if (!p.action) return null;
  const external = p.action.href.startsWith("http");
  return (
    <a
      className="wk-button"
      href={p.action.href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      {...rise(3)}
    >
      {p.action.label} <span className="arr">{p.action.href.startsWith("#") ? "↓" : "→"}</span>
    </a>
  );
}

function Hero({ p }: { p: Project }) {
  if (p.slug === "adforge") {
    return (
      <header className="wk-wrap af-hero">
        <div className="text">
          <h1 className="wk-title" {...rise(0)}>
            {p.name}
          </h1>
          <p className="wk-statement" {...rise(1)}>
            {p.line}
          </p>
          <Facts p={p} />
          <Action p={p} />
        </div>
        <div className="reel">
          <video src={AQUAPURE.video} poster={AQUAPURE.poster} autoPlay muted loop playsInline preload="metadata" aria-label="A 29-second ad rendered by adforge, playing muted" />
        </div>
      </header>
    );
  }
  return (
    <header className="wk-wrap wk-hero">
      <h1 className="wk-title" {...rise(0)}>
        {p.name}
      </h1>
      <div className="wk-hero-body">
        <div style={{ gridColumn: "1 / span 7" }}>
          <p className="wk-statement" {...rise(1)}>
            {p.line}
          </p>
          <Action p={p} />
        </div>
        <Facts p={p} />
      </div>
      {p.lead && (
        <div className="wk-lead">
          <MediaBlock m={p.lead} i={0} sizes="100vw" />
        </div>
      )}
    </header>
  );
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(slug);

  return (
    <main>
      <div className="wk-wrap wk-bar">
        <Link className="wk-mark" href="/">
          vedanta<span>.</span>
        </Link>
        <nav aria-label="Work">
          <Link href="/#work">All work</Link>
          <Link className="hide-sm" href={`/work/${next.slug}`}>
            Next: {next.name}
          </Link>
        </nav>
      </div>

      <Hero p={p} />

      <section className="wk-intro wk-wrap">
        <div>
          {p.intro.map((t, i) => (
            <p key={i} {...rise(i)}>
              {t}
            </p>
          ))}
        </div>
      </section>

      {p.slug === "adforge" && (
        <section className="sb" id="storyboard">
          <div className="wk-wrap">
            <ShotPlayer {...AQUAPURE} />
          </div>
        </section>
      )}

      {p.sections.map((s, i) => (
        <SectionBlock key={s.heading} s={s} flip={i % 2 === 1} />
      ))}

      {(p.links.length > 0 || p.slug === "adforge") && (
        <section className="wk-wrap wk-links">
          <h2 className="wk-h2" {...rise(0)}>
            {p.links.length ? "Where to find it" : "Where it lives"}
          </h2>
          {p.links.length ? (
            <ul {...rise(1)}>
              {p.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener">
                    {l.label} →
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="wk-stack wk-stack-top" {...rise(1)}>
              The repo is private and the deployment sits behind a sign-in, so the screenshots on this page are
              from a local run against real projects. Write to me if you&apos;d like a walkthrough.
            </p>
          )}
        </section>
      )}

      <footer className="wk-next">
        <div className="wk-wrap">
          <Link className="big" href={`/work/${next.slug}`}>
            <span className="label">Next project</span>
            <span className="name" data-rise="">
              {next.name}
            </span>
            <span className="line">{next.line}</span>
          </Link>
          <div className="wk-foot">
            <Link href="/#work">Back to all work</Link>
            <a href="mailto:vedant.vasu1111@gmail.com">vedant.vasu1111@gmail.com</a>
            <span>vedanta · mmxxvi</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

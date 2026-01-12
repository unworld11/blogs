import type { CSSProperties } from "react";
import styles from "./page.module.css";

type SocialIcon = {
  id: string;
  src: string;
  alt: string;
  href?: string;
  newTab?: boolean;
  widthPct: number;
  heightPct: number;
  leftPct: number;
  topPct: number;
  rotation?: number;
};

const icons: SocialIcon[] = [
  {
    id: "mail",
    src: "/assets/socials/mail.svg",
    alt: "Mail",
    href: "mailto:vedant.vasu1111@gmail.com",
    widthPct: 4.5,
    heightPct: 6.9,
    leftPct: 41.5,
    topPct: 72.8,
  },
  {
    id: "linkedin",
    src: "/assets/socials/linkedin.svg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/vedantasp",
    newTab: true,
    widthPct: 4.5,
    heightPct: 6.9,
    leftPct: 48.2,
    topPct: 72.8,
  },
  {
    id: "x",
    src: "/assets/socials/x.svg",
    alt: "X",
    href: "https://x.com/vedantadoestech",
    newTab: true,
    widthPct: 4.5,
    heightPct: 6.9,
    leftPct: 54.9,
    topPct: 72.8,
  },
  {
    id: "exit",
    src: "/assets/socials/exit.svg",
    alt: "Exit",
    href: "/exit",
    widthPct: 5.8,
    heightPct: 5.5,
    leftPct: 90.2,
    topPct: 5.6,
  },
];

export default function SocialsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.stage}>
        <img className={styles.bg} src="/assets/socials/bg.svg" alt="" />
        <div className={styles.title}>socials</div>
        {icons.map((icon) => {
          const style: CSSProperties = {
            width: `${icon.widthPct}%`,
            height: `${icon.heightPct}%`,
            left: `${icon.leftPct}%`,
            top: `${icon.topPct}%`,
            transform: icon.rotation ? `rotate(${icon.rotation}deg)` : undefined,
          };
          const content = (
            <img className={styles.icon} src={icon.src} alt={icon.alt} />
          );

          if (icon.href) {
            return (
              <a
                key={icon.id}
                className={styles.iconLink}
                href={icon.href}
                style={style}
                aria-label={icon.alt}
                target={icon.newTab ? "_blank" : undefined}
                rel={icon.newTab ? "noreferrer noopener" : undefined}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={icon.id} className={styles.iconLink} style={style}>
              {content}
            </div>
          );
        })}
      </main>
    </div>
  );
}

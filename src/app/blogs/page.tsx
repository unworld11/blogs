import Link from "next/link";
import styles from "./page.module.css";

const posts = [
  {
    id: "post-gnn",
    number: "02",
    title: "Graph Neural Networks Meet Quantitative Trading",
    date: "Oct 15, 2025",
    tags: ["Graph ML", "Quant", "Supply chains"],
    summary:
      "A multi-relational GNN setup that blends stock features with vendor-customer relationships to treat supply-chain structure as predictive signal.",
    href: "/blogs/gnn-supply-chain-quant.html",
  },
  {
    id: "post-agents",
    number: "01",
    title: "Agents Are Corrupt",
    date: "Sep 21, 2025",
    tags: ["Agents", "Alignment", "Simulations"],
    summary:
      "Exploring how autonomous agents in multi-agent environments drift toward corrupt or misaligned behavior without explicit instructions to do so.",
    href: "/blogs/agents-are-corrupt.html",
  },
];

const notes = [
  "Research, experiments, and deployment notes from the AI systems edge.",
  "Focused on alignment, agent behavior, graph learning, and the gap between demos and real products.",
];

export default function BlogsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.wordmark}>
          vedanta
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <a href="#archive">Archive</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={`${styles.panel} ${styles.hero}`}>
          <div className={styles.heroMeta}>
            <span className={styles.kicker}>Archive / long-form notes</span>
            <span className={styles.heroCode}>BLOG.SEQ</span>
          </div>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.index}>SECTOR_06</p>
              <h1>Research archive</h1>
              <p className={styles.lede}>
                Essays on agent behavior, model deployment, graph learning, and
                the practical edges of machine intelligence.
              </p>
            </div>
            <div className={styles.noteStack}>
              {notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="archive" className={styles.archive}>
          {posts.map((post) => (
            <article key={post.id} id={post.id} className={`${styles.panel} ${styles.post}`}>
              <div className={styles.postTop}>
                <span className={styles.postNumber}>{post.number}</span>
                <div className={styles.postMeta}>
                  <span>{post.date}</span>
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.postBody}>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </div>
              <a href={post.href} className={styles.postAction}>
                Read full post
              </a>
            </article>
          ))}
        </section>

        <section className={styles.lowerGrid}>
          <article id="about" className={`${styles.panel} ${styles.infoCard}`}>
            <p className={styles.index}>SECTOR_07</p>
            <h2>About</h2>
            <p>
              I am a software engineer and researcher interested in the point
              where AI research has to become a working system. That includes
              alignment questions, multi-agent behavior, evaluation, and the
              engineering needed to make those ideas useful.
            </p>
          </article>

          <article id="contact" className={`${styles.panel} ${styles.infoCard}`}>
            <p className={styles.index}>SECTOR_08</p>
            <h2>Channels</h2>
            <div className={styles.channelList}>
              <a href="mailto:vedant.vasu1111@gmail.com">vedant.vasu1111@gmail.com</a>
              <a href="https://www.linkedin.com/in/vedantasp" target="_blank" rel="noreferrer">
                linkedin.com/in/vedantasp
              </a>
              <a href="https://github.com/unworld11" target="_blank" rel="noreferrer">
                github.com/unworld11
              </a>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

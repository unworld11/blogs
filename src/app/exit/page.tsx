import styles from "./page.module.css";

export default function ExitPage() {
  return (
    <div className={styles.page}>
      <main className={styles.stage}>
        <img className={styles.image} src="/assets/exit/caesar.svg" alt="" />
        <div className={styles.headline}>
          et tu,
          <br />
          brute?
        </div>
      </main>
    </div>
  );
}

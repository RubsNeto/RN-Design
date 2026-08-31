import Image from "next/image";
import styles from "./style.module.scss";

const labels = {
  about: ["Direção definida", "Capacidade conectada"],
  services: ["Capacidade aplicada", "Engenharia preparada"],
  scale: ["Base construída", "Processo visível"],
  process: ["Decisão documentada", "Projeto em operação"],
  work: ["Evidência apresentada", "Próximo passo"],
};

export default function ChapterBridge({ chapter }) {
  const [from, to] = labels[chapter] || ["RN Design", "Próximo capítulo"];
  return (
    <div className={styles.bridge} data-chapter={chapter} aria-hidden="true">
      <span className={styles.curtain} />
      <div className={styles.inner}>
        <span className={styles.label}>{from}</span>
        <span className={styles.line}>
          <i />
        </span>
        <span className={styles.mark}>
          <Image
            src="/images/estrela-rn-contorno.svg"
            fill
            sizes="5rem"
            alt=""
          />
          {Array.from({ length: 4 }, (_, index) => (
            <i key={index} style={{ "--rn-bridge-piece": index }} />
          ))}
        </span>
        <span className={`${styles.line} ${styles.lineEnd}`}>
          <i />
        </span>
        <span className={styles.label}>{to}</span>
      </div>
    </div>
  );
}

import Link from 'next/link';
import styles from './style.module.scss';
import { COMPANY_NAME } from '../../config/site';

export default function Legal({ title, updatedAt, intro, children }) {
    return (
        <main className={styles.page}>
            <article className={styles.container}>
                <Link href="/" className={styles.back}>
                    ← Voltar ao site
                </Link>

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.updated}>
                    Última atualização: <time>{updatedAt}</time>
                </p>

                {intro && <p className={styles.intro}>{intro}</p>}

                <div className={styles.content}>{children}</div>

                <hr className={styles.divider} />
                <p className={styles.footerNote}>
                    {COMPANY_NAME} — este documento pode ser atualizado. Recomendamos a
                    releitura periódica.
                </p>
            </article>
        </main>
    );
}

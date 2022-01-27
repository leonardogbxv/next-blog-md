import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'

export default function Header() {
  return (
    <>
      <Head>
        <title>Next Blog ッ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <h1>Next Blog<strong>ッ</strong></h1>
        </Link>
        <p className={styles.subtitle}>Next.js React Blog</p>

        <nav>
          <Link href="/">
            <a>Blog</a>
          </Link>

          <a href="https://github.com/leonardogbxv" target="_blank" rel="noreferrer">Github</a>

          <Link href="/admin/new-post">
            <a className={styles['new-post']}>New Post</a>
          </Link>

          <Link href="/admin">
            <a className={styles['new-post']}>Administration</a>
          </Link>
        </nav>
      </header>
    </>
  )
}
import type { NextPage } from 'next'
import Head from 'next/head'
import GalaxyMap from '../components/galaxy-map'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Galaxyrise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Galaxyrise
        </h1>
        <GalaxyMap />
      </main>
    </div>
  )
}

export default Home

import Header from '../Header';
import styles from './styles.module.scss'

export default function SharedLayout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {children}
      </div>
    </>
  )
}

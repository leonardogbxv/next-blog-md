import styles from '../styles/Footer.module.scss'

export default function Header() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Next Blog</p>
      <p>Developed by <a href="https://github.com/leonardogbxv" target="_blank">LeonardoGB</a></p>
    </footer>
  )
}
import Link from 'next/link'
import styles from '../../styles/Form.module.scss'

export default function Login() {
  return (
    <div className="container">
      <section>
        <h1>Administration Login</h1>
        <form action="POST" className={styles.form}>
          <div>
            <label htmlFor="login">Login</label>
            <input type="text" name="login" required />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit" className="btn-default">Sign In</button>
          <Link href="/">
            <button className="btn-default">Cancel</button>
          </Link>
        </form>

      </section>
    </div>
  )
}

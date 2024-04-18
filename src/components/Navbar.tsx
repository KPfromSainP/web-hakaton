"use client"

import Link from "next/link"
import LogoutForm from "./logoutForm"
import styles from './Navbar.module.css'

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {

  return (
    <nav>
      <Link href="/" className={styles.link}>Главная</Link>
      <a href="http://127.0.0.1:8000/docs">Документация</a>
      {isLoggedIn && <Link href="/test_api" className={styles.link}>Песочница</Link>}
      {isLoggedIn && <Link href="/tokens" className={styles.link}>Токены</Link>}
      {!isLoggedIn && <Link href="/login" className={styles.link}>Войти</Link>}
      {!isLoggedIn && <Link href="/registration" className={styles.link}>Регистрация</Link>}
      {isLoggedIn && <LogoutForm />}
    </nav>
  )
}

export default Navbar

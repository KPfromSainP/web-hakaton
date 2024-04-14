"use client"

import Link from "next/link"
import LogoutForm from "./logoutForm"
import styles from './Navbar.module.css'

const Navbar = (isLoggedIn:any) => {

  return (
    <nav>
      <Link href="/" className={styles.link}>Главная</Link>
      {isLoggedIn && <Link href="/test_api" className={styles.link}>Протестировать систему</Link>}
      {isLoggedIn && <Link href="/tokens" className={styles.link}>Токены</Link>}
      {!isLoggedIn && <Link href="/login" className={styles.link}>Войти</Link>}
      {!isLoggedIn && <Link href="/registration" className={styles.link}>Регистрация</Link>}
      {isLoggedIn && <LogoutForm />}
    </nav>
  )
}

export default Navbar
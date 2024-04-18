//import { logout } from "@/actions"
import styles from './Navbar.module.css'

import { useContext } from 'react'
import { Context } from "@/context";


const LogoutForm = () => {

  const { setIsLoggedIn } = useContext(Context)
  return ( //todo
    <form action={() => {
      setIsLoggedIn(false)
      window.localStorage.clear()
    }
    }>
      <button className={styles.button}>Выйти</button>
    </form>
  )
}

export default LogoutForm
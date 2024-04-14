//import { logout } from "@/actions"
import styles from './Navbar.module.css'

import { useContext } from 'react'
import { Context } from "@/context";   


const LogoutForm = () => {

   const { setIsLoggedIn } = useContext(Context)
  return (
    <form action={() => setIsLoggedIn(false)}> //todo
      <button  className={styles.link}>Выйти</button>
    </form>
  )
}

export default LogoutForm
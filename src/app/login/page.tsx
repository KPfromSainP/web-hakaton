"use client"

import LoginForm from "@/components/loginForm"
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const LoginPage = () => {  
  const { push } = useRouter();

  useEffect(() => {
    const session: Storage = window.localStorage
    session.getItem('token') === 'string' ? push('/') : null 
  }, [])

  return (
    <div className="login">
      <h1>Авторизация</h1>
      <LoginForm/>
    </div>
  )
}

export default LoginPage
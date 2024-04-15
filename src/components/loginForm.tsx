"use client";

import { useFormState } from "react-dom";
import { useState, useContext } from 'react'
import { Context } from "@/context";
import { useRouter } from "next/navigation";


const LoginForm = () => {

  const [formState, setFormState] = useState(false) // при нажатии на submit formSate будет меняться на tru

  const { setIsLoggedIn } = useContext(Context)

    const { push } = useRouter();
  
  async function handleSubmit( prevState: { error: undefined | string }, formData: FormData ) {
    if (!formState) {
      setFormState(true)

      const formEmail = formData.get("email") as string;
      const formPassword = formData.get("password") as string;

      const response = await fetch('http://127.0.0.1:8000/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${formEmail}&password=${formPassword}`
      });

      let response_json = await response.json()
      
      setFormState(false)
            if (response.status == 422){
        return { error: "Неверный формат почты" };
      }
      else if (response.status != 200) {
        return { error: "Неверные данные" };
      }

      window.localStorage.setItem("token", response_json['access_token'])
      window.localStorage.setItem("token_type", response_json['token_type'])

      setIsLoggedIn(true)

      push('/')
    }
  }

  const [state, formAction] = useFormState<any, FormData>(handleSubmit, undefined);
  
  return (
    <form action={formAction}>
      <input type="email" name="email" required placeholder="Email" />
      <input type="password" name="password" required placeholder="Пароль"/>
      <button type="submit" style={{color:'black'}}>Войти</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default LoginForm;

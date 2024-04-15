"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation"
import { useState } from 'react'

const UserRegistrationForm = () => {


  const [formState, setFormState] = useState(false) // при нажатии на submit formSate будет меняться на true
  const { push } = useRouter();


  async function handleSubmit( prevState: { error: undefined | string }, formData: FormData ) {
    if (!formState) {
      setFormState(true)

      const formEmail = formData.get("email") as string;
      const formPassword = formData.get("password") as string;
      const formFirstName = formData.get("name") as string;
      const formLastname = formData.get("surname") as string;

      let user = {
        'email': formEmail,
        'firstname': formFirstName,
        'lastname': formLastname,
        'password': formPassword,
      };

      let response = await fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(user)
      });      
      setFormState(false)
      if (response.status == 422){
        return { error: "Неверный формат почты" };
      }
      else if (response.status != 200) {
        return { error: "Неверные данные" };
      }
      push('/login')
    }
  }

  const [state, formAction] = useFormState<any, FormData>(handleSubmit, undefined);

  return (
    <form action={formAction}>
      <input type="text" name="name" required placeholder="Имя" />
      <input type="text" name="surname" required placeholder="Фамилия" />
      <input type="email" name="email" required placeholder="Email" />
      <input type="password" name="password" required placeholder="Пароль" />
      <button  style={{color:'black'}}>Зарегестрироваться</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default UserRegistrationForm;

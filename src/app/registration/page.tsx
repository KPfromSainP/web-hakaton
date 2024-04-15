"use client"

import UserRegistrationForm from "@/components/UserRegistrationForm";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const RegistrationPage = () => {

  const { push } = useRouter();

  useEffect(() => {
    const session: Storage = window.localStorage
    session.getItem('token') === 'string' ? push('/') : null
  }, [])

  return (
    <div className="create_teacher">
      <h1>Создайте аккаунт</h1>
      <UserRegistrationForm />
    </div>
  );
};

export default RegistrationPage;

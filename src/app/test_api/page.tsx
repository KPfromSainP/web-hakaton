"use client"

import { useRouter } from "next/navigation";
import UserRegistrationForm from "@/components/UserRegistrationForm";
import { useEffect } from "react";

const PremiumPage = async () => {

  const { push } = useRouter();

  useEffect(() => {
    const session: Storage = window.localStorage
    !session.isLoggedIn ? push('/') : null
  }, [])

  return (
    <div className="create_teacher">
      <h1>Создайте аккаунт для преподавателя</h1>
      <UserRegistrationForm/>
    </div>
  );
};

export default PremiumPage;

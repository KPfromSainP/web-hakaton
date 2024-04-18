"use client"

import { useRouter } from "next/navigation";
import TestingAPI from "@/components/test";
import { useEffect } from "react";

const TestPage = () => {

  const { push } = useRouter();

  useEffect(() => {
    const session: Storage = window.localStorage
    typeof session.getItem('token') === 'string' ? null : push('/login')
  }, [])

  return (
    <div className="create_teacher">
      <h1>Протестируйте нашу API</h1>
      <TestingAPI />
    </div>
  );
};

export default TestPage;

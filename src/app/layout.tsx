"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

import { Context } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const session: Storage = window.localStorage
    setIsLoggedIn(typeof session.getItem('token') === 'string' ? true : false)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Context.Provider value={{
          setIsLoggedIn
        }}>
          <div className="container">
            <Navbar isLoggedIn={isLoggedIn}/>
            <div className="content">{children}</div>
          </div>
        </Context.Provider>
      </body>
    </html>
  );
}

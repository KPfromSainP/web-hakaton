"use client";
import { useState } from "react";

export const [isLoggedIn, setIsLoggedIn] = useState(false)

// export const logout = async () => {
//   const session = getLocalStorage();
//   session.destroy();
//   redirect("/");
// };

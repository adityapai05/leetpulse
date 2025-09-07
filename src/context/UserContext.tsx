"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = { username: string; firstName: string; xp: number; streak: number };

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    username: "",
    firstName: "...",
    xp: 0,
    streak: 0,
  });

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user/summary");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

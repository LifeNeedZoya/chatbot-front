"use client";
import axiosInstance from "@/lib/axiosInstance";
import { setToLocalStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import useChat from "./chat";

interface IUserContext {
  login: (email: string, pass: string) => Promise<void>;
  signup: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => void;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { refreshSessions } = useChat();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      if (data.access_token) {
        setToLocalStorage({ key: "token", value: data.access_token });
        toast(data.msg);
      } else {
        toast("Login failed. Please check your credentials.");
      }
      await refreshSessions();
      router.push("/");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axiosInstance.post("/users", {
        name,
        email,
        password,
      });
      toast(data.msg);
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      router.push("/auth");
    }
  }, []);

  return (
    <UserContext.Provider value={{ login, signup }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;

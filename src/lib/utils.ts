import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const setToLocalStorage = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

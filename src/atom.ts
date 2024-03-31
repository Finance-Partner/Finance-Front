import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const isAuthenticated = atom({
  key: "auth",
  default: false,
});

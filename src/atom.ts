import { atom } from "recoil";

export interface userInfoType {
  name: string;
  photo: string | null;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const isAuthenticated = atom({
  key: "auth",
  default: false,
});

export const householderIdState = atom({
  key: 'householderIdState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const ledgerListState = atom<number[]>({
  key: "ledgerListState",
  default: [],
});

export const selectedLedgerIdState = atom<number | null>({
  key: "selectedLedgerIdState",
  default: null,
});

export const userInfoState = atom<userInfoType | null>({
  key: "userInfoState",
  default: {
    name: "",
    photo: null,
  }
});

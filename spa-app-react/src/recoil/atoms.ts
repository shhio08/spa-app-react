import { atom } from "recoil";
import { QiitaItem } from "../hooks/useQiitaItems";

export const apiKeyState = atom<string>({
  key: "apiKeyState",
  default: "",
});

export const queryState = atom<string>({
  key: "queryState",
  default: "",
});

export const itemsState = atom<QiitaItem[]>({
  key: "itemsState",
  default: [],
});

// src/recoil/atoms.ts
import { atom } from "recoil";
import { QiitaItem } from "../hooks/useQiitaItems";

export const apiKeyState = atom<string>({
  key: "apiKeyState", // 一意なキー
  default: "", // 初期値
});

export const queryState = atom<string>({
  key: "queryState", // 一意なキー
  default: "", // 初期値は空文字列
});

export const itemsState = atom<QiitaItem[]>({
  key: "itemsState", // 一意なキー
  default: [], // 初期値は空の配列
});

// src/recoil/atoms.ts
import { atom } from "recoil";

export const apiKeyState = atom<string>({
  key: "apiKeyState", // 一意なキー
  default: "", // 初期値
});

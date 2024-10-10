// src/context/ApiKeyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [apiKey, setApiKeyState] = useState<string>(() => {
    // 初期化時に localStorage から API キーを取得
    return localStorage.getItem("apiKey") || "";
  });

  // API キーを設定する際に localStorage にも保存
  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem("apiKey", key); // localStorage に保存
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};

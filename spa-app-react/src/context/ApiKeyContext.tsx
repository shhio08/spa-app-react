import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { apiKeyState } from "../recoil/atoms";

export const ApiKeyContext = React.createContext<
  | {
      apiKey: string;
      setApiKey: (key: string) => void;
    }
  | undefined
>(undefined);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [apiKey, setApiKey] = useRecoilState(apiKeyState);

  const updateApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("apiKey", key);
  };

  React.useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, [setApiKey]);

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey: updateApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): {
  apiKey: string;
  setApiKey: (key: string) => void;
} => {
  const context = React.useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};

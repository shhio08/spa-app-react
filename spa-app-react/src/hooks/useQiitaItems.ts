// src/hooks/useQiitaItems.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { useApiKey } from "../context/ApiKeyContext"; // useApiKeyをインポート

export interface QiitaItem {
  id: string;
  title: string;
  url: string;
  user: {
    id: string;
    name: string;
  };
}

export const useQiitaItems = () => {
  const { apiKey } = useApiKey(); // APIキーを取得
  const [items, setItems] = useState<QiitaItem[]>([]);
  const [query, setQuery] = useState<string>("最新");
  const [error, setError] = useState<string | null>(null);

  const getQiitaPosts = (query: string) => {
    const searchQuery = query.trim() !== "" ? query : "最新";

    if (!apiKey) {
      setError("APIキーを入力してください。");
      return;
    }

    axios
      .get("https://qiita.com/api/v2/items", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          page: 1,
          per_page: 20,
          query: searchQuery,
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setItems(response.data);
          setError(null);
        } else {
          console.debug("No data found");
          setItems([]);
        }
      })
      .catch((error) => {
        console.debug(error);
        setError("データの取得に失敗しました。");
      });
  };

  useEffect(() => {
    if (apiKey) {
      getQiitaPosts(query); // apiKeyがある場合にのみデータ取得
    }
  }, [query, apiKey]);

  return { items, query, setQuery, getQiitaPosts, error };
};

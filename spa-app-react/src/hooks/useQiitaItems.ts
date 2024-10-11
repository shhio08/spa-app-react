import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useApiKey } from "../context/ApiKeyContext";

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
  const { apiKey } = useApiKey();
  const [items, setItems] = useState<QiitaItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const getQiitaPosts = useCallback(
    (query: string) => {
      if (!apiKey) {
        setError("APIキーを入力してください。");
        return;
      }

      const params: { page: number; per_page: number; query?: string } = {
        page: 1,
        per_page: 20,
      };

      if (query.trim() !== "") {
        params.query = query.trim();
      }
      axios
        .get("https://qiita.com/api/v2/items", {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          params: params,
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
    },
    [apiKey],
  );

  useEffect(() => {
    if (apiKey) {
      console.log("えふぇくと");
      getQiitaPosts(query);
    }
  }, [query, apiKey, getQiitaPosts]);

  return { items, query, setQuery, getQiitaPosts, error };
};

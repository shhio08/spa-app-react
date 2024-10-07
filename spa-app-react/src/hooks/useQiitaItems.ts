import { useState, useEffect } from "react";
import axios from "axios";

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
  const [items, setItems] = useState<QiitaItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // エラーメッセージ用の状態を追加

  const getQiitaPosts = (query: string) => {
    const searchQuery = query.trim() !== "" ? query : ""; // クエリを「最新」にする場合は空に
    axios
      .get("https://qiita.com/api/v2/items", {
        params: {
          page: 1,
          per_page: 20,
          query: searchQuery,
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setItems(response.data);
        } else {
          console.debug("No data found");
          setItems([]);
        }
      })
      .catch((error) => {
        console.debug(error);
        setError("データの取得に失敗しました。"); // エラーメッセージを設定
      });
  };

  useEffect(() => {
    getQiitaPosts(""); // 初回は空のクエリで取得
  }, []);

  return { items, query, setQuery, getQiitaPosts, error }; // error も返す
};

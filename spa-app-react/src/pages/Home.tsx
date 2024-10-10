// src/pages/Home.tsx
import React, { useEffect } from "react";
import QiitaTable from "../components/QiitaTable";
import SearchForm from "../components/SearchForm";
import { useQiitaItems } from "../hooks/useQiitaItems";
import { Box, Typography } from "@mui/material";
import { useApiKey } from "../context/ApiKeyContext";

const Home: React.FC = () => {
  const { items, query, setQuery, getQiitaPosts, error } = useQiitaItems();
  const { apiKey } = useApiKey();

  useEffect(() => {
    console.log("APIキー:", apiKey); // デバッグ用
    if (apiKey) {
      getQiitaPosts(query); // クエリを指定して取得
    }
  }, [apiKey, query, getQiitaPosts]); // getQiitaPostsを依存関係に追加

  console.log(items);

  return (
    <div>
      <SearchForm
        query={query}
        setQuery={setQuery}
        getQiitaPosts={getQiitaPosts}
      />

      <Box mb={5} />

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {items.length > 0 && !error && <QiitaTable items={items} />}
    </div>
  );
};

export default Home;

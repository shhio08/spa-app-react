// src/pages/Home.tsx
import React, { useEffect } from "react";
import QiitaTable from "../components/QiitaTable";
import SearchForm from "../components/SearchForm";
import { useQiitaItems } from "../hooks/useQiitaItems";
import { Box, Typography } from "@mui/material";

const Home: React.FC = () => {
  const { items, query, setQuery, getQiitaPosts, setApiKey, error } =
    useQiitaItems();

  useEffect(() => {
    getQiitaPosts(""); // 初回は空のクエリで取得
  }, [getQiitaPosts]);

  console.log(items);

  return (
    <div>
      <SearchForm
        query={query}
        setQuery={setQuery}
        getQiitaPosts={getQiitaPosts}
        setApiKey={setApiKey}
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

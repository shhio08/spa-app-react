import React, { useEffect } from "react";
import QiitaTable from "../components/QiitaTable";
import SearchForm from "../components/SearchForm";
import { useQiitaItems } from "../hooks/useQiitaItems";
import { Box, Typography } from "@mui/material";
import { useApiKey } from "../context/ApiKeyContext";

const Home: React.FC = () => {
  const { items, getQiitaPosts, error } = useQiitaItems();
  const { apiKey } = useApiKey();

  useEffect(() => {
    if (apiKey) {
      getQiitaPosts("");
    }
  }, [apiKey, getQiitaPosts]);

  return (
    <div>
      <SearchForm getQiitaPosts={getQiitaPosts} />

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

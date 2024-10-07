// src/components/SearchForm.tsx
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface SearchFormProps {
  query: string; // クエリの型
  setQuery: (query: string) => void; // setQuery の型
  getQiitaPosts: (query: string) => void; // getQiitaPosts の型
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  getQiitaPosts,
}) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        margin: "0 auto",
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="検索ワードを入力"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={() => getQiitaPosts(query)}>
        検索
      </Button>
    </Box>
  );
};

export default SearchForm;

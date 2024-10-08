// src/components/SearchForm.tsx
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface SearchFormProps {
  query: string; // クエリの型
  setQuery: (query: string) => void; // setQuery の型
  getQiitaPosts: (query: string) => void; // getQiitaPosts の型
  setApiKey: (key: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  getQiitaPosts,
  setApiKey,
}) => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false); // APIキー入力を表示するかどうか
  const [apiKey, setLocalApiKey] = useState(""); // ローカルにAPIキーを保持

  const handleApiKeySave = () => {
    setApiKey(apiKey); // APIキーを保存
    setShowApiKeyInput(false); // 入力フォームを非表示にする
  };
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
      <Box sx={{ display: "flex", gap: 2 }}>
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
        <Button
          variant="outlined"
          onClick={() => setShowApiKeyInput(!showApiKeyInput)}
        >
          APIキー入力
        </Button>
      </Box>
      {showApiKeyInput && (
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="APIキーを入力"
            variant="outlined"
            value={apiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleApiKeySave}>
            保存
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchForm;

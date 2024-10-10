// src/components/SearchForm.tsx
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useApiKey } from "../context/ApiKeyContext"; // 追加

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
  const [showApiKeyInput, setShowApiKeyInput] = useState(false); // APIキー入力を表示するかどうか
  const { setApiKey } = useApiKey(); // RecoilのAPIキー管理を使用

  const [localApiKey, setLocalApiKey] = useState(""); // ローカルにAPIキーを保持

  const handleApiKeySave = () => {
    if (localApiKey.trim() === "") {
      alert("APIキーを入力してください。"); // 入力が空のときの警告
      return;
    }
    setApiKey(localApiKey); // APIキーを保存
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
            value={localApiKey} // localApiKeyを使用
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

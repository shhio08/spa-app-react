// src/components/SearchForm.tsx
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useApiKey } from "../context/ApiKeyContext";
import { useRecoilState } from "recoil";
import { queryState } from "../recoil/atoms";

const SearchForm: React.FC<{ getQiitaPosts: (query: string) => void }> = ({
  getQiitaPosts,
}) => {
  const [query, setQuery] = useRecoilState(queryState); // queryの状態をRecoilで管理
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { setApiKey } = useApiKey();
  const [localApiKey, setLocalApiKey] = useState("");

  const handleApiKeySave = () => {
    if (localApiKey.trim() === "") {
      alert("APIキーを入力してください。");
      return;
    }
    setApiKey(localApiKey);
    setShowApiKeyInput(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ
    getQiitaPosts(query); // 検索を実行
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
      onSubmit={handleSubmit}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="検索ワードを入力"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          // onClick={() => getQiitaPosts(query)}
        >
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
            value={localApiKey}
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

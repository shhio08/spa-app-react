// src/App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Typography from "@mui/material/Typography";
import SearchForm from "./components/SearchForm";
import QiitaTable, { QiitaItem } from "./components/QiitaTable"; // QiitaItemをインポート
import { AppBar, Toolbar, Button } from "@mui/material";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<QiitaItem[]>([]);

  const getQiitaPosts = (query: string) => {
    const searchQuery = query.trim() !== "" ? query : "最新";
    axios
      .get("https://qiita.com/api/v2/items", {
        params: {
          page: "1",
          per_page: "20",
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
      });
  };

  useEffect(() => {
    getQiitaPosts("");
  }, []);

  return (
    <div className="App">
      {/* ヘッダー部分 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Qiita API Explorer
          </Typography>
          <Button color="inherit">Home</Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" component="h1" gutterBottom>
        Hello Qiita API
      </Typography>

      <SearchForm
        query={query}
        setQuery={setQuery}
        getQiitaPosts={getQiitaPosts}
      />

      <Typography variant="h5" component="h2" sx={{ marginTop: 4 }}>
        記事のタイトル一覧:
      </Typography>

      <QiitaTable items={items} />
    </div>
  );
};

export default App;

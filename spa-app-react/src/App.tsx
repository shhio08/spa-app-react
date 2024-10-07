// src/App.tsx
import React from "react";
import "./App.css";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Router from "./router";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Qiita API Explorer
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* ルーティング設定 */}
      <Router />
    </div>
  );
};

export default App;

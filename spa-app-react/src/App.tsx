// src/App.tsx
import React from "react";
import "./App.css";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Router from "./router";
import { ApiKeyProvider } from "./context/ApiKeyContext";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ApiKeyProvider>
        <div className="App">
          <AppBar position="static" sx={{ marginBottom: 5 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Qiita API Explorer
              </Typography>
              <Button color="inherit" href="/">
                Home
              </Button>
            </Toolbar>
          </AppBar>
          <Router />
        </div>
      </ApiKeyProvider>
    </RecoilRoot>
  );
};

export default App;

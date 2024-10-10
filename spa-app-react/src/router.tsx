// src/router.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<ItemDetail />} />
    </Routes>
  );
};

export default Router;

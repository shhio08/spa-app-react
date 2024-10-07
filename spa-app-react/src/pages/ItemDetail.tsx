// src/pages/ItemDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // ここでAPIから詳細データを取得する処理を実装することができます
  return (
    <div>
      <Typography variant="h4">記事詳細ページ</Typography>
      <Typography variant="h6">ID: {id}</Typography>
      {/* 詳細データの表示 */}
    </div>
  );
};

export default ItemDetail;

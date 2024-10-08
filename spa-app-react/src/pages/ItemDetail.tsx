// src/pages/ItemDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useQiitaItems } from "../hooks/useQiitaItems";

interface QiitaUser {
  id: string;
  name: string;
}

interface QiitaItem {
  id: string;
  title: string;
  body: string; // bodyを追加
  user: QiitaUser;
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<QiitaItem | null>(null); // QiitaItem型を使用
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { apiKey } = useQiitaItems();

  useEffect(() => {
    if (!apiKey) {
      setError("APIキーが設定されていません。");
      setLoading(false);
      return;
    }
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get<QiitaItem>(
          `https://qiita.com/api/v2/items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`, // APIキーをヘッダーに追加
            },
          },
        );
        setItem(response.data);
      } catch (error) {
        console.error(error);
        setError("記事の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id, apiKey]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4">{item?.title}</Typography>
      <Typography variant="subtitle1">作成者: {item?.user.name}</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: item?.body || "" }} />
      </Typography>
    </div>
  );
};

export default ItemDetail;

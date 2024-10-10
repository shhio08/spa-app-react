import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { useApiKey } from "../context/ApiKeyContext";
import DOMPurify from "dompurify"; // DOMPurifyをインポート
import { marked } from "marked";

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
  const { apiKey } = useApiKey();
  const [htmlBody, setHtmlBody] = useState<string>("");

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

        const markedBody = marked(response.data.body);
        const cleanBody = DOMPurify.sanitize(markedBody as string);
        setHtmlBody(cleanBody);
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
    <Box
      sx={{
        maxWidth: "800px", // 横幅の制限
        margin: "0 auto", // 中央寄せ
        textAlign: "left", // 左寄せ
        padding: "16px", // 内側の余白
        "& img": {
          maxWidth: "100%", // 画像が枠を超えないように
          height: "auto", // アスペクト比を保つ
        },
      }}
    >
      <Typography variant="h4">{item?.title}</Typography>
      <Typography variant="subtitle1">
        {item?.user &&
          `@${item.user.id}${item.user.name ? ` (${item.user.name})` : ""}`}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      </Typography>
    </Box>
  );
};

export default ItemDetail;

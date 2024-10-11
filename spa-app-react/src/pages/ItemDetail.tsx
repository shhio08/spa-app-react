import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { useApiKey } from "../context/ApiKeyContext";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface QiitaUser {
  id: string;
  name: string;
}

interface QiitaItem {
  id: string;
  title: string;
  body: string;
  user: QiitaUser;
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<QiitaItem | null>(null);
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
              Authorization: `Bearer ${apiKey}`,
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
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "left",
        padding: "16px",
        "& img": {
          maxWidth: "100%",
          height: "auto",
        },
      }}
    >
      <Typography variant="h4">{item?.title}</Typography>
      <Typography variant="subtitle1">
        {item?.user &&
          `@${item.user.id}${item.user.name ? ` (${item.user.name})` : ""}`}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      </Box>
    </Box>
  );
};

export default ItemDetail;

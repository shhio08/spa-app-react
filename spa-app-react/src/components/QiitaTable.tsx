import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface QiitaItem {
  id: string;
  title: string;
  url: string;
  user?: {
    id: string; // ユーザーIDを追加
    name: string;
  };
}

interface QiitaTableProps {
  items: QiitaItem[];
}

const QiitaTable: React.FC<QiitaTableProps> = ({ items }) => {
  // APIから取得したアイテムをコンソールに出力
  console.log(items); // ここでアイテムをログに出力

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "タイトル",
      width: 400,
      renderCell: (params) => (
        <a href={params.row.url} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "userId", // フィールド名をuserIdに変更
      headerName: "ユーザーID", // ヘッダー名も変更
      width: 200,
      renderCell: (params) => (
        <span>{params.row.userId || "不明なユーザー"}</span>
      ),
    },
    {
      field: "details",
      headerName: "記事詳細",
      width: 150,
      renderCell: (params) => (
        <a href={params.row.url} target="_blank" rel="noopener noreferrer">
          詳細を見る
        </a>
      ),
    },
  ];

  return (
    <div style={{ height: 400, maxWidth: "800px", margin: "0 auto" }}>
      <DataGrid
        rows={items.map((item) => ({
          id: item.id,
          title: item.title,
          userId: item.user?.id || "不明なユーザー", // userIdを使用
          url: item.url,
        }))}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        pageSizeOptions={[5, 10, 20]}
        pagination
        checkboxSelection={false}
      />
    </div>
  );
};

export default QiitaTable;

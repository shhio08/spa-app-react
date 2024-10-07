// src/components/QiitaTable.tsx
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom"; // Linkをインポート

// QiitaItem のインターフェースはそのままです
export interface QiitaItem {
  id: string;
  title: string;
  url: string;
  user?: {
    id: string;
    name: string;
  };
}

// QiitaTableProps インターフェースを追加
interface QiitaTableProps {
  items: QiitaItem[]; // items の型を指定
}

const QiitaTable: React.FC<QiitaTableProps> = ({ items }) => {
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
        <Link
          to={`/items/${params.row.id}`}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "userId",
      headerName: "ユーザーID",
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
        <Link
          to={`/items/${params.row.id}`}
          style={{ textDecoration: "none", color: "blue" }}
        >
          詳細を見る
        </Link>
      ),
    },
  ];

  return (
    <div style={{ height: 400, maxWidth: "800px", margin: "0 auto" }}>
      <DataGrid
        rows={items.map((item) => ({
          id: item.id,
          title: item.title,
          userId: item.user?.id || "不明なユーザー",
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

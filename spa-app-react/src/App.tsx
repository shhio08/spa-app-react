import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Qiita APIのレスポンス用の型定義
interface QiitaItem {
  id: string;
  title: string;
  url: string;
  user: {
    id: string;
    name: string;
  };
}

const App: React.FC = () => {
  // 状態を管理
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<QiitaItem[]>([]);

  // QiitaAPIを叩く関数
  const getQiitaPosts = (query: string) => {
    const searchQuery = query.trim() !== "" ? query : "最新"; // クエリが空の場合にデフォルト値を使用
    axios
      .get("https://qiita.com/api/v2/items", {
        params: {
          page: "1",
          per_page: "20",
          query: searchQuery, // デフォルトまたはユーザー指定のクエリ
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setItems(response.data); // レスポンスのデータをセット
        } else {
          console.debug("No data found");
          setItems([]); // データがない場合は空の配列
        }
      })
      .catch((error) => {
        console.debug(error);
      });
  };

  // コンポーネントがマウントされたときに最新記事を取得
  useEffect(() => {
    getQiitaPosts(""); // 空のクエリで最新記事を取得
  }, []);

  return (
    <div className="App">
      <Typography variant="h4" component="h1" gutterBottom>
        Hello Qiita API
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 600, margin: "0 auto", width: "100%" }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="検索ワードを入力"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // 検索クエリをユーザーが変更できるようにする
          fullWidth
        />
        <Button
          variant="contained"
          onClick={() => getQiitaPosts(query)} // 検索ボタンでAPIを再呼び出し
        >
          検索
        </Button>
      </Box>

      <Typography variant="h5" component="h2" sx={{ marginTop: 4 }}>
        記事のタイトル一覧:
      </Typography>

      {items.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "0 auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>タイトル</TableCell>
                <TableCell align="right">ユーザーID</TableCell>
                <TableCell align="right">リンク</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="right">{item.user.id}</TableCell>
                  <TableCell align="right">
                    <a href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      リンク
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>記事が見つかりませんでした。</Typography>
      )}
    </div>
  );
};

//apiで郵便番号から都道府県を取得するコード
// function App() {
//   const { useState, useEffect } = React;
//   const [ message, getMessage ] = useState("783-0060の都道府県は？");
//   useEffect(() => {
//     axios.get("https://zipcloud.ibsnet.co.jp/api/search?zipcode=7830060")
//       .then((results) => {
//         console.log(results.data);
//         getMessage(results.data.results[0].address1);
//       })
//       .catch((error) => {
//         console.log('失敗');
//         console.log(error.status);
//       });
//   });
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <p>{message}</p>
//       </header>
//     </div>
//   );

//デフォルトのコード
// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.tsx</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React!!!
//       </a>
//     </header>
//   </div>
// );
// }

export default App;

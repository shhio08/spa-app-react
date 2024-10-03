import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
  const [titles, setTitles] = useState<string[]>([]);

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
          // Qiita APIレスポンスの型を使用
          const fetchedTitles = response.data.map(
            (item: QiitaItem) => item.title,
          );
          setTitles(fetchedTitles); // タイトルの配列をセット
        } else {
          console.debug("No data found");
          setTitles([]); // データがない場合は空の配列
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
      <h1 className="app-title">Hello Qiita API</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // 検索クエリをユーザーが変更できるようにする
        placeholder="検索ワードを入力"
      />
      <input
        type="button"
        value="検索"
        onClick={() => getQiitaPosts(query)} // 検索ボタンでAPIを再呼び出し
      />

      <h2>記事のタイトル一覧:</h2>
      <ul>
        {titles.length > 0 ? (
          titles.map((title, index) => <li key={index}>{title}</li>)
        ) : (
          <p>記事が見つかりませんでした。</p>
        )}
      </ul>
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

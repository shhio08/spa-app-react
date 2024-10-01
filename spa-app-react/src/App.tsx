import React, { Component } from 'react';
// import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';

// Propsの型を定義（ここでは空のオブジェクト）
interface AppProps {}

// Stateの型を定義
interface AppState {
  query: string;
  title?: string;
  url?: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.getQiitaPosts = this.getQiitaPosts.bind(this);
    this.state = {
      // ここを`React`など検索したいワードに変えられる
      query: 'React'
    }
  }

  // QiitaAPIを叩く
  getQiitaPosts() {
    //axios.get(APIのエンドポイント,パラメータの引数)
    axios.get('https://qiita.com/api/v2/items', {
        params: {
          "page": "1",
          "per_page": "20",
          "query": this.state.query,
        }
      })
      // response にAPIからのレスポンスが格納される
      .then((response) => {
        // data にレスポンスから帰ってきた1つ目の記事の情報を格納
        const data = response.data[0];
        this.setState({
          title: data.title,
          url: data.url,
        });
        // コンソールから response と title と url を確認
        console.debug(response, "ressponse");
        console.debug(this.state.title, "title")
        console.debug(this.state.url, "url")
      })
      .catch((error) => {
        console.debug(error);
      });
  }

  // 表示されるHTMLを記述
  render() {
    return (
      <div className="App">
        <h1 className="app-title">Hello Qiita API</h1>
        <p>タイトル: {this.state.title}</p>
        <p>URL: <a target="__blank" href={this.state.url}>{this.state.url}</a></p>
        <input
          type="button"
          value="検索"
          onClick={() => this.getQiitaPosts()}
        />
      </div>
    )
  }
}

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

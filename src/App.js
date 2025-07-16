import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon" //ポケモンAPIの初期URL
  const [loading, setLoading] = useState(true); //ローディング状態(初期はロード中を示すtrue)
  const [pokemonData, setPokemonData] = useState([]); //1P分のポケモンデータ配列
  const [nextURL, setNextURL] = useState(""); //次のページのURL
  const [prevURL, setPrevURL] = useState(""); //前のページのURL

  // ページ読み込み時に発火
  useEffect(() => {
    const fetchPokemonData = async () => {
      // res:全てのポケモンデータ
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res.next); // デバッグ用
      setNextURL(res.next); // 次のページのURLを持つ
      setLoading(false); // ローディングが終わったので状態を更新
    };
    fetchPokemonData(); //fetchPokemonData関数を呼び出す
  }, []);

  // data(results配列)からpokemon(要素オブジェクト)を取得し、getPokemon関数を呼び出す
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData); //取得したポケモンデータを状態に保存
  };

  // console.log(pokemonData); // デバッグ用

  // 「次へ」ボタンの処理
  const handleNextPage = async () => {
    setLoading(true); //ロード中
    let data = await getAllPokemon(nextURL);
    // console.log(data); // デバッグ用
    await loadPokemon(data.results);
    setNextURL(data.next); // 次のページのURLを持つ
    setPrevURL(data.previous); // 前のページのURLを持つ
    setLoading(false); // ロード完了
  };

  // 「前へ」ボタンの処理
  const handlePrevPage = async () => {
    if (!prevURL) {
      alert("前のページが存在しません。");
      return;
    }
    setLoading(true); //ロード中
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next); // 次のページのURLを持つ
    setPrevURL(data.previous); // 前のページのURLを持つ
    setLoading(false); // ロード完了
  };

  // Appコンポーネントとして、JSXを返すメイン部分
  return (
    <>
      <Navbar />
      <div className="App">
        {
          loading ? (
            <h1>ロード中・・・</h1>
          ) : (
            // メインで表示している部分
            <>
              {/* 「前へ」と「次へ」ボタンを表示 */}
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>

              {/* ポケモンカードを表示 */}
              <div className="pokemonCardContainer">
                {pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />;
                })}
              </div>

              {/* 「前へ」と「次へ」ボタンを表示 */}
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
            </>
          )
        }
      </div>
    </>
  );
}

export default App;

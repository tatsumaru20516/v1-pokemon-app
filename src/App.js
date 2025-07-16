import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon" //ポケモンAPIの初期URL
  const [loading, setLoading] = useState(true); //ローディング状態を管理するためのuseStateフック
  const [pokemonData, setPokemonData] = useState([]); //ポケモンデータを管理するためのuseStateフック

  // ページ読み込み時にポケモンデータを取得する
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res.results);
      // ローディングが終わったので状態を更新
      setLoading(false);
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
  console.log(pokemonData); //取得したポケモンデータをコンソールに出力

  // Appコンポーネントとして、JSXを返すメイン部分
  return (
    <>
      <Navbar />
      <div className="App">
        {
          loading ? (
            <h1>ロード中・・・</h1>
          ) : (
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
          )
        }
      </div>
    </>
  );

}

export default App;

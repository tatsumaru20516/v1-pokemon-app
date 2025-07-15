import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon" //ポケモンAPIの初期URL
  const [loading, setLoading] = useState(true); //ローディング状態を管理するためのuseStateフック

  useEffect(() => {
    //asyncアロー関数を定義し、関数をfetchPokemonData変数に代入
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData(); //fetchPokemonData関数を呼び出す
  }, []);


  return (
    <div className="App">
      {
        loading
          ? <h1>ロード中・・・</h1>
          : <h1>ロード完了</h1>
      }
    </div>
  );
  
}

export default App;

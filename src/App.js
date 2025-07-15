import { useEffect } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon" //ポケモンAPIの初期URL


  useEffect(() => {
    //asyncアロー関数を定義し、関数をfetchPokemonData変数に代入
    const fetchPokemonData = async () => { 
      let res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData(); //fetchPokemonData関数を呼び出す
  }, []);


  return (<div className="App"></div>);
}

export default App;

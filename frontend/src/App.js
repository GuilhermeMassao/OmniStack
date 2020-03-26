import React, {useState} from 'react';

import Header from './Header';

import Logon from './pages/Logon';

import Routes from './routes'

import './global.css'
// JSX(Javascript XML)

function App() {
  return (
    <Routes></Routes>
  );
  // let [counter, setCounter] = useState(0); //retorna array[valor,funcaoDeAtualizacao]

  // function increment(){
  //   setCounter(++counter);
    
  //   console.log(counter);
  // }

  // return (
  //   <div>
  //   <Logon></Logon>
  //   <Header>Contador: {counter}</Header>
  //   <button onClick={increment}>aumentar</button>
  //   </div>
  // );
}

export default App;

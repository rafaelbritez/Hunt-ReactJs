import React, {Component} from 'react';
import Routes from './routes';
import Header from './components/Header';
import "./styles.css";

const App = ()=>(
  <div className="App">
    <Header></Header>
    <Routes></Routes>
  </div>
);



export default App;

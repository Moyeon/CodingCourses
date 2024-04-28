import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import RandomGame from "./screens/RandomGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./screens/NotFound";
import Main from "./screens/Main";
import TicTacToe from "./screens/TicTacToe";
import Orthello from "./screens/Orthello";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/random" element={<RandomGame></RandomGame>}></Route>
          <Route path="/hello" element={<div>HELLO</div>}></Route>
          <Route path="/tictactoe" element={<TicTacToe></TicTacToe>}></Route>
          <Route path="/orthello" element={<Orthello></Orthello>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

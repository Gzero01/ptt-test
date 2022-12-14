import React from "react";
import Tree from "./component/Tree";
import Fruit from "./component/Fruit";

import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tree />} />
      <Route path="/fruit" element={<Fruit />} />
    </Routes>
     
    </BrowserRouter>
  );
};

export default App;

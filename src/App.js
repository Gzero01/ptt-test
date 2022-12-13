import React from "react";
import Tree from "./component/Tree";
import Test from "./component/Test";

import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tree />} />
      <Route path="/test" element={<Test />} />
    </Routes>
     
    </BrowserRouter>
  );
};

export default App;

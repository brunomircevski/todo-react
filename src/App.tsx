import React from "react";
import Tasks from "./components/tasks";
import Form from "./components/form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Archive from "./components/archive";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container" style={{ maxWidth: 550 }}>
        <Routes>
          <Route index element={<Tasks />}></Route>
          <Route path="add" element={<Form />}></Route>
          <Route path="archive" element={<Archive />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

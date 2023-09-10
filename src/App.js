import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Questions from "./components/Questions";
import Result from "./components/Result";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
        <Route path="/result" element={<Result />}></Route>
      </Routes>
    </div>
  );
}

export default App;

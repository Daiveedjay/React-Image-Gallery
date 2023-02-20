import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MasonryGrid from "./components/MasonryGrid";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* <Routes>
          <Route path="/" element={<MasonryGrid />} />
        </Routes> */}
        <MasonryGrid />
      </div>
    </BrowserRouter>
  );
}

export default App;

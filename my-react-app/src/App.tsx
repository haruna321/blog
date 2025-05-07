import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </>
  );
};

export default App;
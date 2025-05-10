import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/contact" element={<Form />} />
      </Routes>
    </>
  );
};

export default App;
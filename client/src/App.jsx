import NavCom from "./components/NavCom";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Home from "./components/Home";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Container>
  );
}

export default App;

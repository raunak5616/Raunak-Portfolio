import { Routes, Route } from "react-router-dom";
import Hero  from "./pages/hero";
import  About  from "./pages/about";
import  Projects  from "./pages/projects";
import  Contact  from "./pages/contact";
import Layout from "./pages/layout"; 
import Isometric2048 from "./pages/isometric2048";

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/isometric-2048" element={<Isometric2048 />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
  );
}

export default App;

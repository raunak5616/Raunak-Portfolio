import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Hero from "./pages/hero";
import PageLoader from "./component/PageLoader";
import { routeImporters } from "./utils/routePreload";

const About = lazy(routeImporters.about);
const Projects = lazy(routeImporters.projects);
const Contact = lazy(routeImporters.contact);
const Isometric2048 = lazy(routeImporters.isometric2048);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/isometric-2048" element={<Isometric2048 />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

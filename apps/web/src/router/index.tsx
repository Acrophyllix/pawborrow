import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/AboutPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> }
]);

export default router;
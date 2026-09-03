import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/AboutPage";
import Login from "@/pages/Login";
import PetsPage from "@/pages/PetsPage";
import Tos from "@/pages/Tos";
import Privacy from "@/pages/Privacy";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Tos/>},
  { path: "/pets", element: <PetsPage />}
]);

export default router;
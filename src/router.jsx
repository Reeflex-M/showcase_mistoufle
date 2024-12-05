import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import Conditions from "./pages/Conditions/Conditions";
import Support from "./pages/Support/Support";
import Contact from "./pages/Contact/Contact";
import Adoptions from "./pages/Adoptions/Adoptions";
import About from "./pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/conditions",
        element: <Conditions />,
      },
      {
        path: "/adoptions",
        element: <Adoptions />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

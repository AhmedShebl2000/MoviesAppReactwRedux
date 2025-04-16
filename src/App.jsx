import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import AppLayout from "./components/AppLayout";
import MovieDetails from "./features/MovieDetails";
import Favorites from "./features/favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

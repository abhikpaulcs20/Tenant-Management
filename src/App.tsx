import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import AppLayout from "./layout/app-layout";
import { ThemeProvider } from "./components/theme-provider";

// Define the routes
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      {" "}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

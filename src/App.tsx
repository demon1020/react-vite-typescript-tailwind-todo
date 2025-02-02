import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import useTheme from "./hooks/useTheme";

function App() {
  useTheme(); // Use the custom theme hook

  return (
    <Suspense>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </Suspense>
  );
}

export default App;

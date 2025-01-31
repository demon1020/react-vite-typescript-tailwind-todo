import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Suspense>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </Suspense>
  );
}

export default App;

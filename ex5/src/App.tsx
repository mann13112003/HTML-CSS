import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./constant/path.constants";
import HomePage from "./pages/Home";
import ToDoAppPage from "./pages/ToDoApp";
import LogInPage from "./pages/LogIn";

import ProtectRoutes from "./auth/protectRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LogInPage />} />
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectRoutes>
              <HomePage />
            </ProtectRoutes>
          }
        />
        <Route path={ROUTES.TODOAPP} element={<ToDoAppPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;

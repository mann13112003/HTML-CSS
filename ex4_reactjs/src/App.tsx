import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/Home";
import ToDoAppPage from "./pages/ToDoApp";
import FormValidationPage from "./pages/Validation";
import { ROUTES } from "./constant/path.constants";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.TODOAPP} element={<ToDoAppPage />} />
        <Route path={ROUTES.FORMVALIDATE} element={<FormValidationPage />} />
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

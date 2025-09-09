import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/Home";
import ToDoApp from "./pages/ToDoApp";
import Validation from "./pages/Validation";
function App() {
  return (
    <BrowserRouter>
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/to-do-app" element={<ToDoApp />} />
        <Route path="/form-validate" element={<Validation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

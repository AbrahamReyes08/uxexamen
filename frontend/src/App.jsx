import logo from "./logo.svg";
import "./App.css";
import axiosInstance from "./api/axiosInstance";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

/*
const testApiCall = async () => {
    try {
      const response = await axiosInstance.get("/test");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  testApiCall();
*/
export default App;

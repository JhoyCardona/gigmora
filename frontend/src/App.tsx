import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";
import MyOrders from "./pages/MyOrders";
import MyServices from "./pages/MyServices";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/my-services" element={<MyServices />} />
        </Routes>
      </BrowserRouter>
      <Chatbot />
    </AuthProvider>
  );
}

export default App;
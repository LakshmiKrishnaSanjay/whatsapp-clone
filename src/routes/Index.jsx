
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/guest/Home";
import HomePage from "../pages/User/HomePage";
import Profile from "../pages/User/Profile";
import Signin from "../pages/guest/Signin";


export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/login" element={<LoginPage />} />
          <Route path="/gg" element={<Home />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/homepage" element={<HomePage/>}  />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/" element={<Signin/>}/>
          
      </Routes>
    </BrowserRouter>
  );
}
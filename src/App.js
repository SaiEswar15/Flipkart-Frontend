
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import SearchPage from "./components/SearchPage";
import ProductPage from "./components/ProductPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        

        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/cart" exact element={<Cart/>} />
          <Route path="/searchpage" exact element={<SearchPage/>} />
          <Route path="/productpage" exact element={<ProductPage/>}/>
          <Route path="/loginpage" exact element={<LoginPage/>}/>
          <Route path="/signuppage" exact element={<SignupPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}


import { Navigate, Redirect, Route, Routes, Switch } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <header>
        <MainHeader />
      </header>
      <main>
        <Routes>
          {/* <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route> */}

          <Route path="/" element={<Navigate replace to="/welcome" />} />
          <Route path="/welcome/*" element={<Welcome />}>
            <Route path="new-user" element={<p>Welcome, new user</p>} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />

          {/* <Route path="/products/:productId">
            <ProductDetail />
          </Route> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./assets/components/pages/Home";
import Contact from "./assets/components/pages/Contect";
import Login from "./assets/components/pages/Login";
import Signup from "./assets/components/pages/Signup";
import ProductDetails from "./assets/components/pages/ProductDetails";
import Navbar from "./assets/components/pages/Navbar";
import Footer from "./assets/components/Footer";
import PrivateRoute from "./assets/components/pages/PrivateRoute";
import Loader from "./assets/components/pages/Loader";
import NotFound from "./assets/components/pages/NotFound";
import About from "./assets/components/pages/About";
import Account from "./assets/components/pages/Account";
import ViewAllProducts from "./assets/components/pages/ViewAllProducts";
import { CartProvider } from "./assets/components/pages/CartContext";
import FavoritesProvider from "./assets/components/pages/FavoritesProvider";
import CartPage from "./assets/components/pages/CartPage";
import { ProductProvider } from "./assets/components/pages/ProductContext";
import "./Firebase";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkInternet = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    checkInternet();
  }, []);

  if (loading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <FavoritesProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />

              <main className="flex-grow">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <CartPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={token ? <Navigate to="/" /> : <Login />}
                  />
                  <Route
                    path="/signup"
                    element={token ? <Navigate to="/" /> : <Signup />}
                  />
                  <Route
                    path="/products/viewall"
                    element={
                      <PrivateRoute>
                        <ViewAllProducts />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/product/:id" 
                    element={<ProductDetails />} 
                  />
                  <Route
                    path="/about"
                    element={
                      <PrivateRoute>
                        <About />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <PrivateRoute>
                        <Account />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;

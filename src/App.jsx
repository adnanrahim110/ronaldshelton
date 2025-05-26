import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import OpenAtTop from "./components/common/OpenAtTop";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import ReadBook from "./components/layouts/ReadBook";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/routes";

const App = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 0);
    }
  }, [hash]);

  return (
    <>
      <CartProvider>
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />
        <ReadBook />
        <AppRoutes />
        <OpenAtTop />
        <Footer />
      </CartProvider>
    </>
  );
};

export default App;

import { ToastContainer } from "react-toastify";
import OpenAtTop from "./components/common/OpenAtTop";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import ReadBook from "./components/layouts/ReadBook";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/routes";

const App = () => {
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

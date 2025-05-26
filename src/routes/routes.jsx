import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader";

const Home = lazy(() => import("../pages/Home"));
const Author = lazy(() => import("../pages/Author"));
const Book = lazy(() => import("../pages/Book"));
const Blogs = lazy(() => import("../pages/Blogs"));
const Blog = lazy(() => import("../pages/Blog"));
const Faq = lazy(() => import("../pages/Faq"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author" element={<Author />} />
        <Route path="/book" element={<Book />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

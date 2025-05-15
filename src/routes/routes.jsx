import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader";
import { lazyWithPreload } from "../context/lazyWithPreload";
import { ProgressProvider, useProgress } from "../context/ProgressContext";

const Home = lazyWithPreload(() => import("../pages/Home"));
const Author = lazyWithPreload(() => import("../pages/Author"));
const Book = lazyWithPreload(() => import("../pages/Book"));
const Blogs = lazyWithPreload(() => import("../pages/Blogs"));
const Blog = lazyWithPreload(() => import("../pages/Blog"));
const Faq = lazyWithPreload(() => import("../pages/Faq"));
const Cart = lazyWithPreload(() => import("../pages/Cart"));
const Checkout = lazyWithPreload(() => import("../pages/Checkout"));

function RoutesWithProgress() {
  const { progress, setProgress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const routes = [Home, Author, Book, Blogs, Blog, Faq, Cart, Checkout];
    const total = routes.length;
    let loadedCount = 0;

    routes.forEach((route) => {
      route.preload().then(() => {
        loadedCount += 1;
        setProgress(Math.round((loadedCount / total) * 100));
      });
    });
  }, [setProgress]);

  useEffect(() => {
    if (progress >= 100) {
      const elapsed = Date.now() - startTimeRef.current;
      const minDelay = 1000;
      const remaining = elapsed < minDelay ? minDelay - elapsed : 0;
      const timeoutId = setTimeout(() => setShowLoader(false), remaining);
      return () => clearTimeout(timeoutId);
    }
  }, [progress]);

  if (showLoader) {
    return <Loader progress={progress} />;
  }

  return (
    <Suspense fallback={null}>
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
}

export default function AppRoutes() {
  return (
    <ProgressProvider>
      <RoutesWithProgress />
    </ProgressProvider>
  );
}

import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import ReadBook from "./components/layouts/ReadBook";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <>
      <Header />
      {/* <ReadBook /> */}
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;

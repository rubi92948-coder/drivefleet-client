import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop"; // 1. Imported ScrollToTop

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#020617]">
      {/* 2. Added ScrollToTop component here */}
      <ScrollToTop /> 
      
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
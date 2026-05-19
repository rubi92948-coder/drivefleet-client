import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#020617] min-h-screen text-white">

      <Navbar />

      <main className="pt-16">
        {children}
      </main>

      <Footer />

    </div>
  );
};

export default Layout;
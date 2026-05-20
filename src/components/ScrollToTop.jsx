import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Automatically scroll to the top of the page on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render any UI
};

export default ScrollToTop;
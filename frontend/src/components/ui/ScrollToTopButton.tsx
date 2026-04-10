import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-5 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#011468] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-[#3f4f96] hover:-translate-y-1 z-[1000]"
      aria-label="Subir al inicio"
    >
      <FaArrowUp />
    </button>
  );
};

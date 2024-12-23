import { useEffect, useState } from "react";
import ShinyButton from "./ui/shiny-button";
import { GoArrowUpRight } from "react-icons/go";

function Announcement() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Announcement categories
  const announcementcategories = [
    { showtext: "Try Our newest features and make integration superfast" },
  ];

  return (
    <div
      className={`flex justify-center items-center duration-100 h-14 bg-purple-700 gap-5 ${
        scrolled ? "rounded-none m-0" : "rounded-tl-lg rounded-tr-lg"
      }`}
    >
      {announcementcategories.map((item, index) => (
        <div key={index} className="text-md p-3">
          {item.showtext}
        </div>
      ))}
      <ShinyButton className="flex items-center bg-white text-xs px-4 py-1 rounded">
        <p className="text-xs text-black font-semibold">Try it now</p>
      </ShinyButton>
    </div>
  );
}

export default Announcement;

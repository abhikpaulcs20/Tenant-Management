import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface MenuItem {
  name: string;
  link: string;
}

interface MobMenuProps {
  Menus: MenuItem[];
}

export default function MobMenu({ Menus }: MobMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger automatic scroll when isScrolled is true
  useEffect(() => {
    if (scrolled) {
      window.scrollBy(0, 50); // Scrolls down by 50px when isScrolled is true
    }
  }, [scrolled]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // When menu is opened, force the scrolled state to true
      setScrolled(true);
    } else {
      // When menu is closed, revert the scroll state
      setScrolled(window.scrollY > 0);
    }
  };

  return (
    <div
      className={`relative flex justify-between items-center  transition-all duration-300 ${
        scrolled ? "m-0 rounded-none" : "m-2 rounded-3xl"
      }`}
    >
      {/* Button to toggle the menu */}
      <button className="lg:hidden z-50" onClick={toggleDrawer}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleDrawer} // Clicking on the overlay closes the menu
        />
      )}

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 left-0 bg-black text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="p-4">
          <ul className="flex flex-col items-stretch gap-2">
            {Menus.map((menuItem) => (
              <li
                key={menuItem.name}
                className="w-full rounded-md hover:bg-zinc-700 transition-colors"
              >
                <a
                  href={menuItem.link}
                  className="block w-full p-3 text-left text-sm"
                >
                  {menuItem.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

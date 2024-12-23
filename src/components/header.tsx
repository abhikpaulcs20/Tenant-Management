import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import MobMenu from "./MobMenu";
import MorphingText from "./ui/morphing-text";
import { ModeToggle } from "./mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./ui/navigation-menu";
import Announcement from "./announcement";

function Header() {
  const navCategories = [
    {
      name: "Pricing",
      link: "/pricing",
      content: [
        {
          title: "Personal Plan",
          description: "Perfect for individual users",
        },
        {
          title: "Business Plan",
          description: "Ideal for small teams",
        },
        {
          title: "Enterprise",
          description: "Custom solutions for large organizations",
        },
      ],
    },
    {
      name: "Resources",
      link: "/resources",
      content: [
        {
          title: "Documentation",
          description: "Comprehensive guides and API references",
        },
        { title: "Tutorials", description: "Step-by-step learning materials" },
        { title: "Blog", description: "Latest updates and best practices" },
      ],
    },
    {
      name: "Community",
      link: "/community",
      content: [
        { title: "Forum", description: "Connect with other developers" },
        { title: "Discord", description: "Join our active Discord community" },
        { title: "Events", description: "Upcoming meetups and webinars" },
      ],
    },
    {
      name: "Start Now",
      link: "/start-now",
    },
  ];
  const texts = ["pay", "swipe", "pay", ":) "];

  return (
    <>
      <Announcement />
      <nav className="text-white px-28 py-4  bg-black rounded-tl-3xl rounded-tr-3xl ">
        <div className="container mx-auto flex justify-between items-center w-full">
          {/* Logo and Brand Section */}
          <div className="flex justify-start items-center lg:space-x-28">
            <div className="flex">
              <Link to="/" className="flex items-center gap-5">
                <img
                  src="log.svg"
                  alt="Tenzopay Logo"
                  className="h-8 w-8 mt-1"
                />
                <div className="relative flex items-center">
                  <span className="font-bold text-2xl text-white">Tenzo</span>
                  <div className="relative h-8 flex items-center">
                    <MorphingText
                      className="ml-0 !h-auto !text-base sm:!text-lg md:!text-xl lg:!text-2xl"
                      texts={texts}
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Navigation Items for Large Screens */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="flex gap-1">
                {navCategories.map((category) => (
                  <NavigationMenuItem key={category.name} className="">
                    {category.name === "Start Now" ? (
                      <Link
                        to={category.link}
                        className="text-blue-600 hover:text-zinc-100 font-semibold md:text-[15px]"
                      >
                        {category.name}
                      </Link>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="text-zinc-400 hover:text-zinc-100 bg-black hover:bg-zinc-600 font-semibold md:text-[15px] text-lg">
                          {category.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[400px] bg-black rounded-md p-4 shadow-lg">
                            <div className="grid gap-4">
                              {category.content?.map((item, index) => (
                                <div
                                  key={index}
                                  className="group block space-y-1 p-3 rounded-md hover:bg-zinc-800"
                                >
                                  <div className="text-white font-medium leading-none">
                                    {item.title}
                                  </div>
                                  <div className="text-zinc-300 text-sm">
                                    {item.description}
                                  </div>
                                </div>
                              ))}
                              <Link
                                to={category.link}
                                className="block p-3 rounded-md hover:bg-zinc-50"
                              >
                                <div className="text-blue-600 text-sm font-medium">
                                  View All {category.name} →
                                </div>
                              </Link>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Buttons and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Buttons for Large Screens */}
            <div className="hidden lg:flex space-x-4">
              <Link to="/sign-in">
                <Button variant="ghost" className="text-sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/get-started">
                <Button className="text-sm">Get Started</Button>
              </Link>
              {/* <ModeToggle /> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <MobMenu Menus={navCategories} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

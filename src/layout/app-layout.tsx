import { Outlet } from "react-router-dom";
import Header from "../components/header";
import React, { useState, useEffect } from "react";
import Announcement from "@/components/announcement";

function AppLayout() {
  //state  that tracks whether the page is scrolled or not
  // Initially whenever the page is rendered as it is set to false
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    // Like a superman who listen to all the events happening and we can set for diffrent other event also
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`bg-black text-white min-h-screen transition-all duration-400 relative ${
          scrolled
            ? "rounded-none m-0 border-none" // When scrolled, remove rounded corners and margins
            : " rounded-3xl m-6 border-1 border-white "
          // When not scrolled, apply rounded corners, margin, and border
        }`}
      >
        <div className="sticky top-0 z-50 rounded-lg pt-0">
          <Header />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
      {/* This div ensures we always have scroll space */}
    </>
  );
}

export default AppLayout;

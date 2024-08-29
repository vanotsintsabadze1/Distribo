"use client";
import { ChevronLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };
  const handleOpen = () => {
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Menu size={30} className="m-2 block md:hidden" onClick={handleOpen} />
      {isMenuOpen && (
        <>
          <div
            className="absolute left-0 top-0 z-30 block h-screen w-screen bg-white md:hidden"
            onClick={handleClose}
          ></div>
          <div className="absolute left-0 top-0 z-50 block h-screen w-4/5 border-r-2 bg-[#fdf9f7] md:hidden">
            <div className="flex justify-end p-2">
              <X size={30} onClick={handleClose} />
            </div>
            <h1 className="p-4 text-xl font-bold">Overview</h1>
            <Navigation />
          </div>
        </>
      )}
      <aside
        className={`${!isMinimized ? "w-80" : "w-auto"} relative hidden h-screen border-r-2 border-gray-100 bg-[#fdf9f7] transition-all duration-500 md:block`}
      >
        <Logo />
        <ChevronLeft
          className={`text-foreground absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-white text-3xl transition-transform duration-500 ${isMinimized && "rotate-180"}`}
          onClick={handleToggle}
        />
        <Navigation isMinimized={isMinimized} />
      </aside>
    </>
  );
}

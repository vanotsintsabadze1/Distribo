"use client";
import { ChevronLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileBurgerMenu from "./MobileBurgerMenu";
import { AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleToggle() {
    setIsMinimized(!isMinimized);
  }

  function burgerMenuToggle() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <div>
      {/* For Mobile */}
      <div className="absolute w-full p-2 md:hidden">
        <div className="relative">
          <button
            onClick={burgerMenuToggle}
            className={`absolute left-0 top-0 z-40 cursor-pointer ${isBurgerMenuOpen ? "text-white" : "text-black"}`}
          >
            <Menu size={35} />
          </button>
          <AnimatePresence>{isBurgerMenuOpen && <MobileBurgerMenu />}</AnimatePresence>
        </div>
      </div>
      {/* --------- */}
      {/* For Desktop */}
      <aside
        className={`${!isMinimized ? "w-80" : "w-auto"} relative hidden h-full border-r-2 border-gray-100 bg-[#fdf9f7] transition-all duration-500 md:block`}
      >
        <Logo />
        <ChevronLeft
          className={`text-foreground absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-white text-3xl transition-transform duration-500 ${isMinimized && "rotate-180"}`}
          onClick={handleToggle}
        />
        <Navigation isMinimized={isMinimized} />
      </aside>
    </div>
  );
}

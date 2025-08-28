import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userstore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer } from "@mui/material";

function Header() {
  const { isDark, setIsDark } = useUserStore();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const menuItems = [
    { name: "Asosiy", path: "/" },
    { name: "Kurslar", path: "/course" },
    { name: "Biz haqimizda", path: "/my" },
    { name: "Bog'lanish", path: "/boglanish" },
  ];

  const logoSrc = isDark ? "/img/logo.svg" : "/img/logo-dark.svg";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors backdrop-blur-md shadow-md ${
        isDark ? "!bg-[#0B1222]/90" : "bg-white/90"
      }`}
    >
      <div className="max-w-[1200px] ml-[6%] md:ml-[7.5%] lg:ml-[9.12%] h-[86px] flex justify-between items-center px-4 md:px-10">
        {/* Logo */}
        <Link to="/" className="gap-2">
          <img src={logoSrc} alt="logo" className="h-[50px] w-[120px]" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-[18px] z-50 relative mr-[280px]">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`transition-colors pb-1 ${
                    isActive
                      ? "text-blue-500 underline underline-offset-4 font-semibold"
                      : isDark
                      ? "text-white hover:text-blue-400"
                      : "text-black hover:text-blue-500"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`w-[38px] h-[40px] flex items-center justify-center rounded-full transition-shadow ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <img
              src={isDark ? "/img/moon.png" : "/img/sun.png"}
              alt="theme toggle"
              className="w-[24px] h-[24px] object-cover opacity-70"
            />
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2">
        
            <Link
              to="/login"
              className="bg-blue-600 text-white px-8 py-2.5 rounded-xl transition-transform "
            >
              Kirish
            </Link>
          </div>

          {/* Mobile Kirish Button */}
          <div className="md:hidden">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Kirish
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpenMenu(true)}>
            <MenuIcon className="text-blue-500" fontSize="large" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        PaperProps={{
          style: {
            backgroundColor: isDark
              ? "rgba(11, 18, 34, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            color: isDark ? "#fff" : "#000",
            backdropFilter: "blur(6px)",
          },
        }}
      >
        <div className="w-[250px] p-4 flex flex-col h-full">
          {/* Drawer Logo */}
          <div className="flex justify-between items-center mb-4">
            <Link to="/" onClick={() => setOpenMenu(false)}>
              <img src={logoSrc} alt="logo" className="h-[40px] w-auto" />
            </Link>
            <button onClick={() => setOpenMenu(false)}>
              <CloseIcon className="text-blue-500" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col gap-4 text-[18px]">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} onClick={() => setOpenMenu(false)}>
                  <Link
                    to={item.path}
                    className={`pb-1 ${
                      isActive
                        ? "text-blue-500 underline underline-offset-4 font-semibold"
                        : isDark
                        ? "text-white hover:text-blue-400"
                        : "text-black hover:text-blue-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Drawer>
    </header>
  );
}

export default Header;

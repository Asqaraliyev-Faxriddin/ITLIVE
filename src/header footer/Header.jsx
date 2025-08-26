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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md">
      <div className="max-w-[1200px] ml-34 h-[86px] flex justify-between items-center px-6 md:px-10">
        <div className="flex items-center gap-8 mr-[223px]">
          <Link to="/">
            <img
              src={isDark ? "./img/logo.svg" : "./img/logo-dark.svg"}
              alt="logo"
              className="h-[50px] w-[120px]"
            />
          </Link>

          <ul className={`hidden md:flex gap-6 text-[18px] ${isDark ? "text-white" : "text-black"}`}>
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`transition-transform cursor-pointer ${
                  location.pathname === item.path ? "font-bold" : ""
                }`}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              document.body.style.backgroundColor = isDark ? "#ffffff" : "#0B1222";
              setIsDark(!isDark);
            }}
            className="w-[38px] h-[40px] flex items-center justify-center rounded-full bg-gray-300 hover:shadow-md transition"
          >
            <img
              src={isDark ? "/img/moon.png" : "/img/sun.png"}
              alt="theme toggle"
              className="w-[24px] h-[24px] object-cover opacity-70"
            />
          </button>

          <Link
            to="#"
            className={`hidden md:block px-8 py-2.5 rounded-xl transition-transform hover:-translate-y-0.5 ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Examify
          </Link>
          <Link
            to="/register"
            className="hidden md:block bg-blue-600 text-white px-8 py-2.5 rounded-xl transition-transform hover:-translate-y-0.5"
          >
            Kirish
          </Link>

          <button className="md:hidden" onClick={() => setOpenMenu(true)}>
            <MenuIcon className={isDark ? "text-white" : "text-black"} fontSize="large" />
          </button>
        </div>
      </div>

      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <div className="w-[250px] p-4 flex flex-col h-full">
          <div className="flex justify-between items-center">
            <Link to="/" onClick={() => setOpenMenu(false)}>
              <img
                src={isDark ? "./img/logo.svg" : "./img/logo-dark.svg"}
                alt="logo"
                className="h-[40px] w-auto"
              />
            </Link>
            <button onClick={() => setOpenMenu(false)}>
              <CloseIcon />
            </button>
          </div>

          <ul className="flex flex-col gap-4 mt-6 text-[18px]">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => setOpenMenu(false)}
                className={`cursor-pointer ${location.pathname === item.path ? "font-bold" : ""}`}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mt-auto mb-4">
            <Link
              to="#"
              className={`px-6 py-3 rounded-xl text-center ${
                isDark ? "bg-white text-black" : "bg-black text-white"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              Examify
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-center"
              onClick={() => setOpenMenu(false)}
            >
              Kirish
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
}

export default Header;

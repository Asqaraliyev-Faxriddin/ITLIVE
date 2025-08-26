import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/userstore";
import "./header.css"

function Header() {
  const {isDark,setIsDark} = useUserStore()




  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md" >
      <div className=" rounded-1xl w-full h-[86px] shadow-md flex justify-around items-center px-10">
        
        <div className="flex gap-10 items-center justify-center">
          <img src={isDark ? "/img/logo.svg" : "/img/logo-dark.svg"} alt="logo" className="h-[50px] w-[124px]" />
          

          <div>
          <ul   className={`${isDark ? "text-white flex gap-6 text-[18px]" : "text-black  flex gap-6 text-[18px]"}`}>
          <li
              className={`transition-transform cursor-pointer ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link to="/">Asosiy</Link>
            </li>


             <li
              className={`transition-transform cursor-pointer ${
                location.pathname === "/course" ? "active" : ""
              }`}
            >
              <Link to="/course">Kurslar</Link>
            </li>


            <li
              className={`transition-transform cursor-pointer ${
                location.pathname === "/my" ? "active" : ""
              }`}
            >
              <Link to="/my">Biz haqimizda</Link>
            </li>
            <li
              className={`transition-transform cursor-pointer ${
                location.pathname === "/bohlanish" ? "active" : ""
              }`}
            >
              <Link to="/boglanish">Bog'lanish</Link>
            </li>
           
          </ul>
        </div>
        </div>

        

        <div className="flex items-center gap-4">
          <div onClick={()=>{
            if (isDark) {
                document.body.style.backgroundColor = "#ffffff";
               
              } else {
            
                document.body.style.backgroundColor = "#0B1222";
              }
              setIsDark(!isDark);
        
          }} className=" w-[38px] bg-gray-300 hover:shadow-md hover:cursor-pointer h-[40px] flex items-center justify-center rounded-full">
            <img className="object-cover opacity-70 w-[24px] h-[24px]"
             src={isDark ? "/img/moon.png" : "/img/sun.png"}
              alt="theme toggle"
            />
          </div>

          <a  href="#" id="orqa"className={`px-9 py-3 rounded-xl hover:translate-y-[2px] transition-transform 
              ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
          >   Examify </a>
          <a href="/register"  className="bg-blue-600 text-white px-9 py-3 rounded-xl hover:translate-y-[2px] transition-transform"
          >
            Kirish
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

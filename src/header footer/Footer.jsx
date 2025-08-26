import React from "react";
import { useUserStore } from "../store/userstore";

function Footer() {
  const { isDark } = useUserStore();

  return (
    <footer className={`w-full ${isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}>
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center px-5 py-10 gap-6">
        <img 
          src={isDark ? "./img/logo.svg" : "./img/logo-dark.svg"} 
          alt="ITLive Logo" 
          className="h-10" 
        />
        
        <h2 className="text-2xl font-semibold">
          Biz bilan muvaffaqiyatga erishing
        </h2>
        
        <p className={`max-w-[600px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Barcha kurslarimiz tajribali mentorlar tomonidan tayyorlangan
        </p>

        <div className="flex gap-4 mt-3">
          <button 
            className={`px-5 py-2 border rounded-md transition 
              ${isDark 
                ? "border-gray-500 hover:bg-gray-800" 
                : "border-gray-400 hover:bg-gray-100"}`}>
            Intro video
          </button>
          <button 
            className={`px-5 py-2 rounded-md transition 
              ${isDark 
                ? "bg-blue-500 hover:bg-blue-600 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
            Bog‘lanish
          </button>
        </div>
      </div>

      <div className={`border-t mt-10 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center px-5 py-4 text-sm gap-2">
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            © ITLIVE 2024. Barcha huquqlar himoyalangan
          </p>
          <a 
            href="#" 
            className={`transition ${isDark ? "hover:text-blue-400" : "hover:text-blue-600"}`}>
            Xavfsizlik
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

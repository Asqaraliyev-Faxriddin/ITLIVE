import React, { useState } from "react";
import { useUserStore } from "../store/userstore";

function Footer() {
  const { isDark } = useUserStore();
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => setShowVideo(prev => !prev);

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
            onClick={toggleVideo}
            className={`px-5 py-2 border rounded-md transition 
              ${isDark 
                ? "border-gray-500 hover:bg-gray-800" 
                : "border-gray-400 hover:bg-gray-100"}`}
          >
            {showVideo ? "Orqaga" : "Intro video"}
          </button>

          <a href="/boglanish" className={`px-5 py-2 rounded-md transition 
              ${isDark 
                ? "bg-blue-500 hover:bg-blue-600 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
            Bog‘lanish
          </a>
        </div>

        {showVideo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="relative w-full max-w-3xl p-4 rounded-xl shadow-xl transform transition-transform duration-300 ">
         
              <button 
                onClick={toggleVideo}
                className="absolute bottom-103 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-700 transition"
              >
                X
              </button>

              <video 
                src="./video/kurslar.mp4" 
                controls 
                autoPlay 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </div>

      <div className={`border-t mt-10 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center px-5 py-4 text-sm gap-2">
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            © Faxriddin 2024. Barcha huquqlar himoyalangan
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

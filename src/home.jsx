import React, { useState } from 'react'
import Header from './header footer/Header'
import Footer from './header footer/Footer'
import { useUserStore } from './store/userstore'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./home.css"

function Home() {
  const { isDark, setIsDark } = useUserStore()
  const [active, setActive] = useState("Barcha kurslar");

  const reviews = [
    { text: "Zo‘r kurs ekan 👍", name: "Avazbek Joraboyev", img: "./img/user.png" },
    { text: "Juda ham zo‘r!", name: "Eldorbek Baxronov", img: "./img/user.png" },
    { text: "Zo‘r", name: "Tursunqulov Islom", img: "./img/user.png" },
    { text: "O‘qituvchilar juda zo‘r!", name: "Dilshod Karimov", img: "./img/user.png" },
    { text: "Kurs menga yoqdi", name: "Sevinch Abdullayeva", img: "./img/user.png" },
  ];

  const mentors = new Array(6).fill({
    name: "Safarov Oybek",
    text: "Mobile Dasturchi",
    img: "./img/oybek.png",
  });

  return (
    <>
      <Header/>

      <main className={`w-full mt-44 ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <div className="max-w-[1200px] mr-[160px] mx-auto flex flex-col md:flex-row items-center justify-between px-5 py-16 gap-10 -mt-[120px]">
          <div className="flex-1 space-y-5 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-snug">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Kelajak kasblarini
              </span>{" "}
              <span>{`biz bilan o‘rganing!`}</span>
            </h1>
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Dasturlashni arzon va sifatli o‘qib, o‘z karyerangizni quring.
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-4xl text-lg font-lg text-[15px] hover:bg-blue-400 transition">
              Kurslar bilan tanishish
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="./img/home.png" alt="Hero" className="max-w-[950px] w-full" />
          </div>
        </div>
      </main>

      {/* Ommabop kurslar */}
      <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <div className="max-w-[1200px] mr-[210px] mx-auto flex items-center">
          <div className="mx-auto">
            <p className="text-4xl font-bold text-center">Ommabop kurslar</p>
            <p className={`w-[920px] mt-4 mr-[130px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Kasbga yo'naltirilgan amaliy mashg'ulotlar yordamida tez va samarali ravishda mutaxassislar safiga qo'shiling. Har bir mashg'ulot sohaning yetakchi mutaxassislari tomonidan eng zamonaviy o'quv dasturi asosida tayyorlangan.
            </p>
          </div>
        </div>

        {/* Filter tugmalari */}
        <section>
          <div className="max-w-[1200px] mr-[134px] mt-[45px] mx-auto flex items-center gap-6">
            {["Barcha kurslar","Backend","Frontend","Foundation","Mobil","IT Matematika","Buxgalteriya"].map((btn)=>(
              <button 
                key={btn}
                onClick={()=>setActive(btn)}
                className={`border border-blue-600 py-2 px-5 rounded-[9px] text-[14px] transition ${
                  active===btn 
                  ? "text-white bg-blue-500 font-semibold"
                  : `${isDark ? "text-blue-300 hover:bg-gray-800" : "text-blue-500 hover:bg-blue-50"}`
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </section>
      </section>

      {/* Kurs kartalari */}
      <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <div className="max-w-[1200px] mr-[134px] mt-[45px] mx-auto flex items-center gap-6">
          {/* PHP Laravel */}
          <div className="shadow-md rounded-[8px] p-5">
            <img src="./img/php.png" alt="" className="rounded-[4px] mb-3"/>
            <span className="flex gap-4 mb-2"><img src="./img/user.png" alt=""/> Ergashev Abdulla </span>
            <h1 className="text-[26px] font-bold">PHP LARAVEL</h1>
            <p className={`mt-1 text-[18px] ${isDark?"text-gray-300":"text-gray-500"}`}>
              Chegirma: <span className="font-bold ml-[223px] text-[20px]">60%</span>
            </p>
            <p className={`mt-1 mb-2 ${isDark?"text-gray-300":"text-gray-500"}`}>Kurs narxi:</p>
            <span className="opacity-90">
              <span className="line-through">997500 uzs</span>
              <span className="font-bold ml-[160px] text-[20px]">399000 uzs</span>
            </span>
          </div>

          {/* Foundation */}
          <div className="shadow-md rounded-[8px] p-5">
            <img src="./img/python.png" alt="" className="rounded-[4px] mb-3"/>
            <span className="flex gap-4 mb-2"><img src="./img/user.png" alt=""/> Ergashev Abdulla </span>
            <h1 className="text-[26px] font-bold">FOUNDATION</h1>
            <p className={`mt-1 text-[18px] ${isDark?"text-gray-300":"text-gray-500"}`}>
              Chegirma: <span className="font-bold ml-[223px] text-[20px]">60%</span>
            </p>
            <p className={`mt-1 mb-2 ${isDark?"text-gray-300":"text-gray-500"}`}>Kurs narxi:</p>
            <span className="opacity-90">
              <span className="line-through">747500 uzs</span>
              <span className="font-bold ml-[160px] text-[20px]">299000 uzs</span>
            </span>
          </div>
        </div>

        <button className="ml-[733px] mt-4 px-9 py-[9px] bg-blue-600 text-white rounded-4xl text-[15px] hover:bg-blue-400 transition">
          Ko'proq ko'rish
        </button>
      </section>

      {/* Tajribali mentorlar */}
      <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} mt-12`}>
        <h1 className="font-bold text-4xl text-center mb-4">Tajribali Mentorlar</h1>
        <p className={`text-center text-[20px] ${isDark?"text-gray-300":"text-gray-600"}`}>
          Barcha kurslarimiz tajribali mentorlar tomonidan tayyorlangan
        </p>

        <div className="max-w-[1200px] mx-auto text-center">
          <Swiper slidesPerView={3} spaceBetween={20} pagination={{clickable:true}} modules={[Pagination]} className="mySwiper">
            {mentors.map((m,i)=>(
              <SwiperSlide key={i}>
                <div className="group relative rounded-xl h-[470px] w-[390px] flex flex-col justify-end mt-10 overflow-hidden">
                  <img src={m.img} alt={m.name} className="rounded-2xl w-full h-full object-cover group-hover:scale-105 transition-all duration-900"/>
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 rounded-b-2xl opacity-0 translate-y-4 transition-all duration-900 group-hover:opacity-100 group-hover:translate-y-0">
                    <h3 className="font-bold text-lg">{m.name}</h3>
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Izohlar */}
      <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-12`}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Izohlar</h2>
          <p className={`${isDark?"text-gray-300":"text-gray-600"} mb-10`}>
            O'quvchilarimiz tomonidan qoldirilgan izohlar
          </p>

          <Swiper slidesPerView={3} spaceBetween={20} pagination={{clickable:true}} modules={[Pagination]} className="mySwiper">
            {reviews.map((r,i)=>(
              <SwiperSlide key={i}>
                <div className={`shadow-md rounded-xl p-6 text-left h-[230px] flex flex-col justify-between ${isDark?"bg-gray-800 text-white":"bg-white text-black"}`}>
                  <span><img src="./img/quote.png" alt="quote" className="w-13 h-12"/></span>
                  <p className="font-medium mb-4">{r.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full"/>
                    <div>
                      <h4 className="font-semibold">{r.name}</h4>
                      <p className="text-[14px] mt-2 mb-2">⭐ ⭐ ⭐ ⭐ ⭐ 4 oy oldin</p>
                      <p className="text-sm">HTML CSS kursi o‘quvchisi</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Footer/>
    </>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import Header from './header footer/Header'
import Footer from './header footer/Footer'
import { useUserStore } from './store/userstore'
import { Swiper, SwiperSlide } from 'swiper/react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Certificates from './header footer/sertificat';

function My() {
  const { isDark } = useUserStore();
  const {mentors, setMentors} = useUserStore()
  const [loading, setLoading] = useState(false);

  const images = [
    "./img/img5.avif",
    "./img/img2.png",
    "./img/ormon.webp",
    "./img/img12.jpg",
  ];


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const loginRes = await axios.post("https://faxriddin.bobur-dev.uz/auth/login", {
          phone: "+998903641207",
          password: "11201111",
        });

        if (loginRes.status === 201 || loginRes.status === 200) {
          const token = loginRes.data?.AccessToken;
          if (!token) {
            alert("Token topilmadi!"); 
            return;
          }

          const res2 = await axios.get(
            "https://faxriddin.bobur-dev.uz/api/users/mentors",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }

            
          );

          if (res2.data && res2.data.length > 0) {
            const mappedMentors = res2.data.map((mentor) => ({
                name: mentor.fullName,
                text: `${mentor.mentorProfile.job} ustoz`,
                img: mentor.image
                  ? `https://faxriddin.bobur-dev.uz/profile/url/${mentor.image}`
                  : "./img/oybek.png"
              }));
              

  
              setMentors(mappedMentors); 
          }
        } else {
          alert("Login muvaffaqiyatsiz!");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);


  return (
    <>    
      {loading ? (
    <Box className="w-full h-screen flex justify-center items-center bg-white">
      <CircularProgress />
    </Box>
  ) : (

    <>
    <Header/>
      

      <section 
        className={`${isDark ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" : "bg-gradient-to-b from-white to-gray-100 text-black"} py-20 mt-16`}
      >
        <div className="max-w-[1200px] mx-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Biz haqimizda</h1>


          <p className="text-lg leading-relaxed opacity-90">
            Faxriddin Academy - 08.09.2024 yil tashkil etilgan va hozirgacha faoliyat olib kelmoqda. 
            Faxriddin Academy kompaniyasining asosiy faoliyat turi ikkiga bo'linadi:
            Kelajak kasblariga o'qitish va IT sohasida xizmatlarini yetkazib berishdan iborat.
            Bizning akademiyamiz axborot texnologiyalarining barcha tendensiyalari bilan yaqindan tanishtiradi.
            Shinam o‘quv binosi va zamonaviy texnologiyalarga asoslangan kurslar dasturi bilan yurtimizning eng yirik,
            xalqaro kompaniyalarida IT karyerangizni boshlaysiz.
          </p>
        </div>
      </section>


      <Certificates/>


      <section 
        className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-20`}
      >
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center">Media galereya</h1>

          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            speed={1800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="rounded-xl overflow-hidden shadow-xl"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`overflow-hidden rounded-xl transition-transform duration-500 hover:scale-[1.02] ${isDark ? "bg-gray-800" : "bg-white"}`}
                >
                  <img
                    src={img}
                    alt={`gallery-${index}`}
                    className="w-full h-[250px] md:h-[450px] object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


      <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-12`}>
            <h1 className="font-bold text-3xl md:text-4xl text-center mb-4">Tajribali Mentorlar</h1>
            <p className={`text-center text-[18px] md:text-[20px] ${isDark?"text-gray-300":"text-gray-600"}`}>
              Barcha kurslarimiz tajribali mentorlar tomonidan tayyorlangan
            </p>

            <div className="max-w-[1200px] mx-auto text-center px-4">
  <Swiper
    slidesPerView={mentors.length < 3 ? mentors.length : 3} // dinamik
    breakpoints={{
      320: { slidesPerView: Math.min(mentors.length, 1), spaceBetween: 10 },
      640: { slidesPerView: Math.min(mentors.length, 2), spaceBetween: 15 },
      1024: { slidesPerView: Math.min(mentors.length, 3), spaceBetween: 20 },
    }}
    pagination={{ clickable: true }}
    modules={[Pagination]}
    className="mySwiper mt-8"
  >
    {mentors.map((m,i)=>(
      <SwiperSlide key={i}>
        <div className="group relative rounded-xl h-[420px] flex flex-col justify-end mt-6 overflow-hidden">
          <img src={m.img} alt={m.name} className="rounded-2xl w-full h-full object-cover group-hover:scale-105 transition-all duration-700"/>
          <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 rounded-b-2xl opacity-0 translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
            <h3 className="font-bold text-lg">{m.name}</h3>
            <p className="text-sm">{m.text}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

          </section>


      <Footer/>
    
    </>

)}


    </>
  );
}

export default My;

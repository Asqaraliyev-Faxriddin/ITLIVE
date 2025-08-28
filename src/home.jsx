  import React, { useEffect, useState } from 'react'
  import Header from './header footer/Header'
  import Footer from './header footer/Footer'
  import { useUserStore } from './store/userstore'
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Pagination } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  import "./home.css"
  import Rating from '@mui/material/Rating';
  import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CourseAll from './header footer/course';


  function Home() {
    const { isDark } = useUserStore()
    const [active, setActive] = useState("Barcha kurslar");
    const {mentors, setMentors} = useUserStore()
    const {courses, setCourses} = useUserStore()
    const {token2, setToken} = useUserStore()
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true); 
          const loginRes = await axios.post("http://13.49.74.5:3000/auth/login", {
            phone: "+998903641207",
            password: "11201111",
          });
        
          
          if (loginRes.status === 200 || loginRes.status === 201) {
            const token = loginRes.data?.AccessToken;
            if (!token) return alert("Token topilmadi!");
    
       
            const coursesRes = await axios.get("http://13.49.74.5:3000/course/all", {
              headers: { Authorization: `Bearer ${token}` },
            });

            console.log("shh",coursesRes);
            

            if (coursesRes.data) {
              const mappedCourses = coursesRes.data.data.map(course => ({
                id: course.id,
                title: course.name || "No title",
                teacher: course.mentor.fullName || "No teacher",
                discount: course.discount || 0,
                price: course.price || 0,
                teacher_image: course.mentor.image
                ? `http://13.49.74.5:3000/profile/url/${course.mentor.image}`
                : "./img/user.png",
                image: course.banner
                  ? `http://13.49.74.5:3000/banner/url/${course.banner}`
                  : "./img/php.png",
              }));
              setCourses(mappedCourses);
            }
    
          
          } else {
            alert("Login muvaffaqiyatsiz!");
          }
        } catch (err) {
          console.error(err);
        }

        finally {
          setLoading(false); 
        }
      };
    
      fetchData();
    }, []);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const loginRes = await axios.post("http://13.49.74.5:3000/auth/login", {
            phone: "+998903641207",
            password: "11201111",
          });
    
          if (loginRes.status === 200 || loginRes.status === 201) {
            const token = loginRes.data?.AccessToken;
            setToken(token)
            if (!token) return alert("Token topilmadi!");
    
            const res2 = await axios.get("http://13.49.74.5:3000/api/users/mentors", {
              headers: { Authorization: `Bearer ${token}` },
            });
    
            if (res2.data && res2.data.length > 0) {
              const mentorData = res2.data.map((mentor) => ({
                name: mentor.fullName,
                text: `${mentor.mentorProfile.job} ustoz`,
                img: mentor.image
                  ? `http://13.49.74.5:3000/profile/url/${mentor.image}`
                  : "./img/oybek.png",
              }));
    
              setMentors(mentorData);
            }
          } else {
            alert("Login muvaffaqiyatsiz!");
          }
        } catch (err) {
          console.error(err);
        }
      };
    
      fetchData();
    }, []);
    
    const reviews = [
      { text: "Zo‘r kurs ekan 👍", name: "Avazbek Joraboyev", img: "./img/user.png" },
      { text: "Juda ham zo‘r!", name: "Eldorbek Baxronov", img: "./img/user.png" },
      { text: "Zo‘r", name: "Tursunqulov Islom", img: "./img/user.png" },
      { text: "O‘qituvchilar juda zo‘r!", name: "Dilshod Karimov", img: "./img/user.png" },
      { text: "Kurs menga yoqdi", name: "Sevinch Abdullayeva", img: "./img/user.png" },
    ];



    useEffect(() => {
      const fetchData = async () => {
        try {
          const loginRes = await axios.post("http://13.49.74.5:3000/auth/login", {
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
              "http://13.49.74.5:3000/api/users/mentors",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }

              
            );

            if (res2.data && res2.data.length > 0) {
              const [mentorData] = res2.data.map((mentor) => ({
                name: mentor.fullName,
                text: `${mentor.mentorProfile.job} ustoz`,
                img: mentor.image
                ? `http://13.49.74.5:3000/profile/url/${mentor.image}`: "./img/oybek.png"
              }));

              

    

              mentors.push(mentorData);
              console.log("Mentorlar:", mentors);
            }
          } else {
            alert("Login muvaffaqiyatsiz!");
          }
        } catch (err) {
          console.error(err);
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

          <main className={`w-full pt-14 ${isDark ? "bg-gray-900 text-white" : "bg-white  text-black"}`}  >
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-16 gap-10">
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
                <img src="./img/home.png" alt="Hero" className="max-w-full md:max-w-[500px]" />
              </div>
            </div>
          </main>

          <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10`}>
            <div className="max-w-[1200px] mx-auto text-center px-4">
              <p className="text-3xl md:text-4xl font-bold">Ommabop kurslar</p>
              <p className={`mt-4 max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Kasbga yo'naltirilgan amaliy mashg'ulotlar yordamida tez va samarali ravishda mutaxassislar safiga qo'shiling. Har bir mashg'ulot sohaning yetakchi mutaxassislari tomonidan eng zamonaviy o'quv dasturi asosida tayyorlangan.
              </p>
            </div>

            <div className="max-w-[1200px] ml-auto iteams-center mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4">
              {["Barcha kurslar","Backend","Frontend","Foundation","Mobil","SMM PRO","Buxgalteriya"].map((btn)=>(
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

      <CourseAll/>

    <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 px-4`}>
  <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Bizga qo'shiling</h2>
    <p className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} mb-5 mt-5`}>
      Bizning safimizga nafaqat o‘rganuvchi balki yetarlicha tajribangiz bo‘lsa mentor sifatida ham qo‘shilishingiz mumkin.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-3 mt-6">
  <div className={`p-6 rounded-lg shadow hover:shadow-lg transition ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}
  >
    <h3 className="text-2xl font-semibold mb-2">O'quvchimisiz?</h3>
    <p className="mb-5 mt-5">
      Agarda o‘quvchi bo‘lsangiz bizning xalqaro darajadagi tajribali mentorlarimizga shogird bo‘ling
    </p>
    <a 
      href="/register" 
      className="bg-blue-500 text-white px-7 py-2 rounded-lg hover:bg-blue-600 transition inline-block"
    >
      Boshlash
    </a>
  </div>

  <div className={`p-6 rounded-lg shadow hover:shadow-lg transition ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}
  >
    <h3 className="text-2xl font-semibold mb-2">Mentormisiz?</h3>
    <p className="mb-5 mt-5">
      Bizning mualliflar jamoamizga qo‘shilib, o‘z tajribangizni boshqalar bilan oson va qulay platforma orqali ulashing
    </p>
    <a 
      href="https://t.me/Asqaraliyev_Faxriddin" 
      className="bg-blue-500 text-white px-7 py-2 rounded-lg hover:bg-blue-600 transition inline-block"
    >
      Boshlash
    </a>
  </div>
</div>



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

          <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-12`}>
            <div className="max-w-[1200px] mx-auto text-center px-4">
              <h2 className="text-3xl font-bold mb-2">Izohlar</h2>
              <p className={`${isDark?"text-gray-300":"text-gray-600"} mb-10`}>
                O'quvchilarimiz tomonidan qoldirilgan izohlar
              </p>

              <Swiper
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 2, spaceBetween: 15 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                }}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {reviews.map((r,i)=>(
                  <SwiperSlide key={i}>
                    <div className={`shadow-md rounded-xl p-6 text-left h-[230px] flex flex-col justify-between ${isDark?"bg-gray-800 text-white":"bg-white text-black"}`}>
                      <span><img src="./img/quote.png" alt="quote" className="w-12 h-12"/></span>
                      <p className="font-medium mb-4">{r.text}</p>
                      <div className="flex items-center gap-3">
                        <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full"/>
                        <div>
      <h4 className="font-semibold">{r.name}</h4>
      <div className="flex items-center gap-2 mt-2 mb-2">
        <Rating value={5} readOnly size="small" /> 
        <span className="text-sm text-gray-500">4 oy oldin</span>
      </div>
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

        )}


      </>
    )
  }

  export default Home

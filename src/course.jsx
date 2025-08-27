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
import CourseAll from './header footer/course';
function Course() {
  const { isDark } = useUserStore()
  const [active, setActive] = useState("Barcha kurslar");
  const {mentors, setMentors} = useUserStore()
  const {courses, setCourses} = useUserStore()


  let navigate = useNavigate()


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
        const loginRes = await axios.post("http://51.20.98.175:3000/auth/login", {
          phone: "+998903641207",
          password: "12345678",
        });

        if (loginRes.status === 201 || loginRes.status === 200) {
          const token = loginRes.data?.AccessToken;
          if (!token) {
            alert("Token topilmadi!"); 
            return;
          }
        
          const res2 = await axios.get(
            "http://51.20.98.175:3000/api/users/mentors",
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
              ? `http://51.20.98.175:3000/profile/url/${mentor.image}`
              : "./img/oybek.png"
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
      <Header/>
      
        {/* <main className={`w-full pt-14 ${isDark ? "bg-gray-900 text-white" : "bg-white  text-black"}`}  >
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
            
            </div>
            <div className="flex-1 flex justify-center">
              <img src="./img/home.png" alt="Hero" className="max-w-full md:max-w-[500px]" />
            </div>
          </div>
        </main> */}

        <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 pt-34`}>

<div className='max-w-[1200px] mx-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4'>
<h1 className='text-5xl font-bold'>Kurslar</h1>

</div>

          <div className="max-w-[1200px] mx-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4">
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

        {/* <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 px-4`}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
  <div key={course.id} className={`rounded-[8px] p-5 transition ${
    isDark 
      ? "bg-gray-800 text-white shadow-none" 
      : "bg-white text-black shadow-md"
  }`} >
    <img
      src={course.image}
      alt={course.title}
      className="rounded-[4px] mb-3 w-full h-[200px] object-cover"
    />
    <span className="flex gap-4 mb-2">
      <img src="./img/user.png" alt="" />
      {course.teacher}
    </span>
    <h1 className="text-[22px] md:text-[26px] font-bold">{course.title}</h1>
    <p className={`mt-1 text-[18px] ${isDark ? "text-gray-300" : "text-gray-500"}`}>
      Chegirma: <span className="font-bold float-right text-[20px]">{course.discount}%</span>
    </p>
    <p className={`mt-1 mb-2 ${isDark ? "text-gray-300" : "text-gray-500"}`}>Kurs narxi:</p>
    <span className="opacity-90 flex justify-between">
      <span className="line-through">
        {course.discount
          ? Math.round(course.price / (1 - course.discount / 100))
          : course.price} uzs
      </span>
      <span className="font-bold text-[20px]">{course.price} uzs</span>
    </span>
  </div>
))}

      </div>

      <div className="flex justify-center mt-6">
        <button className="px-9 py-[9px] bg-blue-600 text-white rounded-4xl text-[15px] hover:bg-blue-400 transition">
          Ko'proq ko'rish
        </button>
      </div>
    </section> */}

    <CourseAll/>

      


      <Footer/>

    </>
  )
}

export default Course

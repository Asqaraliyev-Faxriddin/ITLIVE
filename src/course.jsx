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
            const [mentorData] = res2.data.map((mentor) => ({
              name: mentor.fullName,
              text: `${mentor.mentorProfile.job} ustoz`,
              img: mentor.image ? `https://faxriddin.bobur-dev.uz/profile/url/${mentor.image}`  : "./img/oybek.png"
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
      
   

        <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 pt-34`}>

<div className='max-w-[1200px] mx-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4'>
<h1 className='text-5xl font-bold'>Kurslar</h1>

</div>

        
        </section>




        <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 px-4`}>
      <CourseAll/>


    </section>

      


      <Footer/>

    </>



  
  )
}

export default Course

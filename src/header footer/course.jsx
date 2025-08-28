import React, { useEffect, useState } from 'react';
import { useUserStore } from '../store/userstore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CourseAll() {
  const { isDark, courses, setCourses, setToken } = useUserStore();
  const [active, setActive] = useState("Barcha kurslar");
  const [categories, setCategories] = useState([]); // Dinamik category lar
  const [loading, setLoading] = useState(false);
  const [token, setLocalToken] = useState(null);

  const navigate = useNavigate();

  // Login va token olish
  useEffect(() => {
    const login = async () => {
      try {
        const loginRes = await axios.post("https://faxriddin.bobur-dev.uz/auth/login", {
          phone: "+998903641207",
          password: "11201111",
        });
        if (loginRes.status === 200 || loginRes.status === 201) {
          const tk = loginRes.data?.AccessToken;
          if (!tk) return alert("Token topilmadi!");
          setToken(tk);
          setLocalToken(tk);
        } else {
          alert("Login muvaffaqiyatsiz!");
        }
      } catch (err) {
        console.error(err);
      }
    };
    login();
  }, [setToken]);

  // Kategoriyalarni olish
  useEffect(() => {
    if (!token) return;
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://faxriddin.bobur-dev.uz/course-category/all?offset=1&limit=20", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
          setCategories(res.data); 
          console.log(res.data);
          
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [token]);

  // Kurslarni olish (filter bilan)
  const fetchCourses = async (categoryId = null) => {
    if (!token) return;
    try {
      setLoading(true);
      const params = { offset: 1, limit: 10 };
      if (categoryId) params.category_id = categoryId;

      const res = await axios.get("https://faxriddin.bobur-dev.uz/course/all", {
        headers: { Authorization: `Bearer ${token}` },
        params
      });

      if (res.data && res.data.data) {
        console.log(res.data.data);
        
        const mapped = res.data.data.map(course => ({
          id: course.id,
          title: course.name || "No title",
          teacher: course.mentor?.fullName || "No teacher",
          discount: course.discount || 0,
          price: course.price || 0,
          teacher_image: course.mentor?.image ? `https://faxriddin.bobur-dev.uz/profile/url/${course.mentor.image}`  : "./img/user.png",
          image: course.banner
            ? `https://faxriddin.bobur-dev.uz/banner/url/${course.banner}`
            : "./img/php.png",
        }));
        setCourses(mapped);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (token) fetchCourses();
  }, [token]);

  const handleCategoryClick = (name, id) => {
    setActive(name);
    if (name === "Barcha kurslar") {
      fetchCourses(); 
    } else {
        console.log(id);
        
      fetchCourses(id); 
    }
  };

  return (
    <>
      {loading ? (
        <Box className="w-full h-screen flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : (
        <>
        
          <div
            className={`max-w-[1200px] mx-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            <button
              key="all"
              onClick={() => handleCategoryClick("Barcha kurslar", null)}
              className={`border py-2 px-5 rounded-[9px] text-[14px] transition-colors duration-300 ${
                active === "Barcha kurslar"
                  ? "text-white bg-blue-600 border-blue-600 font-semibold"
                  : `${
                      isDark
                        ? "text-gray-200 border-gray-500 hover:bg-gray-700"
                        : "text-blue-500 border-blue-500 hover:bg-blue-50"
                    }`
              }`}
            >
              Barcha kurslar
            </button>
  
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name, cat.id)}
                className={`border py-2 px-5 rounded-[9px] text-[14px] transition-colors duration-300 ${
                  active === cat.name
                    ? "text-white bg-blue-600 border-blue-600 font-semibold"
                    : `${
                        isDark
                          ? "text-gray-200 border-gray-500 hover:bg-gray-700"
                          : "text-blue-500 border-blue-500 hover:bg-blue-50"
                      }`
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
  
          {/* COURSES LIST */}
          <section
            className={`${
              isDark ? "bg-gray-900 text-white" : "bg-white text-black"
            } py-10 px-4`}
          >
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`rounded-[8px] p-5 transition ${
                    isDark
                      ? "bg-gray-800 text-white shadow-none border border-gray-700"
                      : "bg-white text-black shadow-md border border-gray-200"
                  }`}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="rounded-[4px] mb-3 w-full h-[200px] object-cover"
                  />
                  <span className="flex gap-4 mb-2 items-center">
                    <img
                      src={course.teacher_image}
                      alt={course.teacher}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{course.teacher}</span>
                  </span>
                  <h1 className="text-[22px] md:text-[26px] font-bold">
                    {course.title}
                  </h1>
                  <p
                    className={`mt-1 text-[18px] ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Chegirma:{" "}
                    <span className="font-bold float-right text-[20px]">
                      {course.discount}%
                    </span>
                  </p>
                  <p
                    className={`mt-1 mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Kurs narxi:
                  </p>
                  <span className="opacity-90 flex justify-between">
                    <span className="line-through">
                      {course.discount
                        ? Math.round(course.price / (1 - course.discount / 100))
                        : course.price}{" "}
                      uzs
                    </span>
                    <span className="font-bold text-[20px]">
                      {course.price} uzs
                    </span>
                  </span>
                </div>
              ))}
            </div>
  
            {/* LOAD MORE BUTTON */}
            <div className="flex justify-center mt-6">
              <button
                className={`px-9 py-[9px] rounded-4xl text-[15px] transition ${
                  isDark
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-600 text-white hover:bg-blue-400"
                }`}
              >
                Ko'proq ko'rish
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
  
}

export default CourseAll;

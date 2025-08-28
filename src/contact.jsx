    import React, { useState } from "react";
    import { useUserStore } from "./store/userstore";
    import { Phone, Mail, MapPin } from "lucide-react";
    import axios from "axios"
import Header from "./header footer/Header";
import Footer from "./header footer/Footer";

    export default function Contact() {
    const [loading, setLoading] = useState(false);
    
    const [status, setStatus] = useState(null);
    const { isDark } = useUserStore();


    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setStatus(null);
    
      try {
        console.log({
          fullName: e.target.fullname.value,
          phone: e.target.phone.value,
          message: e.target.message.value,
        });
    
        const res = await axios.post(
          "https://faxriddin.bobur-dev.uz/api/contact",
          {
            fullName: e.target.fullname.value,
            phone: e.target.phone.value,
            message: e.target.message.value,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
    
        if (res.status === 201) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error(err.response?.data || err);
        setStatus("error");
      } finally {
        setTimeout(() => {
          setLoading(false);
          setStatus(null);
        }, 1000);
      }
    };
    

    return (
  

        <>
        
                
        {loading ? (
      <Box className="w-full h-screen flex justify-center items-center bg-white">
        <CircularProgress />
      </Box>
    ) : (


        <>
       
       
       <Header/>

       <div  className={`min-h-screen pt-26 p-6 transition-colors duration-300 ${  isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>

<div className='max-w-[1200px] ml-[14%]  mr-[17%] mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4'>
<h1 className='text-3xl font-bold mb-12 lg:text-[26px]'>
Savollaringiz bo‘lsa murojaat qiling
</h1>
</div>


    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div
        className={`flex flex-col items-center p-6 rounded-xl shadow ${
            isDark ? "bg-gray-800" : "bg-white"
        }`}
        >
        <Phone size={36} className="text-blue-500 mb-3" />
        <h3 className="font-semibold">Telefon</h3>
        <p className="text-sm text-gray-500 mt-1">+998 (97) 866 50 50</p>
        </div>

        <div
        className={`flex flex-col items-center p-6 rounded-xl shadow ${
            isDark ? "bg-gray-800" : "bg-white"
        }`}
        >
        <Mail size={36} className="text-blue-500 mb-3" />
        <h3 className="font-semibold">Elektron Pochta</h3>
        <p className="text-sm text-gray-500 mt-1">
            itliveguliston2023@gmail.com
        </p>
        </div>

        <div
        className={`flex flex-col items-center p-6 rounded-xl shadow ${
            isDark ? "bg-gray-800" : "bg-white"
        }`}
        >
        <MapPin size={36} className="text-blue-500 mb-3" />
        <h3 className="font-semibold">Manzil</h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
            Sirdaryo vil., Guliston sh., 1-mavze, IT LIVE ACADEMY
        </p>
        </div>
    </div>

    {/* Forma */}
    <div
        className={`shadow-lg rounded-2xl p-8 w-full max-w-lg mx-auto ${
        isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
    >
        <h3 className="text-xl font-bold mb-6 text-center">
        Murojaatlarni shu yerdan jo‘nating!
        </h3>

        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-1">To‘liq ismingiz</label>
            <input
            type="text"
            name="fullname"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isDark
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="F.I.Sh"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-1">Telefon</label>
            <input
            type="tel"
            name="phone"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isDark
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="+998"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-1">Xabar</label>
            <textarea
            name="message"
            rows="4"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isDark
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Matn"
            ></textarea>
        </div>

        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
            Yuborish
        </button>
        </form>
    </div>

    {/* Spinner va xabar */}
    {loading && (
<div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
{!status ? (
<div className="relative flex items-center justify-center">
    {/* Tashqi yumshoq gradient aylana */}
    <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"></div>
    {/* Ichki puls effekt */}
    <div className="absolute w-8 h-8 rounded-full bg-blue-400/30 animate-ping"></div>
</div>
) : (
<span
    className={`text-lg font-bold flex items-center gap-2 ${
    status === "success" ? "text-green-600" : "text-red-600"
    }`}
>
    {status === "success" ? (
    <>
        ✅ <span>Jo‘natildi</span>
    </>
    ) : (
    <>
        ❌ <span>Jo‘natilmadi</span>
    </>
    )}
</span>
)}

</div>
)}

    </div>
       
       <Footer/>
       
       </>


)}
        
        </>

    );
    }



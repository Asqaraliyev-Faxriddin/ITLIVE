import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userstore";


function Code() {
  let [code, setCode] = useState("");
  const {pass,setPass} = useUserStore()
  const {phone,setPhone} = useUserStore()
  const {fullname,setFullname} = useUserStore()

  const {otp,setOtp} = useUserStore()
    let navigate = useNavigate()
    let d = localStorage.getItem("value")

    useEffect(() => {
      if (!d) {
      navigate("/register");
      return;
    }

  })

  async function handleSubmit(e) {
    e.preventDefault();



    try {
        
        let res =  await axios.post("http://13.60.206.9:3000/verification/verify", {
        type:"register",
        phone,
        otp:code,
      });   
     
      if(res.status ===201){
        let d =await axios.post("http://13.60.206.9:3000/auth/register", {
            phone:phone,
            otp:code,
            fullName: fullname,
            password: pass
          });

          if(d.status ===201){

            if (d.data.AccessToken) {
                setToken(res.data.AccessToken);
                navigate("/my/profile")
              } else {
                alert("Token topilmadi!");
              }

            alert("Muvaffaqiyatli ro'yxatdan o'tildi");
            navigate("/my/profile")
          }
      }

     
    } catch (err) {
      alert(err.response.data.message || "Kod noto'g'ri");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tasdiqlash kodi</h1>
        <p className="text-sm text-gray-500 mb-4">
          Telefon raqamingizga yuborilgan kodni kiriting
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            required
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
            placeholder="123456"
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700"
          >
            Tasdiqlash
          </button>
        </form>
      </section>
    </main>
  );
}

export default Code;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userstore";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = MuiAlert;

function Code() {
  const [code, setCode] = useState("");

  const { pass, setPass } = useUserStore();
  const { phone, setPhone } = useUserStore();
  const { fullname, setFullname } = useUserStore();
  const { otp, setOtp } = useUserStore();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const navigate = useNavigate();
  const d = localStorage.getItem("value");

  useEffect(() => {
    if (!d) {
      navigate("/register");
    }
  }, [d, navigate]);

  const handleSnack = (message, severity = "success") => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ OTP tekshirish
      const res = await axios.post("http://13.62.102.27:3000/verification/verify", {
        type: "register",
        phone,
        otp: code,
      });

      if (res.status === 201) {
        // 2️⃣ Ro'yxatdan o'tish
        const d = await axios.post("http://13.62.102.27:3000/auth/register", {
          phone: phone,
          otp: code,
          fullName: fullname,
          password: pass,
        });

        if (d.status === 201) {
          const token = d.data?.Tokens?.AccessToken;
          if (token) {
            // Tokenni store-ga saqlash
            setOtp(token); // yoki setToken(token) agar sizda shunday funksiyangiz bo‘lsa
            handleSnack("Muvaffaqiyatli ro'yxatdan o'tildi", "success");

            // 1.5 soniyadan so‘ng profilga yo'naltirish
            setTimeout(() => {
              navigate("/my/profile");
            }, 1500);
          } else {
            handleSnack("Token topilmadi!", "error");
            setTimeout(() => navigate("/register"), 1500);
          }
        }
      }
    } catch (err) {
      handleSnack(err.response?.data?.message || "Kod noto'g'ri", "error");
    }
  };

  return (
    <>
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

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Code;

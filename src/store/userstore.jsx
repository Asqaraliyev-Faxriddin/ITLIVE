import { create } from "zustand";

export const useUserStore = create((set)=>({
    fullname:"",
    pass:"",
    phone:"",
    isDark:"",

    otp:"",

    setFullname:(fullname)=> set({fullname}),
    setPass:(pass)=> set({pass}),
    setIsDark:(isDark)=> set({isDark}),

    setPhone:(phone)=> set({phone}),
    setOtp:(otp)=> set({otp}),




}))
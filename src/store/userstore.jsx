import { create } from "zustand";

export const useUserStore = create((set)=>({
    fullname:"",
    pass:"",
    phone:"",
    isDark:"",

    otp:"",
    mentors: [],   
  courses: [],
  token2:"",

    setFullname:(fullname)=> set({fullname}),
    setPass:(pass)=> set({pass}),
    setIsDark:(isDark)=> set({isDark}),

    setPhone:(phone)=> set({phone}),
    setOtp:(otp)=> set({otp}),

    setMentors: (mentors) => set({ mentors }),  
  setCourses: (courses) => set({ courses }),  
  setToken:(token) => set({ token}),  



}))
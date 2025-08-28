import React from 'react'
import Header from './header footer/Header'
import Footer from './header footer/Footer'
import { useUserStore } from './store/userstore'

function My() {

  const { isDark } = useUserStore()



    return (

    <>
    
        <Header/>

            
        <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 pt-34`}>

        <div className='max-w-[1200px] mx-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4'>
        <h1 className='text-5xl font-bold'>Biz haqimizda</h1>

            <p className='text-[16px]'>

        Faxriddin Academy - 08.09.2024 yil tashkil etilgan va hozirgacha faoliyat olib kelmoqda. 
        Faxriddin Academy kompaniyasining asosiy faoliyat turi ikkiga bo'linadi,
 Kelajak kasblariga o'qitish IT sohasida xizmatlarini yetkazib berish dan iborat.
  Bizning akademiyamiz axborot texnologiyalarining barcha tendensiyalari bilan yaqindan tanishtiradi.
Shinam o‘quv binosi va zamonaviy texnologiyalarga asoslangan kurslar dasturi bilan yurtimizning eng yirik, xalqaro kompaniyalarida
 IT karyerangizni boshlaysiz.

</p>


</div>

        
        </section>


        <section className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 pt-34`}>
        <div className='max-w-[1200px] mx-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4'>
        <h1 className='text-5xl font-bold'>Media galareya</h1>


        
            
        </div>

        </section>



        <Footer/>

    
    </>


)
}

export default My
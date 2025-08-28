import React from "react";

const certificates = [
  {
    id: 1,
    img: "/file/1.jpg",  // public/file/1.jpg ichida bo‘lishi kerak
  },
  {
    id: 2,
    img: "/file/2.jpg",
  },
  {
    id: 3,
    img: "/file/3.jpg",
  },
];

export default function Certificates() {
  return (
    <div className="p-6">

<div className='max-w-[1200px] ml-auto mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4'>
<h1 className='text-5xl font-bold mb-10 text-center'> Sertifikat va guvohnomalar</h1>

</div>
   

      <div className="flex flex-wrap justify-center gap-8">
        {certificates.map(cert => (
          <a 
            key={cert.id}
            href={cert.img}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-white"
          >
            <img 
              src={cert.img} 
              alt={`Certificate ${cert.id}`} 
              className="w-[300px] h-[420px] object-contain bg-gray-50 hover:scale-105 transition-transform duration-300"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

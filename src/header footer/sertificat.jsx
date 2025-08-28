import React from "react";
import { useUserStore } from "../store/userstore";

const certificates = [
  {
    id: 2,
    img: "/file/2.jpg",
  },
];

export default function Certificates() {
  const { isDark } = useUserStore();

  return (
    <div
      className={`w-full p-6 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-[1200px] mx-auto mt-8 px-4">
        <h1 className="text-5xl font-bold mb-10 text-center">
          Sertifikat va guvohnomalar
        </h1>

        <div className="flex flex-wrap justify-center gap-8">
          {certificates.map((cert) => (
            <a
              key={cert.id}
              href={cert.img}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
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
    </div>
  );
}

"use client";

import Head from "next/head";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { ProductProvider } from "./context/ProductContext";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Unlimi. Department List</title>
          <link rel="icon" type="image/png" sizes="16x16" href="/Logo.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-8">
              <div>
                <svg
                  width="57"
                  height="56"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52.1231 29.4556C52.1231 30.5819 51.834 31.6485 51.3257 32.5755C51.2559 32.6951 51.1861 32.8247 51.1064 32.9443C49.9501 34.7385 47.9366 35.9347 45.644 35.9347H43.9793C40.0819 35.9347 36.9121 39.1045 36.9121 43.0019V49.5209C36.9121 50.5675 36.6629 51.5643 36.2144 52.4315C35.1578 54.5447 32.9648 56 30.433 56C30.2835 56 30.134 55.99 29.9844 55.9801V41.5765C29.9844 40.789 30.0542 40.0115 30.2037 39.2639C30.4131 38.0877 30.8018 36.9713 31.3201 35.9347C32.5362 33.5225 34.4999 31.5588 36.9121 30.3427C37.6198 29.9839 38.3774 29.6948 39.1549 29.4755C40.2314 29.1665 41.3777 29.007 42.5539 29.007H52.1031C52.1131 29.1565 52.1231 29.306 52.1231 29.4556Z"
                    fill="#0341A7"
                  />
                  <path
                    d="M56.7183 26.5258C56.7183 26.6753 56.7083 26.8249 56.6983 26.9644H42.5539C41.607 26.9644 40.68 26.8548 39.7928 26.6554C38.7761 26.4361 37.8092 26.0872 36.9121 25.6287C34.4999 24.4126 32.5362 22.449 31.3201 20.0367C31.0311 19.4686 30.7918 18.8805 30.6024 18.2624H30.5925C30.1938 17.0464 29.9844 15.7406 29.9844 14.3949V5.32415C30.134 5.31418 30.2835 5.30421 30.433 5.30421C31.2803 5.30421 32.0976 5.47367 32.8452 5.77271C32.9848 5.82255 33.1143 5.88235 33.2439 5.95213C35.4169 6.98878 36.9121 9.21162 36.9121 11.7833V12.9695C36.9121 16.8171 39.9822 19.947 43.7999 20.0367C43.8597 20.0467 43.9195 20.0467 43.9793 20.0467C44.0391 20.0467 44.0989 20.0467 44.1587 20.0367H50.2292C51.3655 20.0367 52.4321 20.3258 53.3591 20.8342C55.3626 21.9406 56.7183 24.0737 56.7183 26.5258Z"
                    fill="#0341A7"
                  />
                  <path
                    d="M26.8435 41.5765V50.9264C26.674 50.9363 26.5046 50.9463 26.3351 50.9463C25.5178 50.9463 24.7403 50.7968 24.0226 50.5177C23.8033 50.4379 23.594 50.3482 23.3846 50.2386C21.5406 49.3016 20.2148 47.5074 19.9158 45.3842V43.0019C19.9158 39.1045 16.746 35.9347 12.8486 35.9347H6.48909C5.39262 35.9347 4.35596 35.6655 3.44888 35.1871C1.3955 34.1006 0 31.9376 0 29.4556C0 29.306 0.00996833 29.1565 0.0199362 29.007H14.274C15.3107 29.007 16.3174 29.1366 17.2743 29.3758C18.2013 29.5951 19.0885 29.924 19.9158 30.3427C22.328 31.5588 24.2917 33.5225 25.5078 35.9347C25.8367 36.5826 26.1059 37.2704 26.3152 37.9781C26.6641 39.1144 26.8435 40.3305 26.8435 41.5765Z"
                    fill="#0341A7"
                  />
                  <path
                    d="M26.8414 0.0199362V14.3936C26.8414 15.2807 26.7517 16.1579 26.5623 16.9952C26.343 18.0618 25.9842 19.0885 25.5057 20.0354C24.2896 22.4476 22.3259 24.4113 19.9137 25.6274C19.2857 25.9464 18.6279 26.2155 17.9401 26.4149C16.7738 26.7737 15.5478 26.9631 14.2719 26.9631H4.99182C4.98185 26.8235 4.97189 26.674 4.97189 26.5245C4.97189 25.4579 5.23105 24.4612 5.6796 23.574C5.77928 23.3747 5.88893 23.1753 6.01851 22.9859C7.16482 21.2116 9.16836 20.0354 11.451 20.0354H12.6671C12.7269 20.0454 12.7867 20.0454 12.8465 20.0454C12.9063 20.0454 12.9661 20.0454 13.0259 20.0354C16.8436 19.9457 19.9137 16.8158 19.9137 12.9682V6.48909C19.9137 5.42252 20.1729 4.42573 20.6214 3.53859C21.688 1.43537 23.8809 0 26.4028 0C26.5523 0 26.7018 0.00996833 26.8414 0.0199362Z"
                    fill="#0341A7"
                  />
                </svg>
              </div>
              <h1 className="font-bold text-5xl text-[#0341A7] mr-8">
                Unlimi<span className="text-[#FF447C]">.</span>
              </h1>
              <div className="flex items-center mt-1 ml-8">
                <SearchInput />
              </div>
            </div>
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4051 21.05C13.428 21.05 14.2564 20.2215 14.2564 19.1987H10.5538C10.5538 20.2215 11.3823 21.05 12.4051 21.05ZM17.959 15.4962V10.8679C17.959 8.0216 16.4456 5.64733 13.7936 5.0179V4.38846C13.7936 3.62018 13.1734 3 12.4051 3C11.6368 3 11.0167 3.62018 11.0167 4.38846V5.0179C8.36471 5.64733 6.85128 8.0216 6.85128 10.8679V15.4962L5 17.3474V18.2731H19.8103V17.3474L17.959 15.4962Z"
                    fill="#9B9FAB"
                  />
                  <circle cx="17" cy="7" r="3" fill="white" />
                  <circle cx="17" cy="7" r="2" fill="#FF3D3D" />
                </svg>
                <Image
                  src="/doctor.png"
                  alt="doctor"
                  height={35}
                  width={35}
                  className="rounded-full"
                />
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-1 focus:outline-none"
                >
                  <span className="text-gray-700 font-medium text-sm">
                    Deko
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </div>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProductProvider>
  );
}

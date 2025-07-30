'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <>
      <header
        className={`flex flex-col px-3 py-1 fixed w-full bg-[rgba(249,249,249,0.20)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] backdrop-blur-[10px] ${
          isInfoVisible ? 'z-[999]' : 'z-20'
        }`}
        style={{ background: 'linear-gradient(45deg, transparent, #ffffff)' }}
      >
        <div className="w-full flex flex-row justify-between">
          <Link
            href="/"
            className="hover:opacity-60 focus:underline focus:outline-none cursor-pointer transition"
          >
            <h1>finetooth.dev</h1>
          </Link>
          <div
            onClick={toggleInfoVisibility}
            className="cursor-pointer hover:opacity-60 transition"
          >
            {isInfoVisible ? '[ hide ]' : '[ info ]'}
          </div>
        </div>

        <motion.div
          className={`show-info w-full flex flex-col gap-1 sm:flex-row justify-between mt-1 ${
            isInfoVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          initial={false}
          animate={{
            height: isInfoVisible ? '25svh' : 0,
            opacity: isInfoVisible ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          fullstack web design and development
          {/* Contact line */}
          <div className="flex flex-row gap-4 z-10 items-end justify-end">
            <a
              className="hover:opacity-60 transition"
              href="https://www.instagram.com/finetooth.dev/"
            >
              @finetooth.dev
            </a>
            <div>∂</div>
            <a
              href="mailto:info@finetooth.dev"
              className="hover:opacity-60 transition"
            >
              info@finetooth.dev
            </a>
          </div>
        </motion.div>
      </header>
    </>
  );
};

export default Header;

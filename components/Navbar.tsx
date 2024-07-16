"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

const navItems = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/filmes",
    title: "Filmes",
  },
  {
    id: "/series",
    title: "Series",
  },
];

const listVariants = {
  closed: {
    x: "100vh",
  },
  opened: {
    x: 0,
    transition: {
      type: "tween",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};
const listItemVariants = {
  closed: {
    x: -10,
    opacity: 0,
  },
  opened: {
    x: 0,
    opacity: 1,
  },
};

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState<boolean>(false);

  return (
    <header className="bg-black/50 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center py-2 w-full px-4 md:px-10 lg:px-16 xl:px-28">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            className="h-8 w-auto object-contain cursor-pointer"
          />
        </div>
        <div className="hidden md:flex justify-center items-center gap-8">
          {navItems.map((item, index) => (
            <Link key={index} href={item.id}>
              <div className="text-[14px] cursor-pointer text-[#878787] hover:text-yellow-500">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center ">
          <div className="hidden md:flex justify-center items-center cursor-pointer ">
            <Icon
              icon="mingcute:user-4-fill"
              className="text-4xl text-yellow-500"
            />
          </div>
          <div
            className="md:hidden flex justify-center items-center z-50 cursor-pointer w-10 h-8 text-2xl"
            onClick={() => setMobileNav((prev) => !prev)}
          >
            {mobileNav ? (
              <Icon icon="ic:baseline-close" />
            ) : (
              <Icon icon="ic:baseline-menu" />
            )}
          </div>
        </div>
      </div>

      {mobileNav && (
        <motion.div
          variants={listVariants}
          initial="closed"
          animate="opened"
          className="fixed inset-0 h-screen bg-gray-200 flex flex-col items-center justify-center gap-8 text-2xl z-40"
        >
          {navItems.map((item, index) => (
            <motion.div variants={listItemVariants} key={index}>
              <Link
                href={item.id}
                className="bg text-white whitespace-nowrap cursor-pointer"
                onClick={() => setMobileNav((prev) => !prev)}
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={listItemVariants}>
            <div className="text-white">
              <Icon icon="ic:baseline-person" className="text-white" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}

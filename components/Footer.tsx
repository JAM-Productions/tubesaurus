"use client";

import React from "react";
import { version } from "../package.json";
import { FaGithub } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import Image from "next/image";
function Footer() {
  return (
    <footer id="footer">
      <div
        className="
          container
          mx-auto
          flex
          flex-col
          items-center
          px-5
          py-8
          sm:flex-row
        "
      >
        <a
          className="
            flex
            cursor-pointer
            items-center
            justify-center
            font-medium
            text-gray-900
            md:justify-start
          "
          href="https://github.com/JAM-Productions"
        >
          <Image
            src="/jam.webp"
            alt="Logo"
            width={35}
            height={35}
            className="mr-2"
          />
          <span
            className="
              ml-3
              text-xl
            "
          >
            JAM Productions
          </span>
        </a>
        <p
          className="
            mt-4
            text-sm
            text-gray-500
            sm:ml-4
            sm:mt-0
            sm:border-l-2
            sm:border-gray-400
            sm:py-2
            sm:pl-4
          "
        >
          © {new Date().getFullYear()} JAM-Productions
        </p>
        <span
          className="
            mt-4
            inline-flex
            cursor-pointer
            justify-center
            sm:ml-auto
            sm:mt-0
            sm:justify-start
            gap-3
          "
        >
          <IoMailOutline
            className="w-6 h-6"
            onClick={() =>
              (window.location.href = "mailto:jamproductionsdev@gmail.com")
            }
          />
          <RiGitRepositoryLine
            className="w-6 h-6"
            onClick={() =>
              (window.location.href =
                "https://github.com/JAM-Productions/tubesaurus")
            }
          />
          <div className="flex flex-row">
            <FaGithub
              className="w-6 h-6"
              onClick={() =>
                (window.location.href = "https://github.com/JAM-Productions")
              }
            />

            <p
              className="
                px-2
                py-1
                text-sm
                text-gray-500
              "
            >
              v{version}
            </p>
          </div>
        </span>
      </div>
    </footer>
  );
}

export default Footer;

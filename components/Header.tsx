"use client";

import React from "react";
import Image from "next/image";

function Header({ title }: { title: string }) {
  return (
    <div className="mb-7 flex items-center gap-1">
      <Image src="/tubesaurus-logo.webp" alt="logo" height={70} width={80} />
      <h1 className="text-4xl font-bold mt-5">{title}</h1>
    </div>
  );
}

export default Header;

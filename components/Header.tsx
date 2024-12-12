import React from "react";

function Header({ title }: { title: string }) {
  return (
    <div className="mb-7 flex items-center gap-1">
      <img src="tubesaurus-logo.webp" alt="logo" className="h-20" />
      <h1 className="text-4xl font-bold mt-5">{title}</h1>
    </div>
  );
}

export default Header;

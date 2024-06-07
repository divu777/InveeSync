import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className=" bg-white shadow-md font-semibold border-b-2">
      <div className=" px-8 flex justify-between items-center py-4 text-lg">
        <div className="logo text-xl font-bold text-gray-600 hover:text-gray-900">
          Logo
        </div>
        <nav className="flex gap-32 px-10">
          <Link href="/">
            <div className="nav-links text-gray-600 hover:text-gray-900">
              Dashboard
            </div>
          </Link>
          <Link href="/inventory">
            <div className="nav-links text-gray-600 hover:text-gray-900">
              Inventory
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

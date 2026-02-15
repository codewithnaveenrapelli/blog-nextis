"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLink = (href, label) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`transition ${
        pathname === href
          ? "text-black font-semibold"
          : "text-gray-600 hover:text-black"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Practical Tech Guide
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navLink("/", "Home")}
          {navLink("/blog", "Blog")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}
          {navLink("/portfolio", "Portfolio")}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 transition ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col p-5 gap-5 text-sm font-medium">
          {navLink("/", "Home")}
          {navLink("/blog", "Blog")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}
          {navLink("/portfolio", "Portfolio")}
        </div>
      </div>
    </header>
  );
}

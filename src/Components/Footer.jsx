import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="fixed bottom-0 w-full h-10 text-center bg-gray-100 z-10"
    >
      <p
        className="text-gray-400 text-xs pt-2">
        Copyright &copy; {year}
      </p>
    </footer>
  );
}

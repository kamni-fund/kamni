import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <div>© {new Date().getFullYear()} KAMNI</div>
        <div>v0.1.0</div>
      </div>
    </footer>
  );
}

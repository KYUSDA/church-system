import { ReactNode } from "react";
import { FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Header */}
      <div
        className="relative w-full h-72 md:h-96 overflow-hidden bg-cover bg-bottom bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/kyu.jpg')" }}
      >
        {/* Dark overlay so text is always readable */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Text content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Blog &amp; Articles
          </h1>
          <p className="mt-3 text-white/80 max-w-md text-base md:text-lg">
            Sermons, devotionals, and stories from our community
          </p>
        </div>
      </div>
      {/* MAIN */}
      <main className="p-4 max-w-7xl mx-auto">{children}</main>
      {/* FOOTER */}
      <div className="bg-gray-900 text-white py-6 px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          Copyright © {new Date().getFullYear()} Kirinyaga University Church.
          All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/KyUSDAchurch"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-blue-600 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/kyusdachurch?s=09"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="http://www.youtube.com/@kyusdachurch"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-red-600 transition-colors"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </>
  );
}

export default BlogLayout;

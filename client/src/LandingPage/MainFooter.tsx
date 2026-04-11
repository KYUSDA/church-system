import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className="bg-[#e9f7f7] w-full mt-auto">
      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[400px_repeat(3,1fr)]">
        {/* Brand col */}
        <div>
          <h3 className="mb-4 text-2xl font-semibold text-[#071112]">
            Kirinyaga University<span className="text-orange-400"> Church</span>
          </h3>
          <p className="mb-4 text-[#333333] leading-relaxed">
            We are blessed to be a part of your spiritual journey and are
            dedicated to fostering faith, hope, and community at every step.
          </p>
          <p className="text-[#333333] leading-relaxed">
            Join us in worship, fellowship, and service as we grow together in
            faith and love, following the teachings of Christ.
          </p>
        </div>

        {/* About col */}
        <div>
          <h4 className="mb-4 text-xl font-semibold text-[#071112]">
            About Us
          </h4>
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Our Ministries", href: "#ministries" },
            { label: "Upcoming Events", href: "#events" },
          ].map(({ label, href }) => (
            <p key={label} className="mb-4">
              <a
                href={href}
                className="text-[#333333] transition-colors hover:text-[#071112]"
              >
                {label}
              </a>
            </p>
          ))}
          <p className="mb-4">
            <Link
              to="/terms"
              target="_blank"
              className="text-[#333333] transition-colors hover:text-[#071112]"
            >
              Terms &amp; Conditions
            </Link>
          </p>
        </div>

        {/* Resources col */}
        <div>
          <h4 className="mb-4 text-xl font-semibold text-[#071112]">
            Resources
          </h4>
          {[
            { label: "Sermons", href: "#sermons" },
            { label: "Bible Study", href: "/resources" },
            { label: "Volunteer Opportunities", href: "#volunteer" },
            { label: "Make a Donation", href: "/donations" },
          ].map(({ label, href }) => (
            <p key={label} className="mb-4">
              <a
                href={href}
                className="text-[#333333] transition-colors hover:text-[#071112]"
              >
                {label}
              </a>
            </p>
          ))}
          <p className="mb-4">
            <Link
              to="/policy"
              target="_blank"
              className="text-[#333333] transition-colors hover:text-[#071112]"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Contact col */}
        <div>
          <h4 className="mb-4 text-xl font-semibold text-[#071112]">
            Contact Us
          </h4>
          <p className="mb-4 flex items-start gap-2 text-[#333333]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#071112]" />
            Kirinyaga University, Kutus, Kirinyaga
          </p>
          <p className="mb-4 flex items-center gap-2 text-[#333333]">
            <Mail className="h-4 w-4 shrink-0 text-[#071112]" />
            kyusdachurch@gmail.com
          </p>
          <p className="mb-4 flex items-center gap-2 text-[#333333]">
            <Phone className="h-4 w-4 shrink-0 text-[#071112]" />
            (+254) 745 528 795
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#071112]">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-white">
            Copyright &copy; {new Date().getFullYear()} Kirinyaga University
            Church. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white">
            <a
              href="https://www.facebook.com/KyUSDAchurch"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/kyusdachurch?s=09"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <FaTwitter className="h-4 w-4" />
            </a>
            <a
              href="http://www.youtube.com/@kyusdachurch"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <FaYoutube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#427571] text-white">
      <div className="w-full md:px-6 px-2 py-3 border-t border-b border-gray-200">
        <div className="md:container mx-auto grid md:grid-cols-12 gap-8 text-center md:text-left pt-7">
          
          {/* About Section */}
          <div className="md:col-span-4 col-span-12">
              <Link href="/">
              <Image
                src={logo}
                width={100}
                height={100}
                alt="logo"
                className="rounded-md lg:mr-20 w-[189px] h-[78px]"
              />
            </Link>
          </div>

          {/* Explore Section */}
          <div className="md:col-span-8 col-span-12 grid grid-cols-12 gap-5">
            <div className="col-span-4 text-center">
              <h3 className="font-semibold text-xl mb-4">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="hover:text-gray-300">Home</Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-gray-300">Services</Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-gray-300">About</Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-gray-300">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="col-span-4 text-center">
              <h3 className="font-semibold text-xl mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/faqs" className="hover:text-gray-300">FAQs</Link>
                </li>
                <li>
                  <Link href="/terms-condition" className="hover:text-gray-300">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-span-4 text-center">
              <h3 className="font-semibold text-xl mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className=" flex justify-center items-center">
                  <FaPhone className="text-gray-300 size-4 mr-1" />
                  <Link href="tel:+923041234567" className="hover:text-gray-300">+923041234</Link>
                </li>
                <li className=" flex justify-center items-center">
                  <FaEnvelope className="text-gray-300 size-4 mr-1"  />
                  <Link href="mailto:demo.info.com" className="hover:text-gray-300">demo.inf.com</Link>
                </li>
                <li className=" flex justify-center items-center">
                  <FaMapMarkerAlt className="text-gray-300 size-4 mr-1" />
                  <Link href="https://goo.gl/maps/demo" target="_blank" className="hover:text-gray-300">Dhaka, Bangladesh</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Logo and Links */}
      <div className="w-full md:container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center mt-3 pb-7">
        <p className="text-lg">© 2024. All Rights Reserved</p>
        <ul className="flex md:mr-6 lg:mr-28 gap-4">
          <li className="text-lg font-semibold bg-white p-2 rounded-full">
            <FaFacebookF  className="text-[#427571]"/>
          </li>
          <li className="text-lg font-semibold bg-white p-2 rounded-full">
            <FaInstagram  className="text-[#427571]"/>
          </li>
          <li className="text-lg font-semibold bg-white p-2 rounded-full">
            <FaLinkedinIn className="text-[#427571]" />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

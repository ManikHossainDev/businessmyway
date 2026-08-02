import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

import logo from "@/assets/logo/logo.png";
import Image from "next/image";
const shopLinks = [
  { label: "Cigarettes", href: "/shop/cigarettes" },
  { label: "Cigars", href: "/shop/cigars" },
  { label: "Pipe Tobacco", href: "/shop/pipe-tobacco" },
  { label: "Rolling Tobacco", href: "/shop/rolling-tobacco" },
  { label: "Accessories", href: "/shop/accessories" },
  { label: "New Arrivals", href: "/shop/new-arrivals" },
];

const brandLinks = [
  { label: "Davidoff", href: "/brands/davidoff" },
  { label: "Cohiba", href: "/brands/cohiba" },
  { label: "Montecristo", href: "/brands/montecristo" },
  { label: "Dunhill", href: "/brands/dunhill" },
  { label: "Partagás", href: "/brands/partagas" },
  { label: "All Brands", href: "/brands" },
];

const infoLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Term-Condition", href: "/terms-condition" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  // { label: "Cookie Policy", href: "/cookie-policy" },
];

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com" },
  { icon: FaFacebookF, href: "https://facebook.com" },
  { icon: FaXTwitter, href: "https://x.com" },
];

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <h3 className="font-semibold text-[12px] md:text-[18px] lg:text-[22px] text-gray-900 mb-4">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-[10px] md:text-[16px] lg:text-[18px] text-gray-500 hover:text-gray-900 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <section className="shadow-[0px_-13px_10px_0px_#00000010]">
      <footer className="px-2 xl:px-0 xl:container mx-auto  bg-white text-gray-900">
      <div className="py-5 ">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand / About */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="logo"
                className="w-10 h-8"
              />
              <span className="text-[12px] md:text-[18px] lg:text-[22px] font-semibold tracking-wide text-[#BF8D2F]">
                SMKR
              </span>
            </Link>
            <p className="text-[10px] md:text-[16px] lg:text-[18px] text-gray-500 leading-relaxed mb-5 max-w-xs">
              Be the first to discover our latest arrivals, exclusive releases, and members-only offers. Thoughtfully curated updates, delivered to your inbox—never more than twice a month. No spam, ever.
            </p>
            <div className="flex items-center  gap-3">
              {socialLinks.map(({ icon: Icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon className="text-[10px] md:text-[16px] lg:text-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="md:col-span-8 flex justify-between">
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Brands" links={brandLinks} />
            <FooterColumn title="Information" links={infoLinks} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className=" py-5 flex flex-col lg:flex-row items-center justify-between gap-3">
          <p className="text-[10px]  lg:text-[16px]  text-gray-500 text-center md:text-left">
            © 2022 SMKR All rights reserved. Registered in England & Wales.
          </p>
          <p className="text-[10px] lg:text-[16px]  text-gray-500 text-center md:text-right flex items-center gap-1">
            <span className="text-amber-500">⚠</span>
            SMOKING KILLS Tobacco products are harmful to your health and
            are addictive. For adults only. 18+ only.
          </p>
        </div>
      </div>
    </footer>
    </section>
  );
};

export default Footer;
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
 
interface IActiveProps {
  label: string;
  href: string;
}
 
const ActiveLink = ({ label, href }: IActiveProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
 
  return (
    <Link
      href={href}
      className={`md:text-[12px] lg:text-[px] xl:text-[20px] lg:p-4 p-2 ${
        isActive ? "text-[#0A0A0A] font-semibold" : "text-[#737373]"
      }`}
    >
      {label}
    </Link>
  );
};
 
export default ActiveLink;
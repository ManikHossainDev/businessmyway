import Link from "next/link";

const Page = () => {
 return (
 <div className="md:container">
     {/* top button */}
     <div className=" flex items-center justify-center py-10">
        <div className="inline-flex items-center border-2 border-red-500 rounded-full px-4 py-2">
          <Link href="/">
            <span className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              Home
            </span>
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/terms-condition">
            <span className="text-black font-semibold hover:text-gray-800 transition-colors duration-200">
            Terms of Condition
            </span>
          </Link>
        </div>
      </div>

    {/*  other page */}
    <div className="flex flex-col justify-center items-center md:mb-20  p-4 space-y-6">
      {/* First Section */}
      <div className=" w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          We collect several types of information from and about users of our website and services, including:
        </h2>
        <ul className="list-decimal pl-6 space-y-2">
          <li>
            <span className="font-bold">Personal Information:</span> Information that identifies you personally, such as your name, email address, postal address, phone number, and any other identifier by which you may be contacted online or offline.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
        </ul>
      </div>

      {/* Second Section (Duplicate) */}
      <div className=" w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          We collect several types of information from and about users of our website and services, including:
        </h2>
        <ul className="list-decimal pl-6 space-y-2">
          <li>
            <span className="font-bold">Personal Information:</span> Information that identifies you personally, such as your name, email address, postal address, phone number, and any other identifier by which you may be contacted online or offline.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
          <li>
            <span className="font-bold">Non-Personal Information:</span> Information that does not identify you personally, including but not limited to usage data, general demographic information, and statistical or aggregated data.
          </li>
        </ul>
      </div>
    </div>
 </div>
 );
};

export default Page;
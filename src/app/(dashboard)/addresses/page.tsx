import GifRevealWrapper from "@/components/UI/GifRevealWrapper";

/* eslint-disable @typescript-eslint/no-explicit-any */
const addresses = [
  {
    label: "Home",
    isDefault: true,
    name: "James Whitmore",
    lines: ["14 Montague Street", "London", "WC1B 5BP"],
  },
  {
    label: "Home",
    isDefault: false,
    name: "James Whitmore",
    lines: ["14 Montague Street", "London", "WC1B 5BP"],
  },
];

const AddressCard = ({ address }: { address: any }) => {
  const { label, isDefault, name, lines } = address;

  return (
    <div className="relative border border-gray-300 rounded-md p-5 flex-1 ">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-[#c98a3e] font-serif">
          {label}
        </h3>
        {isDefault && (
          <span className="text-xs border border-gray-300 rounded px-3 py-1 text-gray-700">
            Default
          </span>
        )}
      </div>

      <div className="text-sm text-gray-800 leading-6 mb-5">
        <p>{name}</p>
        {lines.map((line: string) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <a href="#" className="underline hover:text-gray-900">
          Edit
        </a>
        {!isDefault && (
          <>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-gray-900">
              Set Default
            </a>
          </>
        )}
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-gray-900">
          Remove
        </a>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold font-serif ">
        <span className="text-[#1f2a44]">Personal </span>
        <span className="text-[#c98a3e]">Details</span>
      </h1>
        <GifRevealWrapper borderSize={3}>
          <button className="w-[200px] px-2 rounded-sm md:w-[180px] lg:w-[200px]  h-[40px]   bg-[#BF8D2F] text-white font-medium lg:px-[10px] lg:py-[10px] hover:bg-[#a97922] transition-colors">
            Add New Address
          </button>
          </GifRevealWrapper>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {addresses.map((address, idx) => (
          <AddressCard key={idx} address={address} />
        ))}
      </div>
    </div>
  );
};

export default Page;
const Page = () => {
  return (
    <div className="">
      <div className="max-w-2xl">
        <h2 className="font-serif text-[32px] font-bold mb-2 tracking-tight">
          <span className="text-black">Personal </span>
          <span className="text-[#B8863B]">Details</span>
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue="James"
              className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Last Nam
            </label>
            <input
              type="text"
              defaultValue="Whitmore"
              className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
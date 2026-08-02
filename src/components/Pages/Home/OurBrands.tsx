const brands = [
  "Davidoff",
  "Marlboro",
  "Cohiba",
  "Dunhill",
  "Montecristo",
  "Camel",
  "Partagás",
];

const OurBrands = () => {
  return (
    <section className="py-10 xl:pt-24 px-4">
      {/* Heading with side dividers */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <span className="h-[4px] w-8 bg-[#BF8D2F]" />
        <h2 className="text-[26px] md:font-corvinus font-medium tracking-wide text-neutral-800">
          Our Brands
        </h2>
        <span className="h-[4px] w-8 bg-[#BF8D2F]" />
      </div>

      {/* Brand list with vertical dividers */}
      <div className="flex flex-wrap items-center justify-center divide-x divide-neutral-300">
        {brands.map((brand) => (
          <span
            key={brand}
            className="px-2 lg:px-6 py-2 text-[16px] md:text-[24px] text-neutral-500 hover:text-[#BF8D2F] transition-colors cursor-default"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
};

export default OurBrands;
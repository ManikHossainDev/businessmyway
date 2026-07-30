import Image from "next/image";
import herosection from "@/assets/home/herosection.png";
import Rectangle from "@/assets/home/Rectangle.gif";
import GifRevealWrapper from "@/components/UI/GifRevealWrapper";
const HeroBannerSection = () => {
  return (
    <section className="relative md:py-10 h-[62vh] sm:h-[50vh] md:h-[60vh] lg:h-[92vh] overflow-hidden">
      <Image
        src={herosection}
        alt="Hero section background"
        fill
        priority
        quality={100}
        sizes="100vw"
        placeholder="blur"
        className="object-fill -z-10"
      />
      <div className="relative xl:container px-1 xl:px-0 h-full flex flex-col justify-center">
        <div className="mt-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-2 xl:mb-6  lg:mt-0">
            <span className="w-10 h-1 bg-[#BF8D2F]" />
            <span className="text-sm md:text-base xl:text-[20px] tracking-wide text-neutral-700">
              Reserve Collection 2024
            </span>
          </div>

          <h1 className="font-[OPTICorvinus_Skyline] text-18 leading-[20px]  sm:text-[20px] sm:leading-[24px] md:text-[52px] md:leading-[65px] lg:text-[80px] lg:leading-[104px]  xl:text-[105px] xl:leading-[124px] tracking-tight text-black">
          Crafted for Those <br />
          <div className="flex font-[OPTICorvinus_Skyline]">
            Who <div className="text-[#BF8D2F] font-[OPTICorvinus_Skyline] ml-1 md:ml-2 lg:ml-3 xl:ml-4"> Demand</div>
            </div> Distinction
        </h1>

          {/* Description */}
          <p className="mt-2 md:mt-4 lg:mt-6 sm:max-w-sm  md:max-w-md lg:max-w-xl xl:max-w-2xl font-jost font-normal text-[14px] sm:text-[16px] leading-[100%] sm:leading-[120%] md:text-[17px] lg:text-[20px] text-neutral-700 tracking-[0]">
            Discover our curated selection of the world&apos;s finest tobacco
            products from hand-rolled cigars to limited reserve cigarettes,
            sourced from the most celebrated regions on earth.
          </p>

          {/* CTAs */}
          <div className="mt-2 md:mt-4 lg:mt-8 flex flex-row gap-[10px]">
          <GifRevealWrapper borderSize={3}>
          <button className="w-[200px] px-2 rounded-sm md:w-[180px] lg:w-[200px] xl:w-[316px] h-[40px] md:h-[56px]  bg-[#BF8D2F] text-white font-medium lg:px-[10px] lg:py-[10px] hover:bg-[#a97922] transition-colors">
            Explore Collection
          </button>
          </GifRevealWrapper>
          <GifRevealWrapper borderSize={3}>
          <button className="px-2 w-[200px] rounded-sm md:w-[180px] lg:w-[200px] xl:w-[316px] h-[40px] md:h-[56px] border border-black bg-white hover:bg-[#eeececa4] text-black font-medium lg:px-[10px]  lg:py-[10px]   transition-colors">
            Our Story
          </button>
          </GifRevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBannerSection;
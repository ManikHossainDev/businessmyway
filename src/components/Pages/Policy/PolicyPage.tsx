"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import {
  useGetPublicSettingQuery,
  type SettingSlug,
} from "@/redux/features/settings/settingsApi";
import { formatJoinDate } from "@/utils/media";

type PolicyPageProps = {
  slug: SettingSlug;
  href: string;
  fallbackTitle: string;
};

const PolicyPage = ({ slug, fallbackTitle }: PolicyPageProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetPublicSettingQuery(slug);
  const setting = data?.data;
  const title = setting?.title || fallbackTitle;
  const updatedAt = formatJoinDate(setting?.updatedAt);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };
  const emails = setting?.metadata?.emails
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const phones = setting?.metadata?.phones
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const address = setting?.metadata?.address;

  return (
    <div className="xl:container py-10 xl:py-16">
      <div className="flex flex-col justify-center items-center md:mb-20 space-y-6">
        <div className="w-full  py-2">
          
          {isLoading ? (
            <p className="text-gray-500">Loading {fallbackTitle.toLowerCase()}…</p>
          ) : isError || !setting ? (
            <p className="text-gray-500">
              {fallbackTitle} is not available yet. Please try again later.
            </p>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-left py-3">
               <div className="flex items-center gap-2 -mb-7" >
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Go back"
                  className=" inline-flex items-center justify-center p-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <FiArrowLeft className="text-xl" />
                  </button> <span className="text-xl font-semibold">{title}</span>
                </div>
                {updatedAt ? (
                  <>
                    <br />
                    <span className="text-lg font-normal text-gray-500">
                      Last Update: {updatedAt}
                    </span>
                  </>
                ) : null}
              </h1>
              <div
                className="policy-html text-base leading-relaxed text-gray-700 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_a]:text-[#C1892F] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[#E8E0D4] [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:max-w-full [&_img]:h-auto [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right [&_.ql-align-justify]:text-justify"
                dangerouslySetInnerHTML={{ __html: setting.content || "" }}
              />
              {(emails?.length || phones?.length || address) ? (
                <div className="mt-8 space-y-2 text-base text-gray-700">
                  {emails?.map((email) => (
                    <p key={email}>
                      <span className="font-semibold">Email:</span> {email}
                    </p>
                  ))}
                  {phones?.map((phone) => (
                    <p key={phone}>
                      <span className="font-semibold">Phone:</span> {phone}
                    </p>
                  ))}
                  {address ? (
                    <p>
                      <span className="font-semibold">Address:</span> {address}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;

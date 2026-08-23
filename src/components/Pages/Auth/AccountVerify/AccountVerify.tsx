/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Form, Input, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlinePassword } from "react-icons/md";

import SVECTOR from "@/assets/Authentication/SVECTOR.png";
import { useVerifyAccountMutation } from "@/redux/features/auth/authApi";
import Swal from "sweetalert2";

interface OTPFormValues {
  otp: string;
}

const AccountVerify: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get email from URL
  const email = searchParams.get("email");

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();

  const onFinish = async (values: OTPFormValues) => {
    // Check email
    if (!email) {
      message.error("Email address is missing.");
      return;
    }

    try {
      // API Payload
      const payload = {
        email,
        otp: values.otp,
      };
      const response = await verifyAccount(payload).unwrap();
      if (response?.statusCode === 200) {
         Swal.fire({
                  title: "Verify success",
                  text: `${response?.message}` || "Account verify successful",
                  icon: "success",
                });
          
        // Redirect to login
        router.push("/login");
      } else {
        message.error(
          response?.message || "Account verification failed."
        );
      }
    } catch (error: any) {
      console.error("Account verification error:", error);
        Swal.fire({
          title: "Some Thing wrong",
          text: `${error?.data?.message}`,
          icon: "error",
        });
    }
  };

  const handleResend = () => {
    // TODO: Connect resend OTP API here
    message.success("A new verification code has been sent to your email.");
  };

  return (
    <section className="relative mx-auto flex min-h-screen w-[92%] items-center justify-center overflow-hidden rounded-md px-3 py-10 sm:w-[90%] sm:py-16">
      {/* Background */}
      <Image
        src={SVECTOR}
        alt=""
        fill
        priority
        className="pointer-events-none select-none object-cover"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full px-2 sm:px-4 md:max-w-[40%]">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-7">
          <h1 className="mb-1.5 font-serif text-xl leading-tight text-[#1A1A1A] sm:text-2xl">
            Account <span className="text-[#C1752C]">Verify</span>
          </h1>

          <p className="text-sm text-[#8F887A] sm:text-xl">
            Please check your email and enter the verification code.
          </p>

          {/* Show Email */}
          {email && (
            <p className="mt-2 break-all text-xs text-[#737373] sm:text-sm">
              {email}
            </p>
          )}
        </div>

        {/* OTP Form */}
        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Please enter the OTP.",
              },
              {
                len: 5,
                message: "OTP must be 5 digits.",
              },
              {
                pattern: /^\d+$/,
                message: "OTP must contain numbers only.",
              },
            ]}
            className="mb-5"
          >
            <Input
              size="large"
              prefix={
                <MdOutlinePassword className="text-xl text-[#737373]" />
              }
              placeholder="Enter OTP"
              maxLength={5}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="!w-full !rounded-[3px] !border !border-[#737373] !py-2 !text-sm !text-[#1A1A1A] placeholder:!text-[#B3ACA0] sm:!text-xl"
            />
          </Form.Item>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-[3px] bg-[#C1892F] py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#AD7A28] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-xl sm:tracking-[0.15em]"
          >
            {isLoading ? "Verifying..." : "Verify Account"}
          </button>
        </Form>

        {/* Resend OTP */}
        {/* <div className="mt-5 text-center">
          <p className="text-sm text-[#8F887A] sm:text-base">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-[#C1752C] underline underline-offset-2 transition-colors hover:text-[#AD7A28]"
            >
              Resend Code
            </button>
          </p>
        </div>
        */}
      </div>
    </section>
  );
};

export default AccountVerify;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Form, Input, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlinePassword } from "react-icons/md";

import SVECTOR from "@/assets/Authentication/SVECTOR.png";
import {
  useResendOtpMutation,
  useVerifyAccountMutation,
} from "@/redux/features/auth/authApi";
import Swal from "sweetalert2";

interface OTPFormValues {
  otp: string;
}

const AccountVerify: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const onFinish = async (values: OTPFormValues) => {
    if (!email) {
      Swal.fire({
        title: "Error",
        text: "Email address is missing.",
        icon: "error",
      });
      return;
    }

    try {
      const response = await verifyAccount({
        email,
        otp: values.otp,
      }).unwrap();

      if (response?.statusCode === 200) {
        await Swal.fire({
          title: "Email Verified!",
          text: response?.message || "Email verified successfully. Your account is pending admin verification before you can log in.",
          icon: "success",
          confirmButtonColor: "#C1892F",
          confirmButtonText: "Go to Login",
        });
        router.push("/login");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Something went wrong",
        text: error?.data?.message || "Account verification failed.",
        icon: "error",
      });
    }
  };

  const handleResend = async () => {
    if (!email) {
      Swal.fire({
        title: "Error",
        text: "Email address is missing.",
        icon: "error",
      });
      return;
    }

    try {
      const response = await resendOtp({ email }).unwrap();
      if (response?.statusCode === 200) {
        Swal.fire({
          title: "Success",
          text: response?.message || "A new verification code has been sent to your email.",
          icon: "success",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Failed to resend OTP.",
        icon: "error",
      });
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="relative mx-auto flex min-h-screen w-[92%] items-center justify-center overflow-hidden rounded-md px-3 py-10 sm:w-[90%] sm:py-16">
      <Image
        src={SVECTOR}
        alt=""
        fill
        priority
        className="pointer-events-none select-none object-cover"
      />

      <div className="relative z-10 w-full px-2 sm:px-4 md:max-w-[40%]">
        <div className="mb-6 text-center sm:mb-7">
          <h1 className="mb-1.5 font-serif text-xl leading-tight text-[#1A1A1A] sm:text-2xl">
            Account <span className="text-[#C1752C]">Verify</span>
          </h1>

          <p className="text-sm text-[#8F887A] sm:text-xl">
            Please check your email and enter the verification code.
          </p>

          {email && (
            <p className="mt-2 break-all text-xs text-[#737373] sm:text-sm">
              {email}
            </p>
          )}
        </div>

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
              prefix={<MdOutlinePassword className="text-xl text-[#737373]" />}
              placeholder="Enter OTP"
              maxLength={5}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="!w-full !rounded-[3px] !border !border-[#737373] !py-2 !text-sm !text-[#1A1A1A] placeholder:!text-[#B3ACA0] sm:!text-xl"
            />
          </Form.Item>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-[3px] bg-[#C1892F] py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#AD7A28] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-xl sm:tracking-[0.15em]"
          >
            {isLoading ? "Verifying..." : "Verify Account"}
          </button>
        </Form>

        <div className="mt-5 text-center">
          <p className="text-sm text-[#8F887A] sm:text-base">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-[#C1752C] underline underline-offset-2 transition-colors hover:text-[#AD7A28] disabled:opacity-60"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccountVerify;

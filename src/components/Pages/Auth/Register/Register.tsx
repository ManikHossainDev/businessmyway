/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { Form, message } from "antd";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/UI/InputComponent";
import SVECTOR from "@/assets/Authentication/SVECTOR.png";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (values: RegisterFormValues) => {
    const registrationData = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
      phone: values.phone,
    };

    try {
      const res = await register(registrationData).unwrap();
      console.log("Registration Response: ", res);
      message.success(
        "Registration successful! Please check your email for verification."
      );
      router.push("/login");
    } catch (error: any) {
      console.error("Registration Error: ", error);
      message.error(
        error?.data?.message || "Something went wrong during registration"
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="relative w-[92%] sm:w-[90%] mx-auto min-h-screen rounded-md overflow-hidden flex items-center justify-center py-10 sm:py-16 px-3">
      {/* Decorative ribbon background */}
      <Image
        src={SVECTOR}
        alt=""
        fill
        priority
        className="lx:object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 w-full md:max-w-[40%] px-2 sm:px-4">
        {/* Tabs */}
        <div className="flex mb-5 sm:mb-6 border-b-2 sm:border-b-4 border-[#E7E2D8]">
          <Link
            href="/login"
            className="flex-1 pb-2 sm:pb-2.5 text-base sm:text-xl font-medium text-[#A39C8E] text-center hover:text-[#1A1A1A] transition-colors"
          >
            Sign In
          </Link>
          <button
            type="button"
            className="flex-1 pb-2 sm:pb-2.5 text-base sm:text-xl font-medium text-[#1A1A1A] border-b-2 sm:border-b-4 border-[#C1892F] -mb-[2px] sm:-mb-1"
          >
            Create Account
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-center font-serif text-xl sm:text-2xl leading-tight text-[#1A1A1A] mb-1.5">
          Create an <span className="text-[#C1752C]">account</span>
        </h1>
        <p className="text-center text-sm sm:text-xl text-[#8F887A] mb-6 sm:mb-7">
          Join Noir &amp; Co. for exclusive access
        </p>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Form.Item
              label={
                <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                  First Name
                </span>
              }
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
              className="mb-3.5 flex-1"
            >
              <InputComponent
                size="large"
                icon={FaUserCircle}
                placeholder="James"
                className="!w-full !border !border-[#737373] !text-[#1A1A1A] placeholder:!text-[#B3ACA0] !text-sm sm:!text-xl !rounded-[3px] !py-2"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                  Last Name
                </span>
              }
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
              className="mb-3.5 flex-1"
            >
              <InputComponent
                size="large"
                icon={FaUserCircle}
                placeholder="Whitmore"
                className="!w-full !border !border-[#737373] !text-[#1A1A1A] placeholder:!text-[#B3ACA0] !text-sm sm:!text-xl !rounded-[3px] !py-2"
              />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                Password
              </span>
            }
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
            ]}
            className="mb-3.5"
          >
            <InputComponent
              placeholder="Password"
              icon={FaLock}
              isPassword={true}
              size="large"
              className="!w-full !border !border-[#737373] !text-[#1A1A1A] placeholder:!text-[#B3ACA0] !text-sm sm:!text-xl !rounded-[3px] !py-2"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                Email Address
              </span>
            }
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            className="mb-3.5"
          >
            <InputComponent
              size="large"
              icon={MdEmail}
              placeholder="Email Address"
              className="!w-full !border !border-[#737373] !text-[#1A1A1A] placeholder:!text-[#B3ACA0] !text-sm sm:!text-xl !rounded-[3px] !py-2"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                Phone Number
              </span>
            }
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
            className="mb-5"
          >
            <InputComponent
              size="large"
              icon={GiPhone}
              placeholder="Phone Number"
              className="!w-full !border !border-[#737373] !text-[#1A1A1A] placeholder:!text-[#B3ACA0] !text-sm sm:!text-xl !rounded-[3px] !py-2"
            />
          </Form.Item>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 bg-[#C1892F] hover:bg-[#AD7A28] transition-colors rounded-[3px] text-white text-sm sm:text-xl font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Continue"}
          </button>
        </Form>

        <div className="mt-4 text-center text-sm sm:text-xl">
          <span className="text-[#8F887A]">Already have an account? </span>
          <Link
            href="/login"
            className="text-[#C1892F] font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
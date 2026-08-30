/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Checkbox, Form, Spin } from "antd";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/UI/InputComponent";
import SVECTOR from "@/assets/Authentication/SVECTOR.png";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  identityDocumentType: "nid" | "driving_license";
  agreeTermsAndConditions: boolean;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [identityFile, setIdentityFile] = useState<File | null>(null);

  // Initial page loading
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const onFinish = async (values: RegisterFormValues) => {
    if (!identityFile) {
      Swal.fire({
        title: "ID document required",
        text: "Please upload your NID or driving license.",
        icon: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", `${values.firstName} ${values.lastName}`.trim());
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.password);
    formData.append("phone", values.phone);
    formData.append("dateOfBirth", values.dateOfBirth);
    formData.append("agreeTermsAndConditions", String(values.agreeTermsAndConditions));
    formData.append("identityDocumentType", values.identityDocumentType);
    formData.append("identityDocument", identityFile);

    try {
      const res = await register(formData).unwrap();
      if (res?.statusCode === 201) {
        router.push(`/account-verify?email=${encodeURIComponent(values.email)}`);
        Swal.fire({
          title: "Registration successful!",
          text: "Please verify your email. An admin will review your ID before you can log in.",
          icon: "success",
        });
      }
    } catch (error: any) {
      console.error("Registration Error: ", error);

      const validationErrors = error?.data?.errors;

      if (
        Array.isArray(validationErrors) &&
        validationErrors.length > 0
      ) {
        Swal.fire({
          title: "Oops!",
          html: validationErrors
            .map((err: any) => err.message)
            .join("<br/>"),
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text:
            error?.data?.message ||
            "Something went wrong during registration",
          icon: "error",
        });
      }
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
    <section className="relative w-[92%] sm:w-[90%] mx-auto min-h-screen rounded-md overflow-hidden flex items-center justify-center py-10 sm:py-16 px-3">
      {/* Decorative ribbon background */}
      <Image
        src={SVECTOR}
        alt=""
        fill
        priority
        className="lx:object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 w-full  md:w-[60%] lg:w-[40%] mx-auto px-2 sm:px-4">
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
          Create an{" "}
          <span className="text-[#C1752C]">account</span>
        </h1>

        <p className="text-center text-sm sm:text-xl text-[#8F887A] mb-6 sm:mb-7">
          Join British Smokes for exclusive access
        </p>

        {/* Registration Form */}
        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* First Name + Last Name */}
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Form.Item
              label={
                <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                  First Name
                </span>
              }
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
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
                {
                  required: true,
                  message: "Please enter your last name",
                },
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

          {/* Password */}
          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                Password
              </span>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
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

          {/* Email */}
          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                Email Address
              </span>
            }
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
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

          {/* Phone */}
          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                Phone Number
              </span>
            }
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
            className="mb-3.5"
          >
            <InputComponent
              size="large"
              icon={GiPhone}
              placeholder="Phone Number"
              className="!w-full !border !border-[#737373] !text-[#1A1A1A] placeholder:!text-[#B3ACA0] !text-sm sm:!text-xl !rounded-[3px] !py-2"
            />
          </Form.Item>

          {/* Date of Birth */}
          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                Date of Birth
              </span>
            }
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Please enter your date of birth",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }

                  const birthDate = new Date(value);
                  const today = new Date();

                  const cutoff = new Date(
                    today.getFullYear() - 18,
                    today.getMonth(),
                    today.getDate()
                  );

                  if (birthDate > cutoff) {
                    return Promise.reject(
                      new Error(
                        "You must be at least 18 years old to register"
                      )
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
            className="mb-5"
          >
            <InputComponent
              size="large"
              icon={FaCalendarAlt}
              type="date"
              placeholder="Date of Birth"
              className="!w-full !border !border-[#737373] !text-[#1A1A1A] placeholder:!text-[#B3ACA0] !text-sm sm:!text-xl !rounded-[3px] !py-2"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                ID Document Type
              </span>
            }
            name="identityDocumentType"
            initialValue="nid"
            rules={[
              {
                required: true,
                message: "Please select your ID document type",
              },
            ]}
            className="mb-3.5"
          >
            <select className="w-full border border-[#737373] text-[#1A1A1A] text-sm sm:text-xl rounded-[3px] py-2.5 px-3 bg-white">
              <option value="nid">National ID (NID)</option>
              <option value="driving_license">Driving License</option>
            </select>
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm sm:text-xl font-medium text-[#1A1A1A]">
                NID / Driving License
              </span>
            }
            required
            className="mb-5"
          >
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(event) => setIdentityFile(event.target.files?.[0] || null)}
              className="w-full border border-[#737373] rounded-[3px] py-2 px-3 text-sm sm:text-base text-[#1A1A1A] bg-white file:mr-3 file:rounded file:border-0 file:bg-[#C1892F] file:px-3 file:py-1.5 file:text-white"
            />
            <p className="mt-1 text-xs sm:text-sm text-[#8F887A]">
              Upload one file: NID or driving license (image or PDF).
            </p>
          </Form.Item>

          {/* Terms & Conditions / Privacy Policy */}
          <Form.Item
            name="agreeTermsAndConditions"
            valuePropName="checked"
            initialValue={false}
            className="mb-5"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "You must agree to the terms and conditions"
                        )
                      ),
              },
            ]}
          >
            <Checkbox className="!items-start [&>span:last-child]:text-sm [&>span:last-child]:sm:text-base">
              <span className="text-[#4A453D]">
                I agree to the{" "}
                <Link
                  href="/terms-condition"
                  target="_blank"
                  className="text-[#C1892F] font-medium hover:underline"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-[#C1892F] font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 bg-[#C1892F] hover:bg-[#AD7A28] transition-colors rounded-[3px] text-white text-sm sm:text-xl font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Continue"}
          </button>
        </Form>

        {/* Already have account */}
        <div className="mt-4 text-center text-sm sm:text-xl">
          <span className="text-[#8F887A]">
            Already have an account?{" "}
          </span>

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
"use client";
import Image from "next/image";
import Link from "next/link";
import { Form, Checkbox, message } from "antd";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/UI/InputComponent";
import google from "@/assets/Authentication/google.png";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner"; // Assuming you have a loading spinner component


interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: LoginFormValues) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await login(loginData).unwrap();
      console.log("Login Response: ", res);
      
      // Dispatch setUser action to store user and token in Redux and cookies
      dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
      
      message.success("Logged in successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Login Error: ", error);
      message.error(error?.data?.message || "Something went wrong during login");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="w-[90%] mx-auto h-[90vh] px-4 py-10 md:px-6 lg:px-10 bg-[#282828] mt-10 rounded-md">

      <div className="w-full h-full px-4 py-10 md:px-6 lg:px-10">
      <div className="w-full  mx-auto">
          {/* Form Content */}
          <div className="w-full max-w-[510px] mx-auto px-4 md:px-0">
            <div className="bg-[#5E5E5E] shadow-lg rounded-lg border-[3px] border-white">
              <div className="px-6 md:py-8 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-white text-center ">
                Welcome back!
                </h2>
                <p className="text-center pb-5 text-white">Please enter your details</p>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-3"
                >
                  <Form.Item
                    label={<span className="text-white">Email</span>}
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <InputComponent icon={MdEmail} placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-white">Password</span>}
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <InputComponent placeholder="Password" icon={FaLock} isPassword={true} />
                  </Form.Item>
                  <div className="flex justify-between items-center text-white">
                    <Form.Item name="remember" valuePropName="checked" >
                      <Checkbox className="text-white">Remember me</Checkbox>
                    </Form.Item>
                    <Link
                      href="/forgot-password"
                      className="hover:underline -mt-5"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-5 py-3 bg-red-500 rounded text-white disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </button>
                </Form>
                <div className="mt-3 text-center font-bold">
                  <span className="text-white">
                  Already have an account?
                  </span>
                  <Link
                    href="/register"
                    className="text-white font-semibold hover:underline ml-1"
                  >
                  Sign up
                  </Link>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <div className="border border-white md:w-[30%] w-[25%]"></div>
                  <h1 className="text-white md:text-xl" >Or login with</h1>
                  <div className="border border-white md:w-[30%] w-[25%]"></div>
                </div>
                <Image
                className="mx-auto mt-3"
                    src={google}
                    width={50}
                    height={50}
                    alt="google"
                  />
              </div>
            </div>
          </div>
      </div>
      </div>

  </section>
  );
};

export default Login;
